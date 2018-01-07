//variable que guarda la bola
var b;

function setup() {

  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);
  background(0);

  //se instancia la nueva bola
  b = new bola();
}

function draw() {
  background(0);

  //llamar a las funciones mover, mostrar y desacelerar de la bola
  b.mostrar();
  b.mover();
  b.desacelerar();

  //texto
  fill(255);
  noStroke();
  text("AccX: " + accelerationX, 30, 30);
  text("AccY: " + accelerationY, 30, 50);
}

//funcion bola
function bola() {

  //variables de posicion, la bola se crea en una posicion aleatoria en X y Y
  this.x = random(width);
  this.y = random(height);

  //variable de direccion
  this.dirx = 1;
  this.diry = 1;

  //variables de velocidad
  this.velx = 0;
  this.vely = 0;

  //variables de aceleracion
  this.accx = 0;
  this.accy = 0;

  //variable de tamano
  this.tam = 20;

  //funcion que muestra la bola
  this.mostrar = function() {

    stroke(255);
    strokeWeight(4);
    fill(255, 0, 0);

    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion que mueve la bola
  this.mover = function() {

    //el movimiento se asigna por la posicion + la velocidad y dependiendo de si la direccion es positiva o negativa
    this.x = this.x + (this.velx * this.dirx);
    this.y = this.y + (this.vely * this.diry);

    //la velocidad se asigna por: velocidad actual + aceleracion
    this.velx = this.velx + this.accx;
    this.vely = this.vely + this.accy;

    //se limitan las variabels de velocidad hasta un valor maximo de 30
    this.velx = constrain(this.velx, 0, 30);
    this.vely = constrain(this.vely, 0, 30);

    //se limitan las variabels de velocidad hasta un valor maximo de 2
    this.accx = constrain(this.accx, 0, 2);
    this.accy = constrain(this.accy, 0, 2);

    //condicionales para que rebote la bola
    if (this.x > width - this.tam / 2 || this.x < this.tam / 2) {
      this.dirx *= -1;
    }
    if (this.y > height - this.tam / 2 || this.y < this.tam / 2) {
      this.diry *= -1;
    }
  }

  //funcion que acelera  la bola
  this.acelerar = function() {

    //se toman los valores en X y en Y de aceleracion el dispositivo y se le suman a la aceleracion de la bola
    this.accx += abs(accelerationX) / 200;
    this.accy += abs(accelerationY) / 200;
  }

  //reduce la aceleracion y velocidad de la bola
  this.desacelerar = function() {

    //si la velocidad en x es mayor a 0 se reduce el valor de la aceleracion
    if (this.velx > 0) {
      this.accx -= 0.05;
    } else {
      //si la bola ya esta moviendose muy lento se pone velocidad y aceleracion en 0 para asegurarse de que se vaya a detener
      this.accx = 0.0;
      this.velx = 0.0;
    }

    //si la velocidad en Y es mayor a 0 se reduce el valor de la aceleracion
    if (this.vely > 0) {
      this.accy -= 0.03;
    } else {

      //si la bola ya esta moviendose muy lento se pone velocidad y aceleracion en 0 para asegurarse de que se vaya a detener
      this.accy = 0.0;
      this.vely = 0.0;
    }
  }
}

//cuando el dispositivo detecta movimiento llama a la funcion acelerar de la bola
function deviceMoved() {
  b.acelerar();
}