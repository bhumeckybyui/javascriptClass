

import QuakesController from './QuakesController.js';

let myQuakesController = new QuakesController('quakeList');
myQuakesController.init();

let b1 = document.getElementById('goB1');
b1.addEventListener("click", function(){

    let r = document.getElementById('radius'); //get the r value
    let fd = document.getElementById('fDate');
    let td = document.getElementById('tDate');


    myQuakesController.getQuakesByRadius(r.value, fd.value, td.value)

});


// set the default dates of the input to today
document.getElementById('fDate').valueAsDate = new Date();
document.getElementById('tDate').valueAsDate = new Date();