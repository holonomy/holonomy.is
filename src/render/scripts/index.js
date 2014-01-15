var domready = require('domready');

var gears = require('./gears');

domready(function () {
  console.log("domready!");

  var setGears = function () {
    var gearsSelector = 'body > header .gears';
    var gearsContainerEl = document.querySelector(gearsSelector);
    var gearsSvgEl = gearsContainerEl.querySelector('svg');
    if (gearsSvgEl) {
      gearsContainerEl.removeChild(gearsSvgEl)
    }

    var gearsWidth = gearsContainerEl.clientWidth;
    var gearsHeight = gearsContainerEl.clientHeight;
    
    gears({
      selector: gearsSelector,
      width: gearsContainerEl.clientWidth,
      height: gearsContainerEl.clientHeight,
    });
  }

  window.onresize = setGears;
  setGears();
});