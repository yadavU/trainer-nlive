import {Injectable} from 'angular2/core';
import {Platform} from 'ionic-angular';

@Injectable()
export class Connectivity {

  static get parameters(){
    return [[Platform]];
  }

  constructor(platform){
    this.platform = platform;
    this.onDevice = this.platform.is('cordova');
  }

  isOnline() {
    if(this.onDevice && navigator.connection){
      return navigator.connection.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(){
    if(this.onDevice && navigator.connection){
      return navigator.connection.type === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }
}
