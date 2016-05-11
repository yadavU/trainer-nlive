import {Page, NavController, IonicApp, Alert} from 'ionic-angular';
import {Facebook} from 'ionic-native';
import {LoginPage} from '../../pages/login/login';
import {Data} from '../../providers/data/data';
/*
  Generated class for the ChatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/chat/chat.html',
})
export class ChatPage {
  static get parameters() {
    return [[NavController], [Data], [IonicApp]];
  }

  constructor(nav , dataService, app) {
    this.nav = nav;
    this.dataService=dataService;
    this.app=app;
    this.chatMessage = '';
    this.messages = [];

    this.dataService.getDocuments().then((data) => {

      this.messages = data;

      let scrollContent = this.app.getComponent('chatbox');
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
