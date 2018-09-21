var locationData;

let myMap;
let canvas;

const mappa = new Mappa('Leaflet');

var destino;
var localizacion;
var distancia;

var destinoSelec = false;

var options = {
  lat: 	0,
  lng: 	0,
  zoom: 14,
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);

   if (geoCheck() == true) {
     	getCurrentPosition(doThisOnLocation);
      destino = new punto(-100, -100, -100, -100);
      localizacion = new punto(-100, -100, -100, -100);
   }
}

function draw(){
  fill(255);
  noStroke();
  rect(0 , height - 130, 300, height);

  if (destinoSelec) {
    distancia = calcGeoDistance(localizacion.lat, localizacion.lng, destino.lat, destino.lng, 'km')
    fill(0);
    text("Latitud actual: " + localizacion.lat, 20, height - 100);
    text("Longititud actual: " + localizacion.lng, 20, height - 80);
    text("Latitud destino: " + destino.lat, 20, height - 60);
    text("Longitud destino: " + destino.lng, 20,height - 40);
    text("Distancia: " + distancia + " km", 20, height - 20);

  }
}

function drawMap(){
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(dibujarpuntos);
  myMap.onChange( function() {

    fill(255);
    noStroke();
    rect(0 , height - 130, 300, height);
    if (destinoSelec) {

      distancia = calcGeoDistance(localizacion.lat, localizacion.lng, destino.lat, destino.lng, 'km')
      fill(0);
      text("Latitud actual: " + localizacion.lat, 20, height - 100);
      text("Longititud actual: " + localizacion.lng, 20, height - 80);
      text("Latitud destino: " + destino.lat, 20, height - 60);
      text("Longitud destino: " + destino.lng, 20,height - 40);
      text("Distancia: " + distancia + " km", 20, height - 20);

    }
  });
}


function dibujarpuntos() {
  clear();

  strokeWeight(2);
  stroke(0,0, 255);

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
