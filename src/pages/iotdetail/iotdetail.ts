import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../providers/api/api';
import { ValueProvider } from '../../providers/value/value';

import { SetiottoprojectPage } from '../modal/setiottoproject/setiottoproject';
/**
 * Generated class for the IotdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-iotdetail',
  templateUrl: 'iotdetail.html',
})
export class IotdetailPage {

  iotdevice: any;
  parameters: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController,
    public value: ValueProvider,
    private api: ApiProvider,
    private sql: Storage
  ) {

    this.iotdevice  = this.navParams.data.data;

    setTimeout(() => {

      this.getParameters();

    }, 100);

  }

  getParameters() {

    let load  = this.loadCtrl.create({
      spinner: "crescent",
      content: this.value.valAbout.labelRefresh,
      enableBackdropDismiss: true
    });

    let tws = this.toast.create({
      message: this.value.valIoTDetail.labelErrorNoIoT,
      duration: 3000,
      position: 'top'
    });

    if (this.iotdevice) {

      load.present();

      this.sql.get('tokenAPIuser').then(token => {

        let params  = this.api.getParamPerIoT(this.iotdevice.id, token);

        if (params) {

          params.then(data => {

            this.parameters = JSON.parse(data.data);

            load.dismiss();

          }).catch(err => {

            tws.present();
            console.log('Error Get Param', JSON.stringify(err));

          });

        } else {

          load.dismiss();
          console.log('Error Get Param', JSON.stringify(params));

        }

      }).catch((err) => {

        console.log('No Token Detail IoT Page', JSON.stringify(err));
        this.navCtrl.pop();

      });

    } else {

      this.navCtrl.pop();

    }

  }

  changeMinMaxParam(id: any) {

    let param: any = this.parameters.filter((item) => {

      if (item.parameter_id == id) {

        return item;

      }

    })[0];

    let apichange: any = (data) => {

      this.sql.get('tokenAPIuser').then((token) => {

        let load  = this.loadCtrl.create({
          spinner: "crescent",
          content: this.value.valAbout.labelRefresh,
          enableBackdropDismiss: true
        });

        load.present();

        this.api.putMinMaxParamPerIot(this.iotdevice.id, param.parameter_id, data.txtmin, data.txtmax, token)
          .then((val) => {

            let bson: any = JSON.parse(val.data);

            if (bson && !bson.error) {

              this.parameters.filter((item) => {

                if (item.parameter_id == param.parameter_id) {

                  item.range_min = data.txtmin;
                  item.range_max = data.txtmax;

                }

              })

            }

            load.dismiss();

          })
          .catch((err) => {

            console.log('Error Change Min Max', JSON.stringify(err));
            load.dismiss();

          });

      }).catch(err => {

        console.log('Token Iot Detail',  JSON.stringify(err));

      })
    };

    // {"parameter_id":2,"parameter":"Kelembaban","range_min":60,"range_max":90,"range_full":100,"unit":"%","icon":"fa-tint"}

    let alert = this.alertCtrl.create({
      title: this.value.valIoTDetail.labelTitleMinMax,
      subTitle: param.parameter,
      inputs: [
        {
          min: 0,
          max: param.range_full,
          type: 'number',
          name: 'txtmin',
          label: this.value.valIoTDetail.labelMin,
          value: param.range_min
        },
        {
          min: 0,
          max: param.range_full,
          type: 'number',
          name: 'txtmax',
          label: this.value.valIoTDetail.labelMax,
          value: param.range_max
        }
      ],
      buttons: [
        {
          text: this.value.valButtons.cancel.toUpperCase(),
          role: 'cancel'
        },
        {
          text: this.value.valButtons.proses.toUpperCase(),
          handler: data => {

            apichange(data);

          }
        }
      ]
    });

    alert.present();

  }

  setIotToProject() {

    let data: any = {
      "iot" : this.iotdevice.id
    };

    let cariproject = this.modalCtrl.create(SetiottoprojectPage, data);

    cariproject.onDidDismiss((val: any, role: string) => {

      if (val && role == 'set') {

        this.sql.get('tokenAPIuser').then((token) => {

          let load  = this.loadCtrl.create({
            spinner: "crescent",
            content: this.value.valAbout.labelRefresh,
            enableBackdropDismiss: true
          });

          load.present();

          this.api.setIoTDeviceToProject(val, this.iotdevice.id).then((data) => {

            this.changeToYes();

            load.dismiss();

          }).catch((err) => {

            this.alertCtrl.create({
              title: this.value.valIoTDetail.labelTitleErrorSet,
              message: this.value.valIoTDetail.labelMsgErrorSet
            }).present();

            load.dismiss();

          });

        }).catch((err) => {

          console.log('Error Set IOT to Project Token', JSON.stringify(err));

        });

      }

    });

    cariproject.present();

  }

  changeToYes() {

    this.sql.get('IoTDevices').then(val => {

      let iot: any = JSON.parse(val);

      iot.filter((item) => {

        if (item.id == this.iotdevice.id) {

          item.available = 'no';

        }

      });

      this.iotdevice.available = 'no';

      setTimeout(() => {

        this.sql.set('IoTDevices', JSON.stringify(iot));

      }, 100);

    }).catch((err) => {

      console.log('Error Get IoT - Detail IoT', JSON.stringify(err));
      this.changeToYes();

    });

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad IotdetailPage');
  }

}
