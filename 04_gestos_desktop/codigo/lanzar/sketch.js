var bolas = []; //variable que guarda la lista de bolas
var numBolas = 0; //numero de bolas creadas

function setup() {

  createCanvas(windowWidth, windowHeight); //crea un canvas de pantalla completa
  background(255);
  noStroke();
}

function draw() {

  //efecto de motion blur
  fill(255, 80);
  rect(0, 0, width, height);


  fill(255, 0, 0);

  //llama a las funciones mostrar, mover y morir de cada una de las bolas en la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();
    bolas[i].morir();
  }

  //texto
  fill(100);
  text("Arrastre el ratón para lanzar bolas", 30, 30);
}


//funcion bola
function bola(px, py) {

  //variables de posicion, la bola se crea en la posición del raton
  this.x = mouseX;
  this.y = mouseY;

  //variables de velocidad que recibe la funcion
  this.velx = px;
  this.vely = py;

  //variable de tamano aleatorio entre 30 y 60
  this.tam = random(30, 60);


  //funcion que dibuja la bola
  this.mostrar = function() {
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion que mueve la bola
  this.mover = function() {

    //el movimiento se asigna por la posicion + la velocidad
    this.x = this.x + this.velx;
    this.y = this.y + this.vely;

    //aumenta la velocidad en Y constantemente para dar un efecto de gravedad
    this.vely += 0.5;

    //condicionales para que rebote la bola
    if (this.x > width || this.x < 0) {
      this.velx *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.vely *= -1;
    }
  }

  //reduce el tamano de la bola hasta llegar a 0
  this.morir = function() {
    if (this.tam >= 0) {
      this.tam -= 0.1;
    }
  }
}

//funcion que se activa si el mouse es arrastrado
function mouseDragged() {

  //solo se pueden crear bolas en frames multiplos de 10, esto hace que no se puedan crear bolas tan seguido
  if (frameCount % 10 != 0) {
    return;
  }

  //posicion actual del raton
  var x1 = mouseX;
  var y1 = mouseY;

  //posicion anterior del raton
  var x2 = pmouseX;
  var y2 = pmouseY;

  //la velocidad se mide restando la posicion guardada del mouse con la posición que se habia guardado de este
  var velx = x1 - x2;
  var vely = y1 - y2;

  // se cra una nueva bola que recibe por parametro las velocidades en x y y del mouse
  bolas[numBolas] = new bola(velx, vely);

  //aumenta el numero de bolas de la lista
  numBolas++;
}