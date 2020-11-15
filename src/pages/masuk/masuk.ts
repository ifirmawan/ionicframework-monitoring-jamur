import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { ValueProvider } from '../../providers/value/value';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';
import { MsmasukPage } from '../msmasuk/msmasuk';
/**
 * Generated class for the MasukPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-masuk',
  templateUrl: 'masuk.html',
})
export class MasukPage {
  emailMasuk: string;
  passwordMasuk: string;
  dataLogin: any[]  = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private sql: Storage,
    public navParams: NavParams,
    public value: ValueProvider,
    private api: ApiProvider,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
  }

  funcSubmitLogin() {
    // some api here {
    let load  = this.loadCtrl.create({
      spinner: "crescent",
      content: this.value.valMasuk.labelLoad,
      enableBackdropDismiss: true,
      dismissOnPageChange: true
    });

    let modal = this.modalCtrl.create(MsmasukPage);

    load.present();

    let dataq: any = {
      'email' : this.emailMasuk,
      'password' : this.passwordMasuk
    };

    this.api.login(dataq).then(data => {

      let anji  = JSON.parse(data.data);

      this.sql.ready().then(() => {

        this.sql.set('tokenAPIuser', anji.token).then(text => {

          this.api.userProfile(text).then((data) => {

            this.api.cekKumbungDbUser(data.data);
            // console.log('userProfile', data);

          });

          modal.present();
          this.navCtrl.setRoot(TabsPage);

        }).catch(err => {

          this.alertasalahLogin();

        });

      });

      load.dismiss();

    }).catch(error => {

      // let er = this.api._fatal(error);
      this.alertasalahLogin();
      load.dismiss({}, 'cancel');

    }); // end if else
    // end api }
  }

  alertasalahLogin() {

    let alert = this.alertCtrl.create({
      title: this.value.valMasuk.titleError,
      message: this.value.valMasuk.labelError,
      buttons: [
        {
          text: this.value.valButtons.cancel.toLocaleUpperCase(),
          role: 'cancel'
        }
      ]
    });

    alert.present();

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MasukPage');
  }

}
