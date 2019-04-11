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
    allPics[arrayToShow[i]].views++;
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
  // add a click count to the object that's been clicked
  allPics[parseInt(e.target.slot)].clicks++;

  // increase the total clicks by 1
  totalClicks++;
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

//////////////////////////////////////////////////////////// Chart functions ////////////////////////////////////////////////////////////

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
