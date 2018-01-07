var canvas; //crea una variable para guardar el canvas

var bolas = []; //variable que guarda la lista de bolas
var numBolas = 20; //numero de bolas creadas

function setup() {

  //a la variable canvas se le asigna que cree un canvas de pantalla completa
  canvas = createCanvas(windowWidth, windowHeight);

  //cuando el moose est sobre el canvas se llama a la funcion detener
  canvas.mouseOver(detener);

  //cuando el moose est sobre el canvas se llama a la funcion mover
  canvas.mouseOut(mover);
  noStroke();

  //crea las bolas de la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i] = new bola();
  }
}

function draw() {
  background(220);

  //llama a las funciones mostrar y mover de cada una de las bolas en la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();
  }
}

//funcion mover: se activa cuando el mouse sale del canvas
function mover() {

  //recorre la lista de bolas
  for (var i = 0; i < numBolas; i++) {
    //moverse le asigna true a la variable 
    bolas[i].moverse = true;
  }
}

//funcion detener: se activa cuando el mouse entra al canvas
function detener() {

  //recorre la lista de bolas
  for (var i = 0; i < numBolas; i++) {
    //le asigna false a la variable moverse 
    bolas[i].moverse = false;
  }
}

//funcion bola
function bola() {

  //variables de posicion, la bola se crea en una posicion aleatoria en X y Y
  this.x = random(width);
  this.y = random(height);

  //asigna valores de velocidad a la bola
  this.velx = 3;
  this.vely = 3;

  //variable de tamano
  this.tam = random(30, 50);

  //variable booleana para saber si las bolas deben moverse o no
  this.moverse = true;

  //funcion que muestra la bola
  this.mostrar = function() {
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion que mueve la bola
  this.mover = function() {

    //la bola solo se mueve si la variable moverse es true
    if (this.moverse === true) {

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
  }
}