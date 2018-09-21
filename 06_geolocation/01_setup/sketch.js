var locationData;

function preload() {
  locationData =  getCurrentPosition();
}

function setup() {
  createCanvas(400, 400);

  if (geoCheck() == true) {
    background(225,255,255);
    watchPosition(positionChanged);

    text("lat: " + locationData.latitude, 10, 20);
    text("long: " + locationData.longitude, 10, 40);
    text("accuracy: " + locationData.accuracy, 10, 60);
    text("altitude: " + locationData.altitude, 10, 80);
    text("altitudeAccuracy: " + locationData.altitudeAccuracy, 10, 100);
    text("heading: " + locationData.heading, 10, 120);
    text("speed: " + locationData.speed, 10, 140);
  } else {
    background(0);
  }
}

function draw() {
}

function positionChanged(locationData) {
  background(random(255));
  text("lat: " + locationData.latitude, 10, 20);
  text("long: " + locationData.longitude, 10, 40);
  text("accuracy: " + locationData.accuracy, 10, 60);
  text("altitude: " + locationData.altitude, 10, 80);
  text("altitudeAccuracy: " + locationData.altitudeAccuracy, 10, 100);
  text("heading: " + locationData.heading, 10, 120);
  text("speed: " + locationData.speed, 10, 140);
}
