// JavaScript Document
//Controllers manage the flow of data in the application
import {HikeModel} from './HikeModel.js';
import {HikesView} from './HikesView.js';
import {hikeList} from './HikeModel.js';



// Hike controller
export  class HikesController {
  constructor(parentId) {

    this.parentElement = document.getElementById(parentId); 

    //make view obj
    this.hikesView = new HikesView(parentId);

    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.hikeModel = new HikeModel(hikeList);
    this.showHikeList();
    this.addHikeListener(this.showOneHike, this.hikeModel, this.hikesView);
 
   
    
  }
  
  showHikeList() {
    //  this will get called each time we need to display our full hike list. It should grab the list of hikes from the Model, and then send them to the view.
    this.hikesView.showHikeList(this.hikeModel.getAllHikes());


  }

    showOneHike(hikeName, hikeModel, hikesView) {
      // use this when you need to show just one hike...with full details

      //hikesView.renderTheOneHike();
      hikesView.renderTheOneHike(hikeModel.getHikeByName(hikeName))
      
      

    
  }
  
	
  addHikeListener(callback, hikeModel, hikesView) {
    // for the stretch you will need to attach a listener to each of the listed hikes to watch for a touchend. 
    //add listener to list item

    //pull out each h2 element and works right now because we only have h2 for hikes header
    let li = document.getElementsByTagName("li");
    let h2 = document.getElementsByTagName("h2");

    for(let i = 0; i < li.length; i++){
      li[i].addEventListener("click", function(){
          //returns the call back to the function for the hike name
         return callback(h2[i].innerHTML, hikeModel, hikesView);
      });


    }


  }


  
}