var $ = window.jQuery = require('jquery/dist/jquery')(window);
require('jquery-waypoints');

var gears = require('./gears');

$(function () {
  window.onresize = setGears;
  setGears();
  setWaypoints();
});

var setGears = function () {
  var gearsSelector = 'body > header .gears';
  var gearsContainerEl = document.querySelector(gearsSelector);
  var gearsSvgEl = gearsContainerEl.querySelector('svg');
  if (gearsSvgEl) {
    gearsContainerEl.removeChild(gearsSvgEl)
  }
  
  gears({
    selector: gearsSelector,
    width: gearsContainerEl.clientWidth,
    height: gearsContainerEl.clientHeight,
  });
};

var setWaypoints = function () {

};