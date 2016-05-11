import {Injectable} from 'angular2/core';
import {Storage, SqlStorage} from 'ionic-angular';

/*
  Generated class for the LocationData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationData {
  constructor(){
    this.storage = new Storage(SqlStorage, {name:'campermate'});
  }

/*
  setMyDetails(data){
      let newData = JSON.stringify(data);
      this.storage.set('mydetails', newData);
  }

  setCampDetails(data){
      let newData = JSON.stringify(data);
      this.storage.set('campdetails', newData);
  }
*/
  setLocation(data){
      let newData = JSON.stringify(data);
      this.storage.set('location', newData);
  }
/*
  getMyDetails(){
    return this.storage.get('mydetails');
  }

  getCampDetails(){
    return this.storage.get('campdetails');
  }
*/
  getLocation(){
    return this.storage.get('location');
  }
/*
  getData() {
    return this.storage.get('checklists');
  }

  save(data){

    let saveData = [];

    //Remove observables
    data.forEach((checklist) => {
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData);

  }*/
}
