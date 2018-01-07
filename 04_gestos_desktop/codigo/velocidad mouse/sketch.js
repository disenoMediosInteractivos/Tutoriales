var bolas = []; //variable que guarda la lista de bolas
var numBolas = 0; //numero de bolas creadas
var vel = 0; //variable para guardar la velocidad del mouse

function setup() {
  createCanvas(windowWidth, windowHeight); //crea un canvas de pantalla completa
  fill(255);
  noStroke();
}

function draw() {
  background(220);

  //difX es la resta de la posicion x del mouse actual con la posicion del mouse anterior
  var difX = abs(mouseX - pmouseX);

  //difY es la resta de la posicion y del mouse actual con la posicion del mouse anterior
  var difY = abs(mouseY - pmouseY);

  //se elevan las diferencias a al poder de 2
  difX = pow(difX, 2);
  difY = pow(difY, 2);

  //la velocidad es dada por el teorema de pitagoras c = sqrt(a^2 + b^2)
  //con floor() se redondea la velocidad a un numero entero
  var vel = floor(sqrt(difX + difY));

  //texto que muestra la velocidad en la pantalla
  fill(100);
  text("Velocidad del ratón: " + vel, 30, 30);

  //revisa que la velocidad del mouse es mayor a 80 y el mouse este presionado 
  if (vel > 80 && mouseIsPressed) {

    //crea una nueva bola en la posicion mouseX, mouseY y envía la velocidad como parametro
    bolas[numBolas] = new bola(mouseX, mouseY, vel);

    //aumenta el numero de bolas de la lista
    numBolas++;
  }

  fill(255);

  //llama a las funciones mostrar, morir y mover de cada una de las bolas en la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();
    bolas[i].morir();
  }
}


//funcion bola recibe (posicion del mouse en X, posicion del mouse en Y, velocidad del ratón)
function bola(px, py, v) {

  //variables de posicion, la bola se crea en la posicion X y Y del mouse que recibe por parametro
  this.x = px;
  this.y = py;

  //variables de velocidad
  //la velocidad de cada bola se determina por la velocidad del mouse
  this.velx = (v - 100) / 2;
  this.vely = (v - 100) / 2;

  //variable de tamano
  this.tam = random(10, 40);

  //funcion que dibuja la bola
  this.mostrar = function() {
    ellipse(this.x, this.y, this.tam, this.tam);
  }

  //funcion que mueve la bola
  this.mover = function() {

    //el movimiento se asigna por la posicion + la velocidad
    this.x = this.x + this.velx;

    //aumenta la velocidad en Y constantemente para dar un efecto de gravedad
    this.vely += 0.5;
    this.y = this.y + this.vely;

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