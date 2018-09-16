var capture;
var tracker;

var w = 640;
var h = 480;

var rojo;
var verde;
var azul;
var rango = 32;

var captureArgs = {
  audio: false,
  video: {
    width: w,
    height: h
  }
}

function obtenerColor(r, g, b) {
  rojo = r;
  verde = g;
  azul = b;
}
function setup() {
    capture = createCapture(captureArgs, function() {
        console.log('captura lista :)')
    });

    capture.size(w, h);
    canvas = createCanvas(w, h);

    capture.parent('container');
    canvas.parent('container');
    // capture.hide();

    obtenerColor(255, 255, 255);
    tracking.ColorTracker.registerColor('seleccion', function(r, g, b) {
    if (r >= rojo - rango && r <= rojo + rango &&
        g >= verde - rango && g <= verde + rango &&
        b >= azul - rango && b <= azul + rango) {
      return true;
    }
    return false;
  });

  tracker = new tracking.ColorTracker(['seleccion']);
  tracker.minDimension = 20;
  capture.elt.id = 'p5video';

  tracking.track('#p5video', tracker, {
       camera: true
   });

  tracker.on('track', function (event) {
        clear();
        strokeWeight(2);
        stroke(255, 0, 0);
        noFill();
        event.data.forEach(function (r) {
            rect(r.x, r.y, r.width, r.height);
        })
  });
}

function draw() {
    image(capture, 0, 0, w, h);
    capture.loadPixels();

    if (capture.pixels.length > 0) {
    }
}
