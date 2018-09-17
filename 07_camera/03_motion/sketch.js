var capture;
var previousPixels;

var w = 640;
var h = 480;

var thresholdAmount = 25;

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
    createCanvas(w, h);
    capture.hide();
}

function draw() {
    capture.loadPixels();

    var total = 0;

    if (capture.pixels.length > 0) { // don't forget this!
        if (!previousPixels) {
            previousPixels = copyImage(capture.pixels, previousPixels);
        } else {
                w = capture.width;
                h = capture.height;
            var i = 0;
            var pixels = capture.pixels;


            for (var y = 0; y < h; y++) {

                for (var x = 0; x < w; x++) {

                    // calculate the differences
                    var rdiff = Math.abs(pixels[i + 0] - previousPixels[i + 0]);
                    var gdiff = Math.abs(pixels[i + 1] - previousPixels[i + 1]);
                    var bdiff = Math.abs(pixels[i + 2] - previousPixels[i + 2]);
                    // copy the current pixels to previousPixels
                    previousPixels[i + 0] = pixels[i + 0];
                    previousPixels[i + 1] = pixels[i + 1];
                    previousPixels[i + 2] = pixels[i + 2];
                    var diffs = rdiff + gdiff + bdiff;
                    var output = 0;

                    if (diffs/3 > thresholdAmount) {
                        output = 255;
                        total += diffs;
                    }
                    pixels[i++] = output;
                    pixels[i++] = output;
                    pixels[i++] = output;
                    pixels[i++];

                }
            }
        }
    }
    // need this because sometimes the frames are repeated
    if (total > 0) {
        capture.updatePixels();
        image(capture, 0, 0, 640, 480);
    }
}

function copyImage(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) {
        dst = new src.constructor(n);
    }
    while (n--) {
        dst[n] = src[n];
    }
    return dst;
}
