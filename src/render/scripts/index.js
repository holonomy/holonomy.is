var domready = require('domready');

var gears = require('./gears');

domready(function () {

  var sizeGears = function () {
    gears({
      selector: 'body > header > .gears ',
      width: window.innerWidth * 0.9,
      height: window.innerHeight * 0.5,
    });
  }

  window.onresize = sizeGears;
  sizeGears();
});