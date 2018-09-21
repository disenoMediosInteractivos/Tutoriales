var locationData;

let myMap;
let canvas;

const mappa = new Mappa('Leaflet');

var destino;
var localizacion;

var destinoSelec = false;

var options = {
  lat: 	0,
  lng: 	0,
  zoom: 14,
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  stroke(0,0, 255);

   if (geoCheck() == true) {
     	getCurrentPosition(doThisOnLocation);
      destino = new punto(-100, -100, -100, -100);
      localizacion = new punto(-100, -100, -100, -100);
   }
}

function drawMap(){
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(dibujarpuntos);

}


function dibujarpuntos() {
  clear();

  const pos = myMap.latLngToPixel(localizacion.lat, localizacion.lng);
  localizacion.mover(pos.x, pos.y, localizacion.lat, localizacion.lng);
  fill(255, 0, 0);
  localizacion.dibujar(20);
  fill(255);

  const destinoPos = myMap.latLngToPixel(destino.lat, destino.lng);
  destino.mover(destinoPos.x, destinoPos.y, destino.lat, destino.lng);
  destino.dibujar(10);

  if(destinoSelec) {
    localizacion.calcDist(destino);
  }

}


function doThisOnLocation(locationData){

  	options.lat = locationData.latitude
  	options.lng = locationData.longitude

    localizacion.lat = locationData.latitude
    localizacion.lng = locationData.longitude

  	drawMap();
}

function mousePressed() {
  destinoSelec = true;

  const position = myMap.pixelToLatLng(mouseX, mouseY);
  destino.mover(mouseX, mouseY, position.lat, position.lng);
  dibujarpuntos();

}

function punto(x, y, lat, lng) {
  this.x = x;
  this.y = y;
  this.lat = lat;
  this.lng = lng;

  this.dibujar = function(l){
    ellipse(this.x, this.y, l, l);
  }

  this.mover = function(x, y, lat, lng){
    this.x = x;
    this.y = y;
    this.lat = lat;
    this.lng = lng;
  }

  //esta función recibe como parametro un objeto punto
  this.calcDist = function(p) {

    line(this.x, this.y, p.x, p.y);

  }
}
