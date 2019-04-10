'use strict';

// Global variables
var allPics = [];
var pic1 = document.getElementById('productPic1');
var pic2 = document.getElementById('productPic2');
var pic3 = document.getElementById('productPic3');


// Create constructor function for the product
function product(name){
  this.filepath = `assets/${name}.jpg`;
  this.name = name;
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

  ////////////////////////////// populate the products on the page //////////////////////////////
  showThree();

});

////////////////////////////// Helper Functions //////////////////////////////
function showThree(){
  pic1.setAttribute('src', `${allPics[0].filepath}`);
  pic2.setAttribute('src', `${allPics[1].filepath}`);
  pic3.setAttribute('src', `${allPics[2].filepath}`);
}

// add event listeners to the pictures



