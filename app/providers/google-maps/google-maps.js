import {Injectable} from 'angular2/core';
import {Connectivity} from '../../providers/connectivity/connectivity';
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GoogleMaps {

  static get parameters(){
    return [[Connectivity]];
  }

  constructor(connectivityService) {

    this.connectivity = connectivityService;

    this.map = null; // a reference to the map
    this.mapContainerId = "map"; // the id of the div that contains the map
    this.mapInitialised = false; // tracks if the map has been initialised or not
    this.currentMarker = null; // a reference to the current marker
    this.apiKey = null; // your api key for Google Maps (optional)

  }

  init(){

    this.mapLoadedObserver = null;

    this.mapLoaded = Observable.create(observer => {
      this.mapLoadedObserver = observer;
    });

    this.loadGoogleMaps();

    return this.mapLoaded;

  }

  loadGoogleMaps(){

    if(typeof google == "undefined" || typeof google.maps == "undefined"){

      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if(this.connectivity.isOnline()){

        window.mapInit = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if(this.apiKey){
          script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

      }
    }
    else {

      if(this.connectivity.isOnline()){
        this.initMap();
        this.enableMap();
      }
      else {
        this.disableMap();
      }

    }

    this.addConnectivityListeners();

  }

  initMap(){

    this.mapInitialised = true;

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(document.getElementById(this.mapContainerId), mapOptions);
      this.mapLoadedObserver.next(true);

    });

  }

  disableMap(){

    let pleaseConnect = document.getElementById("please-connect");

    if(pleaseConnect){
      pleaseConnect.style.display = "block";
    }

  }

  enableMap(){

    let pleaseConnect = document.getElementById("please-connect");

    if(pleaseConnect){
      pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(){

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }

  changeMarker(lat, lng){

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    if(this.currentMarker){
      this.currentMarker.setMap(null);
    }

    this.currentMarker = marker;

  }

}
