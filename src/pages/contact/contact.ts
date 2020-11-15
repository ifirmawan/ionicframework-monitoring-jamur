import { Component } from '@angular/core';
import { App, NavController, ModalController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ValueProvider } from '../../providers/value/value';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

import { AboutappPage } from '../modal/aboutapp/aboutapp';
import { EditprofilePage } from '../modal/editprofile/editprofile';
import { MasukPage } from '../masuk/masuk';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  imgPath: string;
  nama: string;
  status: string;
  dataUser: any = [];

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    public value: ValueProvider,
    public app: App,
    private api: ApiProvider,
    private sql: Storage
  ) {

    // this.getDataUser();

  }

  getDataUser() {

    // cari data user
    this.sql.get('userData').then(user => {

      if (user) {

        this.api.cekKumbungDbUser(user);
        this.dataUser = JSON.parse(user);

        this.nama = this.dataUser.name.toUpperCase();

        setTimeout(() => {

          // cari data foto
          this.sql.get('photoProfile').then(text => {

            this.imgPath= text;

          });

          // cari Status
          this.sql.get('statusProfile').then(text => {

            this.status = text;

          });

        }, 10);

      } else {

        this.getUserNew();

      }

    }).catch(() => {

      this.getUserNew();

    });

  }

  getUserNew() {

    let load  = this.loadCtrl.create({
      spinner: "crescent",
      content: this.value.valAbout.labelRefresh,
      enableBackdropDismiss: true
    });

    this.sql.get('tokenAPIuser').then(token => {

      load.present();

      this.api.userProfile(token).then(data => {

        // console.log(data.data);

        this.api.cekKumbungDbUser(data.data);
        this.dataUser = JSON.parse(data.data);

        load.dismiss();

      }).catch((err) => {

        console.log('Error Pengguna Page', JSON.stringify(err));

        this.alertCtrl.create({
          title: this.value.valContact.labelTitleErrorFind,
          message: this.value.valContact.labelInfoErrorFind,
          buttons: [
            {
              text: this.value.valButtons.cancel.toUpperCase(),
              role: 'cancel'
            },
            {
              text: this.value.valButtons.ok.toUpperCase(),
              handler: () => {

                this.getDataUser();

              }
            }
          ]
        }).present();

        load.dismiss();

      });

    }).catch((err) => {

      console.log('Error Pengguna Page Token', err);

    });

  }

  logOutAction() {

    let load  = this.loadCtrl.create({
      spinner: "crescent",
      content: this.value.valAbout.labelRefresh,
      enableBackdropDismiss: true
    });

    let alert = this.alertCtrl.create({

      title: this.value.valContact.logoutApp,
      message: this.value.valContact.msgLogout,
      buttons: [
        {
          text: this.value.valButtons.cancel,
          role: 'cancel'
        },
        {
          text: this.value.valButtons.logout,
          handler: () => {

            load.present();

            this.sql.clear().then(() => {

              this.app.getRootNav().setRoot(MasukPage); // pindah ke main root baru ganti root

              this.toastCtrl.create({

                message: this.value.valContact.infoSuccesLogout,
                position: 'top',
                duration: 4000

              }).present();

              load.dismiss();

            }).catch(err => {

              this.toastCtrl.create({

                message: this.value.valContact.infoErrorLogout,
                position: 'top',
                duration: 4000

              }).present();

              load.dismiss();

            });

          }
        }
      ]
    });

    alert.present();

  }

  openEditProfile() {

    if (this.dataUser) {

      let modal   = this.modalCtrl.create(EditprofilePage, { img:  this.imgPath, nama: this.nama, status: this.status});

      modal.onDidDismiss(data => {

        if (data && data != null) {

          this.dataUser.name = data.nama;

          this.sql.set('userData', JSON.stringify(this.dataUser)).then((text) => {

            this.nama = this.dataUser.name.toUpperCase();

          });

          this.sql.set('statusProfile', data.status).then((text) => {

            this.status   = text;

          });

          this.sql.set('photoProfile', data.img).then((text) => {

            this.imgPath  = text;

          });

          this.toastCtrl.create({

            position: 'top',
            message: this.value.valContact.labelInfoSuccessImg,
            duration: 3000

          }).present();

        }

      });

      modal.present();

    }

  }

  refreshData(refresh: any) {

    this.sql.remove('photoProfile').then(() => {

      this.getUserNew();

      setTimeout(() => {

        refresh.complete();

      }, 2000);

    }).catch((err) => {

      console.log('Error Refresh Pengguna', JSON.stringify(err));
      refresh.complete();

    });

  }

  changePasswordAlert() {

    let toast   = this.toastCtrl.create({
      position: 'top',
      duration: 2000
    });

    let load    = this.loadCtrl.create({
      content: this.value.valContact.labelLoad,
      spinner: 'crescent'
    });

    let alert   = this.alertCtrl.create({
      enableBackdropDismiss: true,
      title: this.value.valContact.changePassword,
      subTitle: this.value.valContact.changePasswordSub,
      inputs: [

        {

          type: 'password',
          name: 'lpass',
          placeholder: this.value.valContact.labelPasswordLama,

        },
        {

          type: 'password',
          name: 'npass',
          placeholder: this.value.valContact.labelPasswordBaru,

        },
        {

          type: 'password',
          name: 'cpass',
          placeholder: this.value.valContact.labelPasswordConf,

        }

      ],

      buttons: [

        {

          role: 'cancel',
          text: this.value.valButtons.cancel.toUpperCase()

        },
        {

          text: this.value.valButtons.editPassword.toUpperCase(),
          handler: data => {

            load.present();

            if (data.npass == data.cpass && data.npass != '' && data.cpass != '' && data.lpass != '') {

              this.sql.get('tokenAPIuser').then(token => {

                this.api.putPassword(data.lpass, data.npass, token).then(() => {

                  load.dismiss();
                  toast.setMessage(this.value.valContact.infoSuccessChangePassword);
                  toast.present();

                }).catch((err) => {

                  console.log('Error Ganti Password', JSON.stringify(err));

                  load.dismiss();
                  toast.setMessage(this.value.valContact.infoErrorChangePassword);
                  toast.present();

                });

              }).catch((err) => {

                console.log('Error Ganti Password', JSON.stringify(err));

                load.dismiss();
                toast.setMessage(this.value.valContact.infoErrorChangePassword);
                toast.present();

              });

            } else {

              load.dismiss();
              toast.setMessage(this.value.valContact.infoErrorChangePassword);
              toast.present();

            }

          }

        }

      ]

    });

    alert.present();

  }

  ionViewDidLoad() {

    this.getDataUser();

  }

  changeEmailAlert() {

    let toast   = this.toastCtrl.create({
      position: 'top',
      duration: 2000
    });

    let alert   = this.alertCtrl.create({
      enableBackdropDismiss: true,
      title: this.value.valContact.changeEmail,
      subTitle: this.value.valContact.changeEmailSub,
      inputs: [
        {
          type: 'email',
          name: 'lemail',
          placeholder: this.value.valContact.labelEmailLama,
        },
        {
          type: 'email',
          name: 'nemail',
          placeholder: this.value.valContact.labelEmailBaru,
        }
      ],
      buttons: [
        {
          role: 'cancel',
          text: this.value.valButtons.cancel.toUpperCase()
        },
        {
          text: this.value.valButtons.editEmail.toUpperCase(),
          handler: data => {

            let msg: any  = this.changeEmail(data);

            if (msg) {

              toast.setMessage(this.value.valContact.infoSuccessChangeEmail);

            } else {

              toast.setMessage(this.value.valContact.infoErrorChangeEmail);

            }

            toast.present();
          }
        }
      ]
    });

    alert.present();

  }

  changeEmail(data: any) {

    if (data.nemail != '' && data.lemail != '') {

      return true;

    } else {

      return false;

    }

  }

  openAboutApp() {

    let modal   = this.modalCtrl.create(AboutappPage);
    modal.present();

  }

}
