var bolas = []; //variable que guarda la lista de bolas
var numBolas = 200; //numero de bolas creadas

var w = 0; //variable para guardar el ancho de la pantalla
var h = 0; //variable para guardar el alto de la pantalla

function setup() {
  createCanvas(windowWidth, windowHeight); //crea un canvas de pantalla completa
  w = windowWidth; //guarda el ancho de la pantalla en la variable w
  h = windowHeight; //guarda el alto de la pantalla en la variable h

  background(220);
  fill(100);
  stroke(255);

  //crea las bolas de la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i] = new bola();
  }
}

function draw() {
  background(255);




  //llama a las funciones mostrar y mover de cada una de las bolas en la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();
  }

  text("Cambie el tamaño de la pantalla", 30, 30);
}

//funcion que se activa cuando cambia el tamaño de la ventana del navegador
function windowResized() {

  //si el nuevo tamano de la ventana es mayor al tamano guardado en w y h
  if (windowWidth > w || windowHeight > h) {

    //se pintan las bolas de verde
    fill(0, 255, 0);

    //se llama a la funcion desacelerar para cada una de las bolas
    for (var i = 0; i < numBolas; i++) {
      bolas[i].desacelerar();
      bolas[i].crecer();
    }
  } else {

    //de lo contrario pinta las bolas de rojo
    fill(255, 0, 0);

    //se llama a la funcion acelerar para cada una de las bolas
    for (var j = 0; j < numBolas; j++) {
      bolas[j].acelerar();
      bolas[j].disminuir();
    }
  }

  //se actualiza el nuevo tamano de la pantalla  en las variables w y h
  w = windowWidth;
  h = windowHeight;

  //se cambia el tamano del canvas para que sea del nuevo tamano de la pantalla
  resizeCanvas(w, h);
}


//funcion bola
function bola() {

  //variables de posicion, la bola se crea en una posicion aleatoria en X y Y
  this.x = random(width);
  this.y = random(height);

  //asigna valores de velocidad a la bola. aleatorios entre -2 y 2
  this.velx = random(-2, 2);
  this.vely = random(-2, 2);

  //variable de tamano
  this.tam = 40;

  //funcion que muestra la bola
  this.mostrar = function() {

    //se limitan las variables X y Y para que las bolas siempre esten dentro de la pantalla
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion que mueve la bola
  this.mover = function() {

    //el movimiento se asigna por la posicion + la velocidad
    this.x = this.x + this.velx;
    this.y = this.y + this.vely;

    //condicionales para que rebote la bola
    if (this.x > width || this.x < 0) {
      this.velx *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.vely *= -1;
    }
  }

  //funcion acelerar: aumenta la velocidad de la bola en 0.1
  this.acelerar = function() {

    this.velx += 0.2;
    this.vely += 0.2;
  }

  //funcion crecer: aumenta el tamano de la bola
  this.crecer = function() {
    this.tam++;
  }

  //funcion disminuir: disminuye el tamano
  this.disminuir = function() {
    if (this.tam >= 4) {
      this.tam--;
    }
  }

  //funcion desacelerar: disminuye la velocidad de la bola en 0.1
  this.desacelerar = function() {

    if (this.velx > 0 && this.vely > 0) {
      this.velx -= 0.2;
      this.vely -= 0.2;
    }
  }
}