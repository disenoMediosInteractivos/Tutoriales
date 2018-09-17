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
  var positions = tracker.getCurrentPosition();

  noFill();
  stroke(0, 255, 0);

  if (positions.length > 0) {

    //dibujar lineas
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    //numeros
    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(255, 0, 0);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        // text(i, positions[i][0], positions[i][1]);
    }
  }
}
