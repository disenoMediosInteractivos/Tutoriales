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
    createCanvas(w, h);
    capture.hide();

    tracker = new clm.tracker();
    tracker.init(pModel);
    tracker.start(capture.elt);
}

function draw() {
    image(capture, 0, 0, w, h);

    // noFill();
    // stroke(255);
    // beginShape();
    // for (var i = 0; i < positions.length; i++) {
    //     vertex(positions[i][0], positions[i][1]);
    // }
    // endShape();
}
