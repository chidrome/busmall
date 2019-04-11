'use strict';

// Global variables
var allPics = [];
var displayedProducts = document.querySelectorAll('.pic');
var totalClicks = 0;


// Create constructor function for the product
function product(name){
  this.filepath = `assets/${name}.jpg`;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allPics.push(this);
}

new product('bag');
new product('banana');
new product('bathroom');
new product('boots');
new product('breakfast');
new product('bubblegum');
new product('chair');
new product('cthulhu');
new product('dog-duck');
new product('dragon');
new product('pen');
new product('pet-sweep');
new product('scissors');
new product('shark');
new product('sweep');
new product('tauntaun');
new product('unicorn');
new product('usb');
new product('water-can');
new product('wine-glass');


document.addEventListener('DOMContentLoaded', () => {

  // populate the products on the page
  showThree();
  addPicListeners();

});

//////////////////////////////////////////////////////////// Helper Functions ////////////////////////////////////////////////////////////

// show random three pictures
var showThree = () => {
  let arrayToShow = [];
  var numberToPush = generateRandomNumber();

  while(arrayToShow.length !== 3){
    if(numberToPush < 20 && arrayToShow.indexOf(numberToPush) === -1){
      arrayToShow.push(numberToPush);
    } else {
      numberToPush = generateRandomNumber();
    }
  }

  for(let i = 0; i < arrayToShow.length; i++){
    document.getElementById(`productPic${i+1}`).setAttribute('src', `${allPics[arrayToShow[i]].filepath}`);
    document.getElementById(`productPic${i+1}`).setAttribute('alt', `${allPics[arrayToShow[i]].name}`);
    document.getElementById(`productPic${i+1}`).setAttribute('slot', `${arrayToShow[i]}`);
  }
};

// add event listeners to the pictures
var addPicListeners = () => {
  for(var i = 0; i < displayedProducts.length; i++) {
    displayedProducts[i].addEventListener('click', handleClicks);
  }
};

// remove pic event listeners
var removePicListeners = () => {
  for(var i = 0; i < displayedProducts.length; i++) {
    displayedProducts[i].removeEventListener('click', handleClicks);
  }
};

// handle clicks
var handleClicks = (e) => {
  // add a click to the object that's been clicked
  allPics[parseInt(e.target.slot)].clicks++;

  // increase the total clicks by 1
  totalClicks++;
  console.log(totalClicks);
  // remove the event listeners once 25 clicks has been made
  if(totalClicks === 25){
    removePicListeners();
    return;
  }

  // show a new set of three once a product has been clicked
  showThree();
};

// generate a random number between -1 and 20
var generateRandomNumber = () => {
  return Math.floor(Math.random() * allPics.length);
};
