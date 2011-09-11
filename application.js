(function(){

  var doc = document; // for convenience
  var d   = 40;   // initial angle of book opening, in degrees
  var p   = -10;  // perpective, in degrees

  var left  = doc.getElementById('left');
  var right = doc.getElementById('right');

  var pairs = [ 'c1', 'c2', 'c3', 'c4' ].map(function (className) {
    return {
      left:  left.getElementsByClassName(className)[0],
      right: right.getElementsByClassName(className)[0]
    };
  });

  var theta = function (alpha) {
    // alpha is degrees, but theta is radians
    return (90 - 2 * alpha) / 180 * Math.PI;
  };

  var transform = function (width, theta) {
    return "translate3d(" + width * Math.sin( theta ) + "px, 0, " + width * Math.cos( theta ) + "px)";
  };

  var openBook = function (d) {
    left.style.webkitTransform  = "rotateY("  + d + "deg)";
    right.style.webkitTransform = "rotateY(-" + d + "deg)";

    pairs.forEach(function(pair){
      pair.left.style.webkitTransform  = transform(pair.right.clientWidth, theta(d));
      pair.right.style.webkitTransform = transform(pair.left.clientWidth, -theta(d));
    });
  }

  var tiltBook = function (p) {
    doc.body.style.webkitTransform = "rotateX(" + p + "deg)";
  }

  doc.addEventListener("keydown", function (e) {
    // listen for arrow left and right, which opens and closes the book
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.keyCode === 37  && d > 0)  { d = d-1; }
      if (e.keyCode === 39  && d < 90) { d = d+1; }
      openBook(d);
    }

    if (e.keyCode === 38 || e.keyCode === 40) {
      if (e.keyCode === 40  && p > -45) { p = p-1; }
      if (e.keyCode === 38  && p < 45 ) { p = p+1; }
      tiltBook(p);
    }
  });

  openBook(d);
  tiltBook(p);

})();
