'use strict';

// Global variables
var allPics = [];
var totalClicks = 0;
var clicks = [];
var views = [];
var productNames = [];
var myChart;
var previousArray = [];


// html elements
var lastPicked = document.getElementById('lastItem');
var clicksLeft = document.getElementById('clicksLeft');
var displayedProducts = document.querySelectorAll('.pic');


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
  drawChart();


});

//////////////////////////////////////////////////////////// Helper Functions ////////////////////////////////////////////////////////////

// show random three pictures
var showThree = () => {
  let arrayToShow = [];
  var numberToPush = generateRandomNumber();

  while(arrayToShow.length !== 3){
    if(numberToPush < 20 && arrayToShow.indexOf(numberToPush) === -1 && previousArray.indexOf(numberToPush) === -1){
      arrayToShow.push(numberToPush);
    } else {
      numberToPush = generateRandomNumber();
    }
  }

  previousArray = arrayToShow;

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
  lastPicked.innerHTML = e.target.alt;
  clicksLeft.innerHTML = 25 - totalClicks;
  // remove the event listeners once 25 clicks has been made
  if(totalClicks === 25){
    removePicListeners();
    storeToLocalStorage();
    myChart.update();
    return;
  }


  // show a new set of three once a product has been clicked
  showThree();
  // update chart
  updateChartArrays();
};

// generate a random number between -1 and 20
var generateRandomNumber = () => {
  return Math.floor(Math.random() * allPics.length);
};

// clear local storage data
var clearData = () => {
  localStorage.clear();
  location.reload();
};

// store to local storage
var storeToLocalStorage = () => {
  localStorage.productNames = JSON.stringify(productNames);
  localStorage.clicks = JSON.stringify(clicks);
  localStorage.views = JSON.stringify(views);
};

//////////////////////////////////////////////////////////// Chart functions ////////////////////////////////////////////////////////////

function updateChartArrays() {
  for (var i = 0; i < allPics.length; i++) {
    productNames[i] = allPics[i].name;
    clicks[i] = allPics[i].clicks;
    views[i] = allPics[i].views;
  }
}

var data = {
  labels: localStorage.length > 0 ? JSON.parse(localStorage.productNames) : productNames,
  datasets: [{
    type: 'bar',
    label: '# of clicks',
    data: localStorage.length > 0 ? JSON.parse(localStorage.clicks) : clicks,
    backgroundColor: '#c21d1d'
  },{
    type: 'bar',
    label: '# of views',
    data: localStorage.length > 0 ? JSON.parse(localStorage.views) : views,
    backgroundColor: '#76eb76'
  }]
};

function drawChart() {
  var ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      animation: {
        duration: 1000,
        easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
}

