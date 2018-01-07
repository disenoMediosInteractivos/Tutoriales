var serial; // Variable que guarda una instancia de la libreria p5.serialport
var portName = '/dev/cu.usbmodem1421'; //variable con el nombre del puerto
var data = 0; //datos que llegan del puerto serial

function setup() {
  serial = new p5.SerialPort(); // crea una nueva instancia de la libreria p5.serialport

  serial.on('list', printList); //llama a la función printList
  serial.on('connected', serverConnected); // llama a la función printList
  serial.on('open', portOpen); // llama a la función portOpen
  serial.on('data', serialEvent); // llama a la función serialEvent
  serial.on('error', serialError); // llama a la función serialError
  serial.on('close', portClose); // llama a la función portClose

  serial.open(portName); // open a serial port
}

function draw() {
  background(0);
  fill(255);
  //dibuja una elipse con radio dictado por los datos recibidos
  ellipse(width / 2, height / 2, data, data);
}

function serverConnected() {
  println('conectado al servidor');
}

function portOpen() {
  println('el puerto serial fue abierto')
}

function serialEvent() { //llamada cuando se reciben datos al puerto serial
  data = serial.read(); //lee los datos
  console.log(data); //los imprime
}

function serialError(err) {

  println('algo salió mal' + err);
}

function portClose() {

  println('el puerto serial se cerró');
}

//función que imprime una lista con los puertos seriales disponibles
function printList(portList) {
  // portList es una lista con los puertos
  for (var i = 0; i < portList.length; i++) {
    //imprime los puertos en la consola
    console.log(i + " " + portList[i]);
  }
}