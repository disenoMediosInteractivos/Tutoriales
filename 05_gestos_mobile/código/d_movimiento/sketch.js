var bolas = []; //variable que guarda la lista de bolas
var numBolas = 15; //numero de bolas creadas


function setup() {

  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);
  background(0);

  //crea las bolas de la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i] = new bola();
  }
}

function draw() {
  background(0);

  //llama a las funciones mostrar y mover de cada una de las bolas en la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();
  }
}

//funcion bola
function bola() {

  //variable que indica si esta viva o muerta
  this.viva = true;

  //variables de posicion, la bola se crea en una posicion aleatoria en X y Y
  this.x = random(width);
  this.y = random(height);

  //asigna valores de velocidad a la bola. aleatorios entre -2 y 2
  this.velx = random(-2, 2);
  this.vely = random(-2, 2);

  //variable de tamano
  this.tam = 20;

  //funcion que muestra la bola
  this.mostrar = function() {

    stroke(255);
    strokeWeight(4);

    //si esta viva la pinta azul, de lo contrario la pinta de rojo
    if (this.viva) {
      fill(0, 0, 255);
    } else {
      fill(255, 0, 0);
    }

    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion que mueve la bola
  this.mover = function() {

    //solo se mueve si esta viva
    if (this.viva) {

      //el movimiento se asigna por la posicion + la velocidad
      this.x = this.x + this.velx;
      this.y = this.y + this.vely;

      //condicionales para que rebote la bola
      if (this.x > width - this.tam / 2 || this.x < this.tam / 2) {
        this.velx *= -1;
      }
      if (this.y > height - this.tam / 2 || this.y < this.tam / 2) {
        this.vely *= -1;
      }
    }
  }

  //cambia el estado de viva a false
  this.matar = function() {
    this.viva = false;
  }
}

//esta funcion se activa cuando el dispositivo reconoce que se movio un toque en la pantalla
function touchMoved() {

  //recorre toda la lista de bolas
  for (var i = 0; i < numBolas; i++) {

    //revisa si se estaba tocando alguna bola y en tal caso la mata
    //se usa touches[0] porque se asume que solo hay un toque a la vez
    if (dist(touches[0].x, touches[0].y, bolas[i].x, bolas[i].y) < 15) {
      bolas[i].matar();
    }
  }
}