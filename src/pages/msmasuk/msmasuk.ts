import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MsmasukPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-msmasuk',
  templateUrl: 'msmasuk.html',
})
export class MsmasukPage {

  public lottieConfig: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.lottieConfig = {
      path:   'assets/lottie/check_animation.json',
      autoplay: true,
      loop: false,
      speed: 1
    };
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MsmasukPage');
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 2200);
  }

}
