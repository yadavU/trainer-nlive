import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {Facebook} from 'ionic-native';
import {Data} from './providers/data/data';
import {LocationData} from './providers/location-data/location-data';
import {Connectivity} from './providers/connectivity/connectivity';
import {HomePage} from './pages/home/home';
import {AboutPage} from './pages/about/about';
import {LoginPage} from './pages/login/login';
import {LocationPage} from './pages/location/location';

@App({
  templateUrl: 'build/app.html',
  providers: [Connectivity, Data, LocationData],
  config: {}
})
export class MyApp {

  static get parameters(){
    return [[Platform], [Data], [IonicApp], [MenuController]];
  }

  constructor(platform, dataService, app, menu) {

    this.rootPage = LoginPage;
    this.dataService = dataService;

    this.app = app;
    this.menu = menu;

    this.locationPage= LocationPage;
    this.homePage = HomePage
    this.aboutPage = AboutPage

    platform.ready().then(() => {

    });
  }

  openPage(page){
    this.menu.close();
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  }

  logout(){

    this.menu.close();
    this.menu.enable(false);

    let nav = this.app.getComponent('nav');
    nav.setRoot(LoginPage);

    this.dataService.fbid = null;
    this.dataService.username = null;
    this.dataService.picture = null;

    Facebook.logout();
  }

}
