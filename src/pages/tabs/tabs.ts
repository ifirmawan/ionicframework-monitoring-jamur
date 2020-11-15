import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';
import { ValueProvider } from '../../providers/value/value';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabs: Tabs;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  warna: string   = 'primary';
  exitBtn: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public value: ValueProvider
  ) {
  }

  getColor() {
    var index: any;

    index = this.tabs.getSelected().index;

    switch (index) {
      case 0:
        this.warna = 'primary';
        break;

      case 1:
        this.warna = 'tertiary';
        break;

      case 2:
        this.warna = 'danger';
        break;
    }

  }
}
