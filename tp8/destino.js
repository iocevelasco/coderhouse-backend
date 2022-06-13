"use strict";

var random_rgba = function random_rgba() {
  var o = Math.round;
  var r = Math.random;
  var s = 255;
  return "rgba(".concat(o(r() * s), ",").concat(o(r() * s), ",").concat(o(r() * s), ",'").concat(r().toFixed(1), ")");
};

var color = random_rgba();
console.log('color', color);
console.log('color', color);
