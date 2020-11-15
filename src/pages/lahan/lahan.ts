import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ValueProvider } from '../../providers/value/value';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the LahanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lahan',
  templateUrl: 'lahan.html'
})
export class LahanPage {

  proyek: any;
  allItems: any;
  allGauge: Array<any> = [];
  colors: any = {

    'primary' : '#3880ff',
    'tertiary': '#7044ff',
    'warning' : '#ffce00',
    'success' : '#10dc60',
    'danger'  : '#f04141'

  };
  segmen: any;
  nomor: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public value: ValueProvider,
    private api: ApiProvider,
    private sql: Storage,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {

    // console.log(JSON.stringify(this.navParams.data));

    this.proyek = this.navParams.data;
    this.segmen = 'detail';

  }

  testAlert() {

    this.alertCtrl.create({
      title: 'Next Feature!',
      message: 'Coming Soon 👌'
    }).present();

  }

  ionViewDidLoad() {

    setTimeout(() => {

      this.setAllData();

    }, 100);

    setInterval(() => {

      this.putGaugeValue();

    }, 5000);

  }

  ionViewDidEnter() {



  }

  onSegmentChange() {

    setTimeout(() => { // timeout biar bisa ke render dulu baru jalanin

      // place here
      if (this.segmen == 'detail') {

        // this.makeChart();

      }

    }, 100);

  }

  /**
   * Data Detail Segment - Parameter IoT, Get IoT
   */
  setAllData() {

    this.sql.get('tokenAPIuser').then(data => {

      if (data) {

        this.getAllDataProject(data);

      }

    });

  }

  getAllDataProject(token: any) {

    let load = this.loading();

    load.present();

    this.api.getAllItemsRumahJamur(this.proyek.id, token).then((data) => {

      this.allItems = JSON.parse(data.data);

      this.allItems.project.iotdevices.forEach(element => {

        for (let index = 0; index < element.item.setting_parameters.length; index++) {

          let param = element.item.setting_parameters[index];

          let label: any  = {
            'label'     : 'None',
            'append'    : '°C',
            'type'      : 'arch', // bisa juga pake yang lain arch full semi
            'cap'       : 'butt', // butt or round
            'thick'     : 15,
            'size'      : 200
          };

          label.label = param.parameters.parameter + ' IOT-' + element.item.SN;
          label.unit  = String(param.parameters.unit);
          label.thresholds = {};

          label.thresholds[0] = {
            color: this.colors.primary
          };

          label.thresholds[param.range_min]  = {
            color: this.colors.success //tertiary
          };

          label.thresholds[param.range_max]  = {
            color: this.colors.danger // danger
          };

          // label.thresholds = JSON.stringify(label.thresholds);

          this.allGauge[this.allGauge.length] = {
            'id'   : 'I' + element.item.id + 'P' + param.parameters.id,
            'iot'  : element.item.id,
            'param': param.parameters.id,
            'user' : token,
            'nama' : param.parameters.parameter + ' IOT-' + element.item.SN,
            'label': label,
            'max'  : param.parameters.range_full,
            'icon' : param.parameters.icon,
            'rowid': 0,
            'value': 0
          };

        }

      });

      setTimeout(() => {

        load.dismiss();

      }, 1500);

      setTimeout(() => {

        this.putGaugeValue();

      }, 1000);

    }).catch((err) => {

      console.log('Error Load Project', JSON.stringify(err));
      load.dismiss();
      // this.getAllDataProject(token);

    });

  }

  putGaugeValue() {

    if (this.allGauge) {

      this.allGauge.forEach((x: any, i: any) => {

        this.api.getLastRecord(x.iot, x.param, x.user).then(data => {

          let bson  = data.data;

          if (bson && bson != '{}' && bson != '[]' && bson != '') {

            bson  = JSON.parse(bson);

            if (bson.id != x.rowid) {

              this.allGauge[i].rowid = bson.id;
              this.allGauge[i].value = bson.value;

            }

          }

        }).catch((err) => {

          console.log('Error Update Gauge Value', JSON.stringify(err));

        });

      });

    }

  }

  loading() {

    let x  = this.loadCtrl.create({
      spinner: "crescent",
      content: this.value.valAbout.labelRefresh,
      enableBackdropDismiss: true
    });

    return x;

  }

  // End IOT

}
