$.fn.stabilize = function () {
  return this.applyWebElements(function () {
    return $(this).filter(function () {
      var prev = $(this).data("prevBoundingClientRect");
      var curr = $.extend({}, this.getBoundingClientRect());
      
      // if stable, returns this jquery object
      if (prev && prev.right === curr.right && prev.top === curr.top && prev.width === curr.width && prev.height === curr.height) {
        return true;
      }
      
      // else store current bounding box and return empty
      $(this).data("prevBoundingClientRect", curr);
      return false;
    });
  });
};
  
$.fn.popups = function () {
  return this.windows().applyWebElements(function () {
    return window.opener ? $(this) : $();
  }).documentRoots();  
};

$.fn.openWindow = function (url) {
  this.apply(function (url, name, specs, replace) {
    window.open(url || 'about:blank', name || '_blank', specs, replace);
  }, Array.prototype.slice.call(arguments));

  return this.popups().applyWebElements(function (url) {
    return window.location.href.startsWith(url) ? $(this) : $();
  }, [ url || 'about:blank' ]).documentRoots().freeze().waitForExistence();
};