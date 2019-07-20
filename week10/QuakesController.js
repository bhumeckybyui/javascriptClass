
import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
  constructor(parent, position = null) {
    this.parent = parent;
    
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.position = position || {
      lat: 0,
      lon: 0
    };

    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.quakes = new Quake();
    this.quakesView = new QuakesView();

  }
  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.intiPos(), and display some quakes by calling this.getQuakesByRadius()
   

    this.parentElement = document.getElementById(this.parent);
    console.log(this.parentElement);

    await this.initPos();
    await this.getQuakesByRadius();

  }
  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        // if we get the location back then set the latitude and longitude into this.position
        let pos = await getLocation();
        this.position.lat = pos.coords.latitude;
        this.position.lon = pos.coords.longitude;
        

      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius = 100, fromDate = null, toDate = null) {
    //set a loading message in case it takes long to get the quakes
    this.parentElement.innerHTML = 'Loading...';

    // get the list of quakes in the specified radius of the location
    this._quakes = await this.quakes.getEarthQuakesByRadius(this.position, radius, fromDate, toDate);

    // render the list to html
    this.quakesView.renderQuakeList(this._quakes, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details. The listener should call this.getQuakeDetails on the targeted element
    this.parentElement.addEventListener('touchend', e => {
        if(e.target.dataset.id){
            this.getQuakeDetails(e.target.dataset.id);
        }
    });

  }
  async getQuakeDetails(quakeId) {
    // get the details for the quakeId provided, then send them to the view to be displayed
   
    // console.log(quakeId);
    let quake = await this.quakes.getQuakeById(quakeId);
    this.quakesView.renderQuake(quake, this.parentElement);


  }
}