import {Page, NavController, IonicApp, Alert} from 'ionic-angular';
import {Facebook} from 'ionic-native';
import {ChatPage} from '../../pages/chat/chat';
import {Data} from '../../providers/data/data';
/*
  Generated class for the DashboardPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/dashboard/dashboard.html',
})
export class DashboardPage {
  static get parameters() {
    return [[NavController], [Data], [IonicApp]];
  }

  constructor(nav, dataService, app) {
    this.dataService = dataService;
    this.nav = nav;
  }
}
