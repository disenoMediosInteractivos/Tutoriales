var locationData;
var lat;
var lng;

let myMap;
let canvas;

const mappa = new Mappa('Leaflet');

var options = {
  lat: 	0,
  lng: 	0,
  zoom: 14,
  style: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


//ideally I would fill options with locationData in a preload function

function setup() {
  
  canvas = createCanvas(windowWidth, windowHeight);

   if (geoCheck() == true) {
     	getCurrentPosition(doThisOnLocation);
   }
}

function drawMap(){
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
  myMap.onChange(drawPoint);
  console.log(locationData);
}


function drawPoint() {

  clear();
  
  const pos = myMap.latLngToPixel(lat, lng); 
  
  fill(200, 100, 100);
  ellipse( pos.x,  pos.y, 20, 20);
  
}

function doThisOnLocation(locationData){
  
  	options.lat = locationData.latitude
  	options.lng = locationData.longitude
  	lat = locationData.latitude
  	lng = locationData.longitude
  
  	drawMap();
}


