import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ApiProvider } from '../../../providers/api/api';
import { ValueProvider } from '../../../providers/value/value';

/**
 * Generated class for the SetiottoprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setiottoproject',
  templateUrl: 'setiottoproject.html',
})
export class SetiottoprojectPage {

  idIot: any;
  projects: any;
  items: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    public value: ValueProvider,
    private sql: Storage,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) {

    let data: any = this.navParams.data;

    this.idIot    = data.iot;

  }

  initializeItems() {

    if (this.projects) {

      this.items = this.projects;

    }

  }

  getItems(ev: any) {

    this.initializeItems();

    const val = ev.target.value;

    if (val && val.trim() != '' && this.items) {

      this.items = this.items.filter((item) => {

        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })

    }

  }

  getProjects() {

    let load  = this.loadCtrl.create({
      spinner: "crescent",
      content: this.value.valAbout.labelRefresh,
      enableBackdropDismiss: true
    });

    let alert = this.alertCtrl.create({
      title: this.value.valModalSIP.labelInfoErrorSet,
      message: this.value.valModalSIP.labelInfoErrorMsg
    });

    let localFile: any = this.localFile();

    load.present();

    this.sql.get('tokenAPIuser').then((token) => {

      this.api.getRumahJamur(token).then(data => {

        if (data.data && data.data != '' && data.data != '{}' && data.data != '[]') {

          this.projects = JSON.parse(data.data);

          this.sql.set('rumahJamur', data.data);

        }

        this.initializeItems();

        load.dismiss();

      }).catch(err => {

        localFile;
        alert.present();
        load.dismiss();

      });

    }).catch((err) => {

      console.log('Error Token Set Project', JSON.stringify(err));

      alert.present();

      load.dismiss();

    });

  }

  localFile() {

    this.sql.get('rumahJamur').then((val) => {

      let bson: any = JSON.parse(val);

      if (bson && bson.length > 0) {

        this.projects = bson;

      }

      this.initializeItems();

    }).catch((err) => {

      console.log('Error SetIoTtoProject Page', JSON.stringify(err));

    });

  }

  refreshData(refresh: any) {

    this.getProjects();

    setTimeout(() => {

      refresh.complete();

    }, 2000);

  }

  setProject(id: any) {

    this.alertCtrl.create({
      title: this.value.valModalSIP.title,
      message: this.value.valModalSIP.labelConfirmSet,
      buttons: [
        {
          text: this.value.valButtons.cancel.toUpperCase(),
          role: 'cancel'
        },
        {
          text: this.value.valButtons.ok.toUpperCase(),
          handler: () => {

            this.viewCtrl.dismiss(id, 'set');

          }
        }
      ]
    }).present();

  }

  closeModal() {

    this.viewCtrl.dismiss(null, 'cancel');

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SetiottoprojectPage');

    this.getProjects();

  }

}
