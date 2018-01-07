//variable para guardar la bola
var b;

//variable comida
var c;

function setup() {

  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);

  //crea un objeto de la funcion bola
  b = new bola();
  c = new comida();
}

function draw() {
  background(0, 0, 0);

  //imprime los valores de rotacion en X y en Y
  fill(255);
  noStroke();
  text("X: " + floor(rotationY), 20, 40);
  text("Y: " + floor(rotationX), 20, 20);

  //muestra y mueve la bola
  b.mostrar();
  b.mover();
  b.disminuir()

  //muestra la comida
  c.mostrar();

  //revisa que la bola este tocando la comida
  if (dist(b.x, b.y, c.x, c.y) < b.tam / 2 + c.tam / 2) {

    //llama a la funcion morir de la comida
    c.morir();

    //llama a la funcion crecer de la bola y le pasa como parametro el tamano de la comida
    b.crecer(c.tam);
  }

}


function bola() {

  //el tamano es relativo al ancho de la ventana
  this.tam = windowWidth / 8;

  //asigna la posicion en el centro de la ventana
  this.x = width / 2;
  this.y = height / 2;

  //variables de velocidad inician en cero
  this.velx = 0;
  this.vely = 0;

  //funcion mostrar: dibuja la bola
  this.mostrar = function() {
    fill(0, 0, 255);
    strokeWeight(4);
    stroke(255);
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion mover: dibuja la bola
  this.mover = function() {

    //el movimiento se asigna por la posicion + la velocidad
    this.x = this.x + this.velx;
    this.y = this.y + this.vely;

    //rotationX contola Y
    this.vely = map(rotationX, -90, 90, -3, 3);

    //rotation Y controla X
    this.velx = map(rotationY, -90, 50, -3, 3);

    //evita que la bola salga de la pantalla
    this.x = constrain(this.x, this.tam / 2, width - this.tam / 2);
    this.y = constrain(this.y, this.tam / 2, height - this.tam / 2);
  }

  //funcion crecer: aumenta el tamano de la bola con el valor que llega por parametro. 
  this.crecer = function(t) {
    if (this.tam <= 200) {
      this.tam += t;
    }
  }

  //funcion disminuir; disminuye constantemente el tamano de la bola hasta llegar a un minimo de 3
  this.disminuir = function(t) {
    if (this.tam >= 3) {
      this.tam -= 0.05;
    }
  }
}

function comida() {

  //el tamano es relativo al ancho de la ventana
  this.tam = random(10, windowWidth / 10);

  //asigna la posicion en el centro de la ventana
  this.x = random(this.tam / 2, width - this.tam / 2);
  this.y = random(this.tam / 2, height - this.tam / 2);

  //funcion mostrar: dibuja la bola
  this.mostrar = function() {
    fill(255, 0, 0);
    strokeWeight(4);
    stroke(255);
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion morir: 
  this.morir = function() {
    this.x = random(this.tam / 2, width - this.tam / 2);
    this.y = random(this.tam / 2, height - this.tam / 2);
  }
}