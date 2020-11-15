import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { ApiProvider } from '../../providers/api/api';

import { MasukPage } from '../masuk/masuk';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the NonetworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nonetwork',
  templateUrl: 'nonetwork.html',
})
export class NonetworkPage {

  public lottieConfig: object;

  constructor(private network: Network, public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {
    this.lottieConfig = {
      path:   'assets/lottie/no_connection.json',
      autoplay: true,
      loop: false,
      speed: 1
    };

    this.network.onConnect().subscribe(() => {

      this.cekTokenAktif();

    });
  }

  cekTokenAktif() {

    let token = this.api.userProfile();

    if (token) {

      token.then(data => {

        let msg   = JSON.parse(data.data);

        if (data.error) {

          this.navCtrl.setRoot(MasukPage);

        } else if(msg.msg){

          this.navCtrl.setRoot(TabsPage);

        }

      }).catch(err => {

        this.navCtrl.setRoot(MasukPage);

      });

    } else {

      this.navCtrl.setRoot(MasukPage);

    }

  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad NonetworkPage');
  }

}
