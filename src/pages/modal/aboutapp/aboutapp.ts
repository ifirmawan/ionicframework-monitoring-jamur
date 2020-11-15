import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AboutappPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-aboutapp',
  templateUrl: 'aboutapp.html',
})
export class AboutappPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {

    // console.log('ionViewDidLoad AboutappPage');

  }

  closeModal() {

    this.viewCtrl.dismiss();

  }

}
