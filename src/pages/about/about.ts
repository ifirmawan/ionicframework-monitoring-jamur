import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, ActionSheetController, Platform, AlertController, LoadingController } from 'ionic-angular';
import { ValueProvider } from '../../providers/value/value';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

import { QrscanPage } from '../qrscan/qrscan';
import { IotdetailPage } from '../iotdetail/iotdetail';
import { SetiottoprojectPage } from '../modal/setiottoproject/setiottoproject';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  elementType: string = 'img'; // img | canvas | url
  iotDevices: any;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public loader: LoadingController,
    public modalCtrl: ModalController,
    public value: ValueProvider,
    private api: ApiProvider,
    private sql: Storage
  ) {

    // this.getIoTDevice();

  }

  presentQrScannerModal() {

    let qrModal = this.modalCtrl.create(QrscanPage);

    qrModal.onDidDismiss(data => {

      if (data === 'undefined' || data == null) {

        console.log('Data Kosong', data);

      } else {

        this.postIotDevice(data);

      }

      this.hideCamera();

    });

    qrModal.present();

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: String(this.value.valLahan.labelAction.title),
      buttons: [
        {
          text: this.value.valButtons.AddIoTText,
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.alertCtrl.create({
              title: this.value.valAbout.labelAddIoTText,
              inputs: [
                {
                  name: 'txtQr',
                  placeholder: this.value.valAbout.placeholderTokenIoT
                }
              ],
              buttons: [
                {
                  text: this.value.valButtons.cancel.toUpperCase(),
                  role: 'cancel'
                },
                {
                  text: this.value.valButtons.proses.toUpperCase(),
                  handler: (data) => {

                    this.postIotDevice(data.txtQr);

                  }
                }
              ]
            }).present();
          }
        },
        {
          text: this.value.valButtons.AddIoTQr,
          icon: !this.platform.is('ios') ? 'qr-scanner' : null,
          handler: () => {
            this.presentQrScannerModal();
          }
        },
        {
          text: 'Cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  doRefresh(segeran: any) {

    this.sql.remove('IoTDevices').then(() => {

      this.iotDevices = [];

      setTimeout(() => {

        this.getIoTDevice();

      }, 100);

      setTimeout(() => {

        segeran.complete();

      }, 1500);

    }).catch(() => {

      this.alertCtrl.create({
        title: this.value.valAbout.labelRefresh,
        message: this.value.valAbout.labelErrorRefresh
      }).present();

    });

  }

  /**
   * Request Function API
   * Semua fungsi yang digunakan untuk API
   */
  getIoTDevice() {

    let loadku  = this.loading();
    loadku.present();

    this.sql.get('IoTDevices').then(text => {

      if (text) {

        this.iotDevices = JSON.parse(text);

        loadku.dismiss();

      } else {

        this.sql.get('tokenAPIuser').then(token => {

          this.api.iotDevices(token).then(data => {

            this.sql.set('IoTDevices', data.data);

            this.iotDevices = JSON.parse(data.data);

            loadku.dismiss();

          }).catch((err) => {

            // loadku.dismiss();
            this.getIoTDevice();
            console.log('Error Device', err);

          });

        }).catch((err) => {

          // loadku.dismiss();
          this.getIoTDevice();
          console.log('Error Token', err);

        });

      }

    }).catch(() => {

      this.getIoTDevice();

    });

  }

  postIotDevice(id: string) {

    let load  = this.loading();

    load.present();

    this.sql.get('tokenAPIuser').then(token => {

      this.api.addIoTDevice(id, token).then(data => {

        let iotku: any  = JSON.parse(data.data);
        this.iotDevices.push(iotku);
        this.sql.set('IoTDevices', JSON.stringify(this.iotDevices));

        load.dismiss();

      }).catch(() => {

        this.alertCtrl.create({
          title: this.value.valAbout.labelErrorAddIoT.toUpperCase(),
          message: this.value.valAbout.labelErrorAddIoT,
          buttons: [
            {
              text: this.value.valButtons.cancel.toUpperCase(),
              role: 'cancel'
            }
          ]
        }).present();

        load.dismiss();

      });

    }).catch((err) => {

      load.dismiss();

      console.log('Post Device', err);

    });

  }

  goToDetailIoT(iot: any) {

    this.navCtrl.push(IotdetailPage, { data : iot });

  }

  findIoTDevices() {

    let modal = this.modalCtrl.create(SetiottoprojectPage);

    modal.onDidDismiss((data, role) => {

      if (role != 'cancel') {

        // belum

      }

    });

    modal.present();

  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  loading() {

    let x  = this.loader.create({
      spinner: "crescent",
      content: this.value.valAbout.labelLoadIoT,
      enableBackdropDismiss: true
    });

    return x;

  }

  ionViewDidLoad() {

    this.getIoTDevice();

  }

}
