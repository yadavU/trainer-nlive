import {Page, IonicApp, Alert} from 'ionic-angular';
import {Facebook} from 'ionic-native';
import {LoginPage} from '../../pages/login/login';
import {Data} from '../../providers/data/data';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  static get parameters(){
    return [[Data], [IonicApp]];
  }

  constructor(dataService, app){

    this.dataService = dataService;
    this.app = app;

    this.chatMessage = '';
    this.messages = [];

    this.dataService.getDocuments().then((data) => {

      this.messages = data;

      let scrollContent = this.app.getComponent('chat');
      scrollContent.scrollTo(0, 99999, 0);

    });

  }

  sendMessage(){

    let message = {
      '_id': new Date().toJSON(),
      'fbid': this.dataService.fbid,
      'username': this.dataService.username,
      'picture': this.dataService.picture,
      'message': this.chatMessage
    };

    this.dataService.addDocument(message);
    this.chatMessage = '';

  }
}