import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';

import { ValueProvider } from '../../../providers/value/value';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  imgpath: any;
  status: string;
  name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private actionCtrl: ActionSheetController,
    private imgPicker: ImagePicker,
    private crop: Crop,
    private platform: Platform,
    public value: ValueProvider
  ) {

    this.imgpath  = this.navParams.data.img;
    this.status   = this.navParams.data.status;
    this.name     = this.navParams.data.nama;

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditprofilePage');
  }

  showActionSheet() {

    let action = this.actionCtrl.create({
      title: this.value.valEditProfile.labelActionSheet,
      buttons: [
        {
          text: this.value.valButtons.AddImageURI,
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            // console.log('load image');
            let options: any  = {
              maximumImagesCount: 1
            };

            let imgUri: string;

            this.imgPicker.getPictures(options).then((result) => {

              for (var i = 0; i < result.length; i++) {

                imgUri  = result[i];

              }

              this.crop.crop(imgUri, {

                quality: 100

              }).then(

                newImage => {

                  this.imgpath  = newImage;

                },
                error => console.error('Error cropping image', error)

              );

            }).catch(err => {
              console.log('Error Edit Profile', err);
            });
          }
        }
      ]
    });

    action.present();

  }

  closeModal() {

    this.viewCtrl.dismiss(null);

  }

  closeModalSave() {

    this.viewCtrl.dismiss({img: this.imgpath, nama: this.name, status: this.status});

  }

}
