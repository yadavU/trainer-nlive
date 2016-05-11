import {Page, NavController, Platform, Alert} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {GoogleMaps} from '../../providers/google-maps/google-maps';
import {LocationData} from '../../providers/location-data/location-data';

@Page({
  templateUrl: 'build/pages/location/location.html',
  providers: [GoogleMaps]
})
export class LocationPage {
  static get parameters() {
    return [[NavController], [GoogleMaps], [Platform], [LocationData]];
  }

  constructor(nav, maps, platform, dataService) {

    this.nav = nav;
    this.maps = maps;
    this.platform = platform;
    this.dataService = dataService;

    this.latitude = null;
    this.longitude = null;

    this.dataService.getLocation().then((location) => {

      let savedLocation = false;

      if(typeof(location) != "undefined"){
        savedLocation = JSON.parse(location);
      }

      let mapLoaded = this.maps.init();

      if(savedLocation){
        this.latitude = savedLocation.latitude;
        this.longitude = savedLocation.longitude;

        mapLoaded.subscribe(update => {
          this.maps.changeMarker(this.latitude, this.longitude)
        });

      }

    });

  }

  setLocation(){

    this.latitude = 28.6439801;
    this.longitude = 77.1862467;
    Geolocation.getCurrentPosition().then((position) => {

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.maps.changeMarker(position.coords.latitude, position.coords.longitude);

      let data = {
        latitude: this.latitude,
        longitude: this.longitude
      };

      this.dataService.setLocation(data);

      let alert = Alert.create({
        title: 'Location set!',
        subTitle: 'You can now find your way back to your camp site from anywhere by clicking the button in the top right corner.',
        buttons: [{text: 'Ok'}]
      });

      this.nav.present(alert);

    });

  }

  takeMeHome(){

    if(!this.latitude || !this.longitude){

      let alert = Alert.create({
        title: 'Nowhere to go!',
        subTitle: 'You need to set your camp location first. For now, want to launch Maps to find your own way home?',
        buttons: ['Ok']
      });

      this.nav.present(alert);
    }
    else {

      let destination = this.latitude + ',' + this.longitude;

      if(this.platform.is('ios')){
        window.open('maps://?q=' + destination, '_system');
      } else {
        let label = encodeURI('My Campsite');
        window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
      }

    }

  }

}
