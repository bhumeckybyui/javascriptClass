// JavaScript Document
// Hike View handler: handles data and manages user interaction

//import {hikesCollection} from './index.js';

export  class HikesView {
    constructor(listElementId) {
        // will need this
        this.imgBasePath = '//byui-cit.github.io/cit261/examples/';
        this.listElementID = listElementId;
        
    }

    showHikeList(hikeList) {

      // console.log(this.listElementID);

      const hikeListElement = document.getElementById(this.listElementID);
      hikeListElement.innerHTML = '';
      this.renderHikeList(hikeList, hikeListElement);

    }

    renderHikeList(hikes, parent) {
      hikes.forEach(hike => {
        parent.appendChild(this.renderOneHike(hike));
      });


    }

    renderTheOneHike(hike){

      const hikeListElement = document.getElementById(this.listElementID);
      hikeListElement.innerHTML = '';
      hikeListElement.appendChild(this.renderOneHike(hike));

    }
    renderOneHike(hike) {

      
      const item = document.createElement('li');

      item.innerHTML = ` <h2>${hike.name}</h2>
      <div class="image"><img src="${this.imgBasePath }${hike.imgSrc}" alt="${
        hike.imgAlt
      }"></div>
      <div>
              <div>
                  <h3>Distance</h3>
                  <p>${hike.distance}</p>
              </div>
              <div>
                  <h3>Difficulty</h3>
                  <p>${hike.difficulty}</p>
              </div>
      </div>`;
      

      return item;
    }


}
