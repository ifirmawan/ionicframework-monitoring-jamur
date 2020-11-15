import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { ValueProvider } from '../../providers/value/value';
/**
 * Generated class for the QrscanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qrscan',
  templateUrl: 'qrscan.html',
})
export class QrscanPage {
  iconFlash: string;
  flashLight: boolean = false;
  frontCamera: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public value: ValueProvider, private qrScanner: QRScanner, private androidPermissions: AndroidPermissions) {
    this.iconFlash = 'ios-sunny-outline';
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad QrscanPage');
  }

  ionViewWillEnter(){
    this.scanBarcode();
  }

  scanBarcode() {

    this.showCamera();

    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          // console.log('Scanned something', text);
          this.closeModalQr(text);

          scanSub.unsubscribe(); // stop scanning
        });

        this.qrScanner.show();

      } else if (status.denied) {

        this.qrScanner.openSettings();

      } else {

        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          result => console.log('Has permission?',result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );

      }


      // detect light
      if (status.canEnableLight && status.currentCamera == 0) {
        this.flashLight  = true;
      }

      // detect light enable
      if (status.lightEnabled) {
        this.iconFlash  = 'ios-sunny';
      }

      if (status.currentCamera == 1) {

        this.flashLight   = false;

      }

      // detect camera
      if (status.canChangeCamera) {
        this.frontCamera = true;
      }
    })
    .catch((e: any) => {
      console.log('Qrscan Error is', e);
    });
  }

  switchLightFlash() {

    if (this.flashLight) {
      this.qrScanner.getStatus().then((status: QRScannerStatus) => {
        if (status.lightEnabled) {
          this.qrScanner.disableLight();
          this.iconFlash  = 'ios-sunny-outline';
        } else {
          this.qrScanner.enableLight().then((status: QRScannerStatus) => {
            this.iconFlash  = 'ios-sunny';
          }).catch((e: any) => {
            console.log('Qrscan Error', e);
            this.iconFlash  = 'ios-sunny-outline';
          });
        }
      });
    }

  }

  switchCamera() {
    let cam: number = 0;

    if (this.frontCamera) {
      this.qrScanner.getStatus().then((status: QRScannerStatus) => {
        if (status.currentCamera == 0) {
          cam = 1;
        } else {
          cam = 0;
        }

        this.qrScanner.useCamera(cam);
      }).catch((e: any) => {
        console.log('Qrscan error', e);
      });
    }
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  // close modal
  closeModalQr(text: string) {

    let data: any = text;

    this.qrScanner.hide();

    if (text != null) {

      this.viewCtrl.dismiss(data);

    } else {

      this.viewCtrl.dismiss();

    }

  }

}
