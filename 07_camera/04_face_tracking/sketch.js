var capture;
var tracker;

var w = 640;
var h = 480;

var captureArgs = {
  audio: false,
  video: {
    width: w,
    height: h
  }
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

  tracker = new tracking.ObjectTracker(['face']);
  capture.elt.id = 'p5video';
  tracker.setInitialScale(4);
  tracker.setStepSize(2);

  tracking.track('#p5video', tracker, {
       camera: true
   });

  tracker.on('track', function (event) {
    clear();
    strokeWeight(2);
    stroke(255, 0, 255);
    noFill();
    event.data.forEach(function (r) {
        rect(r.x, r.y, r.width, r.height);
    })
  });
}

//need to finish this example: create a class for the face rectangle
//and move it instead of create it every time
