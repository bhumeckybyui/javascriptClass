import { getJSON } from './utilities.js';
// Quake Model
export default class Quake {
  constructor() {
    this.baseUrl =
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02';
    // store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }
  async getEarthQuakesByRadius(position, radius = 100, fDate = null, tDate = null) {
    // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it

    let baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

    
    if(fDate && tDate){
        baseUrl = baseUrl + '&starttime=' + fDate + '&endtime=' + tDate; 
    } else {
        baseUrl = baseUrl + '&starttime=2019-01-01&endtime=2019-03-02';

    }

    let url = baseUrl + '&latitude=' + position.lat + '&longitude=' + position.lon + '&maxradiuskm=' + radius;
 
   this._quakes = await getJSON(url);
    return this._quakes;
  }
  getQuakeById(id) {
    // filter this._quakes for the record identified by id and return it


    return this._quakes.features.filter(item => item.id === id)[0];
  }
}