var tiempo = [0, 0]; //crea una lista de tiempo para guardar el tiempo entre dos clics
var vel = 0; //variable para guardar la velocidad de los clics

var bolas = []; //variable que guarda la lista de bolas
var numBolas = 20; //numero de bolas creadas


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
  background(220);
  fill(0);

  //la velocidad de la bola se obtiene de la division de 60 segundos entre el intervalo de dos clics
  //tiempo[1] = tiempo en el que se hizo el primer clic
  //tiempo[0] = tiempo en el que se hizo el segundo clic
  var vel = 60000 / (tiempo[1] - tiempo[0]);

  //si han pasado mas de 200 millisegundos entre un clic y otro se asigna un valor de 0 a la velocidad
  if (millis() - tiempo[1] > 200) {
    vel = 0;
  }

  fill(255);

  //llama a las funciones mostrar y mover de cada una de las bolas en la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();
    bolas[i].disminuir();

    //revisa si el mouse esta tocando alguna bola
    if (dist(mouseX, mouseY, bolas[i].x, bolas[i].y) < bolas[i].tam + 5) {

      //llama a la funcion crecer y le da como parametro la velocidad de los clics
      bolas[i].crecer(vel);
    } else {
      //si no se esta tocando ninguna bola se asigna a la variable creciendo un valor de false
      bolas[i].creciendo = false;
    }
  }

  fill(100);
  text("Hacer clic lo más rápido posible sobre las bolas", 30, 30);

  //texto de la pantalla
  //floor() redondea el numero de vel a un valor entero
  text(floor(vel) + " clics por minuto", 30, 50);
}

//funcion que se llama cuando se hace clic
function mouseClicked() {

  //el tiempo del segundo clic se corre a la segunda posicion
  tiempo[0] = tiempo[1];

  //se guarda el tiempo del primer clic en el arreglo
  tiempo[1] = millis();
}

//función bola
function bola() {

  //variables de posicion, la bola se crea en una posicion aleatoria en X y Y
  this.x = random(width);
  this.y = random(height);

  //asigna valores de velocidad a la bola
  this.velx = 1;
  this.vely = 1;

  //variable de tamano
  this.tam = 30;

  //variable booleana para saber si la bola esta creciendo o no
  this.creciendo = false;

  //funcion que dibuja la bola
  this.mostrar = function() {
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

  //funcion que disminuye el tamano de la bola si no se esta oprimiendo
  this.disminuir = function() {

    //revisa que el tamano de la bola sea por lo menos 20 y que la variable creciendo sea false
    if (this.tam >= 20 && !this.creciendo) {

      //reduce el tamano en 0.2
      this.tam -= 0.2;
    }
  }

  //funcion que aumenta el tamano de la bola y recibe por parametro la velocidad de clics
  this.crecer = function(v) {

    //revisa que la velocidad sea por lo menos 200 clics por minuto
    if (v > 200) {

      //a la variable creciendo le asigna true
      this.creciendo = true;

      //aumenta el tamano de la bola en 1 unidad
      this.tam += 1;
    } else {

      //si la velocidad no es mayor a 200 se le asigna false a la variable creciendo
      this.creciendo = false;
    }
  }
}