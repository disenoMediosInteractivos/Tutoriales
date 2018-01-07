var bolas = []; //variable que guarda la lista de bolas
var numBolas = 10; //numero de bolas creadas

function setup() {
  createCanvas(windowWidth, windowHeight); //crea un canvas de pantalla completa
  fill(255);
  noStroke();

  //crea las bolas de la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i] = new bola();
  }
}

function draw() {
  background(230);

  //llama a las funciones mostrar y mover de cada una de las bolas en la lista
  fill(255);
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();
  }
  
  //texto
  fill(100);
  text("Arrastre las bolas por la pantalla" , 30, 30);
}

//funcion bola
function bola() {

  //variables de posicion, la bola se crea en una posicion aleatoria en X y Y
  this.x = random(width);
  this.y = random(height);

  //asigna valores de velocidad a la bola
  this.velx = 1;
  this.vely = 1;

  //variable de tamano aleatorio entre 30 y 50
  this.tam = random(30, 50);

  //funcion que dibuja la bola
  this.mostrar = function() {
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion que mueve la bola
  this.mover = function() {

    //el movimiento se asigna por la posicion + la velocidad
    this.x = this.x + this.velx;
    this.y = this.y + this.vely;

    //condicionales para el rebote
    if (this.x > width || this.x < 0) {
      this.velx *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.vely *= -1;
    }
  }

  //cuando se activa esta funcion se cambia la posicion de la bola por la del mouse
  this.arrastrar = function() {
    this.x = mouseX;
    this.y = mouseY;
  }
}

//funcion que se activa si el mouse es arrastrado
function mouseDragged() {

  //recorre la lista de bolas
  for (var i = 0; i < numBolas; i++) {

    //revisa si el mouse esta encima de alguna bola
    if (dist(mouseX, mouseY, bolas[i].x, bolas[i].y) < bolas[i].tam + 10) {

      //llama a la funcion arrastrar
      bolas[i].arrastrar();
    }
  }
}