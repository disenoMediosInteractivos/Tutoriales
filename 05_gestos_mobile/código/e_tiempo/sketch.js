var bolas = []; //variable que guarda la lista de bolas
var numBolas = 0; //numero de bolas creadas

//contador de tiempo presionado
var contador = 0;

//variable para saber si esta contando o no
var contar = false;

function setup() {

  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0);

  //texto
  fill(255);
  noStroke();
  text("Mantenga presionada la pantalla para crear bolas", 20, 20);
  text("Tiempo presionado: " + contador, 20, 40);

  //contar: la cuenta aumenta si contar es true y si el numero de frame es multiplo de 10
  if (frameCount % 10 != 0 && contar) {

    //aumenta el valor del contador
    contador++;
  }

  //va dibujando la elipse mientras se esta presionando la pantalla
  if (contar) {
    stroke(255);
    strokeWeight(4);
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, contador, contador);
  }

  //llama a los metodos mostrar y mover de las bolas
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();
  }
}

//esta funcion se activa cuando la pantalla es tocada: cambia contar a verdadero
function touchStarted() {
  contar = true;
}

//cuando se deja de tocar la pantalla se activa
function touchEnded() {

  // se crea una nueva bola que recibe por parametro las velocidades en x y y del mouse
  bolas[numBolas] = new bola(contador);

  //aumenta el numero de bolas de la lista
  numBolas++;

  //contar vuelve a ser falso y se reinicia el contador
  contar = false;
  contador = 0;
}


//funcion bola, recibe como parametro el tamano que va a tener
function bola(t) {

  //variables de posicion, la bola se crea en una posicion aleatoria en X y Y
  this.x = mouseX;
  this.y = mouseY;

  //variables de velocidad
  this.velx = random(-2, 2);
  this.vely = random(-2, 2);

  //variable de tamano
  this.tam = t;

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
    this.x += this.velx;
    this.y += this.vely;

    //condicionales para que rebote la bola
    if (this.x > width - this.tam / 2 || this.x < this.tam / 2) {
      this.velx *= -1;
    }
    if (this.y > height - this.tam / 2 || this.y < this.tam / 2) {
      this.vely *= -1;
    }
  }
}