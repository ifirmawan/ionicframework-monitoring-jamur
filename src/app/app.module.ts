import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { AboutPage } from '../pages/about/about';
import { NonetworkPage } from '../pages/nonetwork/nonetwork';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MasukPage } from '../pages/masuk/masuk';
import { LahanPage } from '../pages/lahan/lahan';
import { QrscanPage } from '../pages/qrscan/qrscan';
import { IotdetailPage } from '../pages/iotdetail/iotdetail';
import { AboutappPage } from '../pages/modal/aboutapp/aboutapp';
import { EditprofilePage } from '../pages/modal/editprofile/editprofile';
import { AddLahanPage } from '../pages/modal/add-lahan/add-lahan';
import { SetiottoprojectPage } from '../pages/modal/setiottoproject/setiottoproject';
import { MsmasukPage } from '../pages/msmasuk/msmasuk';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Camera } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Network } from '@ionic-native/network';
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
import { LottieAnimationViewModule } from 'ng-lottie';
import { ValueProvider } from '../providers/value/value';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    NonetworkPage,
    ContactPage,
    HomePage,
    MasukPage,
    LahanPage,
    QrscanPage,
    IotdetailPage,
    MsmasukPage,
    AboutappPage,
    EditprofilePage,
    SetiottoprojectPage,
    AddLahanPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: true,
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false}),
    IonicStorageModule.forRoot({
      name: '__kumbungdb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    LottieAnimationViewModule.forRoot(),
    NgxGaugeModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    NonetworkPage,
    ContactPage,
    HomePage,
    MasukPage,
    LahanPage,
    QrscanPage,
    IotdetailPage,
    MsmasukPage,
    AboutappPage,
    EditprofilePage,
    AddLahanPage,
    SetiottoprojectPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    QRScanner,
    Camera,
    BackgroundMode,
    Crop,
    ImagePicker,
    HTTP,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ValueProvider,
    ApiProvider
  ]
})
export class AppModule {}
