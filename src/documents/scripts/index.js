var $ = window.jQuery = require('jquery');
require('jquery-waypoints');
require('jquery.scrollTo');
require('jquery.localScroll')
var _ = require('lodash');

var gears = require('./gears');

$(function () {
  window.onresize = setGears;
  setGears();
  $.localScroll({ hash: true, axis: 'y' });
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
  var nav = $('body > nav');
  var mainMenu = $('body > nav > ul');
  
  mainMenu.waypoint({
    handler: function (direction) {
      if (direction == 'down') {
        nav.css({ height: mainMenu.outerHeight() });
        $('a.anchor').css({ top: -mainMenu.outerHeight() });
        mainMenu.toggleClass('sticky', true);
      } else {
        nav.css({ height: 'auto' });
        mainMenu.toggleClass('sticky', false);
      }
    },
  });

  // setup waypoints for nested menus
  var setMenuWaypoints = function (menu) {
    // if no menu or array of 0 menus, return
    if (!(menu && menu.length)) { return; }

    // for each menu item
    menu.find('li').each(function (index, itemEl) {

      var item = $(itemEl);

      // get the link id of the current menu item
      var linkId = item.find('a').first().attr('href');
      // handle slashes within link id
      linkId = linkId.replace('/', '\\/');
      // get link by id
      var link = $(linkId);

      // when the link is hit,
      link.waypoint({
        handler: function (direction) {
          var isDown = (direction === 'down');
          var isUp = (direction === 'up');

          // when scrolling down,
          if (isDown) {
            // activate current item
            item.toggleClass('active', true);
            if (history.replaceState) {
              history.replaceState(null, null, linkId);
            }
            window.location.hash = linkId;
            // deactivate previous item
            item.prev().toggleClass('active', false);
          } // when scrolling up,
          else if (isUp) {
            // deactivate current item
            item.toggleClass('active', false);
            // activate previous item
            item.prev().toggleClass('active', true);
            if (history.replaceState) {
              var prevLinkId = item.prev().find('a').first().attr('href');
              prevLinkId = prevLinkId ? prevLinkId.replace('/', '\\/') : '/';
              history.replaceState(null, null, prevLinkId);
            }
          }
          // refresh nav and waypoints offset
          nav.css({ height: mainMenu.outerHeight() });
        },
        offset: function () {
          return nav.outerHeight()
        },
      });

      setMenuWaypoints(item.find('ul'));
    });
  };

  setMenuWaypoints($('body > nav > ul'));
};
