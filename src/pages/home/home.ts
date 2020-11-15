import { Component } from '@angular/core';
import { NavController, AlertController, App, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ValueProvider } from '../../providers/value/value';
import { ApiProvider } from '../../providers/api/api';
import { LahanPage } from '../lahan/lahan';
import { MasukPage } from '../masuk/masuk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Variable Mockup
  items: Array<{ title: string, page: any, suhu: any }>;
  color: any = 'primary';
  user: any;
  // end Variable Mock Up
  rumahJamur: any[] = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public value: ValueProvider,
    public app: App,
    private sql: Storage,
    private api: ApiProvider
  ) {

    // Mockup
    this.items = [
      {
        title: 'Proyek Wedang',
        page : 'Nanda Korewa',
        suhu : 21
      },
      {
        title: 'Sliding Item',
        page : 'SlidingItemPage',
        suhu : 8
      },
      {
        title: 'Delete Items',
        page : 'DeleteItemsPage',
        suhu : 10
      },
      {
        title: 'Users Listing',
        page : 'UsersPage',
        suhu : 31
      },
      {
        title: 'Crypto Currencies',
        page : 'CryptoListPage',
        suhu : 7
      }
    ];

    setInterval(() => {
      this.getSuhuFromAPI();
    }, 5000);
  }

  /**
   * Mock Up - Data Sample next level
   */
  getSuhuFromAPI() {
    var suhubaru: any;

    this.items.forEach(element => {
      suhubaru = (Math.random() * 100).toFixed(0);
      element.suhu  = suhubaru;
    });

  }

  getColorSuhu(suhu: any) { // suhu cuma sebagai contoh
    var hasil:any;

    if(suhu < 25) {
      hasil = 'primary';
    }

    if(suhu < 35 && suhu >= 25) {
      hasil = 'tertiary';
    }

    if(suhu < 50 && suhu >= 35) {
      hasil = 'warning';
    }

    if(suhu >= 50) {
      hasil = 'danger';
    }

    return hasil;

  }

  getKelembabanIcon(suhu: any) { // suhu cuma sebagai contoh
    var hasil:any;

    if(suhu < 25) {
      hasil = 'ios-water';
    }

    if(suhu >= 25) {
      hasil = 'ios-water-outline';
    }

    return hasil;

  }

  getKelembabanColor(suhu: any) { // suhu cuma sebagai contoh
    var hasil:any;

    if(suhu < 25) {
      hasil = 'primary';
    }

    if(suhu < 35 && suhu >= 25) {
      hasil = 'primary';
    }

    if(suhu >= 35) {
      hasil = 'danger';
    }

    return hasil;

  }

  setKelembabanClass(suhu: any) {

    var hasil: any;

    if(suhu >= 35) {
      hasil = 'animated infinite flash delay-5s slower';
    }

    return hasil;

  }

  getColorSunny(suhu: any) { // suhu cuma sebagai contoh
    var hasil:any;

    if(suhu < 18) {
      hasil = 'dark';
    }

    if(suhu >= 18) {
      hasil = 'warning';
    }

    return hasil;

  }

  /**
   * End Of Mockup
   */

  /**
   * Start New Program
   * We Make It Better For You
   */
  refreshRumahJamur(refresh: any) {

    this.sql.remove('rumahJamur').then(() => {

      this.rumahJamur = [];

      setTimeout(() => {

        this.getRumahJamur();

      }, 100);

      if (refresh !== null) {

        setTimeout(() => {

          refresh.complete();

        }, 2000);

      }

    }).catch(() => {

      if (refresh !== null) {

        setTimeout(() => {

          refresh.complete();

        }, 2000);

      }

    });

  }

  getRumahJamur() {

    let load  = this.loading();
    load.present();

    this.sql.get('rumahJamur').then(text => {

      if (text) {

        this.rumahJamur = JSON.parse(text);
        load.dismiss();

      } else {

        this.sql.get('tokenAPIuser').then(token => {

          let rmjamur   = this.api.getRumahJamur(token);

          if (!rmjamur) {

            this.sql.clear().then(() => {

              this.app.getRootNav().setRoot(MasukPage);

            });

            load.dismiss();

          } else {

            rmjamur.then(data => {

              this.sql.set('rumahJamur', data.data).then(text => {

                this.rumahJamur = JSON.parse(text);

              });

              load.dismiss();

            }).catch(error => {

              // load.dismiss();

              // this.alertCtrl.create({

              //   title: this.value.valHome.labelInfoErrorGetRJ,
              //   message: this.value.valHome.labelInfoErrorMsgGetRJ

              // }).present();

              this.getRumahJamur();

            });

          }

        }).catch(() => {

          load.dismiss();

          this.alertCtrl.create({

            title: this.value.valHome.labelInfoErrorGetRJ,
            message: this.value.valHome.labelInfoErrorMsgGetRJ

          }).present();

        });

      }

    }).catch(() => {

      load.dismiss();

      this.alertCtrl.create({

        title: this.value.valHome.labelInfoErrorGetRJ,
        message: this.value.valHome.labelInfoErrorMsgGetRJ

      }).present();

    });

  }

  goToDetail(item: any) {

    this.navCtrl.push(LahanPage, item);

  }

  loading() {

    let x  = this.loadCtrl.create({
      spinner: "crescent",
      content: this.value.valAbout.labelRefresh,
      enableBackdropDismiss: true
    });

    return x;

  }

  ionViewDidLoad() {

    setTimeout(() => {

      this.getRumahJamur();

    }, 1500);

  }

}
