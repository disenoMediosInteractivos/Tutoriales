var locationData;

let myMap;
let canvas;

const mappa = new Mappa('Leaflet');

var destino;
var yo;

var options = {
  lat: 	0,
  lng: 	0,
  zoom: 14,
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  // stroke(255);
  // strokeWeight(2);

   if (geoCheck() == true) {
     	getCurrentPosition(doThisOnLocation);
      destino = new punto(-100, -100, -100, -100);
      localizacion = new punto(-100, -100, -100, -100);
   }
}

function drawMap(){
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(dibujarLocalizacion);

}


function dibujarLocalizacion() {

  clear();

  const pos = myMap.latLngToPixel(localizacion.lat, localizacion.lng);
  localizacion.mover(pos.x, pos.y, localizacion.lat, localizacion.lng);
  fill(255, 0, 0);
  localizacion.dibujar();

}

function dibujarDestino(){
  console.log ('voy a dibujar el destino');
  console.log (destino);
  clear();
  fill( 0,255, 0);
  destino.dibujar();
}

function doThisOnLocation(locationData){

  	options.lat = locationData.latitude
  	options.lng = locationData.longitude

    localizacion.lat = locationData.latitude
    localizacion.lng = locationData.longitude

  	drawMap();
}

function mousePressed() {
  const position = myMap.pixelToLatLng(mouseX, mouseY);

  destino.mover(mouseX, mouseY, position.lat, position.lng);
  dibujarDestino();
  dibujarLocalizacion();

}

function punto(x, y, lat, lng) {
  this.x = x;
  this.y = y;
  this.lat = lat;
  this.lng = lng;

  this.dibujar = function(){
    ellipse(this.x, this.y, 20, 20);
  }

  this.mover = function(x, y, lat, lng){
    this.x = x;
    this.y = y;
    this.lat = lat;
    this.lng = lng;
  }

  this.calcDist = function(lat, lng){

  }
}
