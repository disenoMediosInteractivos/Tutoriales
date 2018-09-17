var capture;
var tracker;

var w = 640;
var h = 480;

var rojo;
var verde;
var azul;
var col;
var rango = 25;

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
  col = color(rojo, verde, azul);
}

function setup() {
    capture = createCapture(captureArgs, function() {
        console.log('captura lista :)')
    });

    capture.size(w, h);
    pixelDensity(1);
    canvas= createCanvas(w, h);

    capture.parent('container');
    canvas.parent('container');

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
        stroke(col);
        noFill();
        event.data.forEach(function (r) {
            rect(r.x, r.y, r.width, r.height);
        })
      });
    }

function mousePressed() {
    if (mouseX > 0 && mouseX < width &&
        mouseY > 0 && mouseY < height) {

          capture.loadPixels();
          var sel = capture.get(mouseX, mouseY);
          obtenerColor(sel[0], sel[1], sel[2]);
    }
}
