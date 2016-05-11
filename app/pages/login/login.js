import {Page, Platform, NavController, MenuController, Alert, Loading} from 'ionic-angular';
import {Facebook} from 'ionic-native';
import {HomePage} from '../home/home';
import {DashboardPage} from '../dashboard/dashboard';
import {Data} from '../../providers/data/data';

@Page({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

  static get parameters(){
    return [[NavController], [Platform], [MenuController], [Data]];
  }

  constructor(nav, platform, menu, dataService) {

    this.nav = nav;
    this.menu = menu;
    this.dataService = dataService;

    this.menu.enable(false);

    this.loading = Loading.create({
      content: 'Authenticating...'
    });

  }

  login(){

    this.nav.present(this.loading);

    Facebook.login(['public_profile']).then((response) => {

      this.getProfile();

    }, (err) => {

      let alert = Alert.create({
        title: 'Oops!',
        subTitle: 'Something went wrong, please try again later.',
        buttons: ['Ok']
      });

      this.loading.dismiss();
      this.nav.present(alert);

    });

  }

  getProfile(){

    Facebook.api('/me?fields=id,name,picture', ['public_profile']).then(

      (response) => {

        console.log(response);

        this.dataService.fbid = response.id;
        this.dataService.username = response.name;
        this.dataService.picture = response.picture.data.url;

        this.menu.enable(true);
        this.loading.dismiss();
        this.nav.setRoot(DashboardPage);

      },

      (err) => {

        console.log(err);

        let alert = Alert.create({
          title: 'Oops!',
          subTitle: 'Something went wrong, please try again later.',
          buttons: ['Ok']
        });

        this.loading.dismiss();
        this.nav.present(alert);

      }

    );

  }

}
