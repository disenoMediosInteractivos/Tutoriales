//variables de tamano y posicion del boton
var botx, boty, tamBot;

function setup() {

  //crea un canvas del tamano de la ventana
  createCanvas(windowWidth, windowHeight);
  background(0);
  rectMode(CENTER);

  //definir posicion y tamaño boton
  botx = 25;
  boty = 25;
  tam = 40;
}

function draw() {
  stroke(255)
  strokeWeight(4);
  fill(random(100, 250), 0, random(100, 250));

  //inicia una figura
  beginShape();

  //recorre todos los puntos en los que se esta tocando la pantalla
  for (var i = 0; i < touches.length; i++) {

    //en las coordenadas de cada punto crea un vertice
    vertex(touches[i].x, touches[i].y);
  }

  //cierra la figura
  endShape(CLOSE);

  //recorre todos los puntos en los que se esta tocando la pantalla y revisa su distancia con respecto al boton
  for (var j = 0; j < touches.length; j++) {

    if (dist(touches[j].x, touches[j].y, botx, boty) < 20) {

      //si el boton es presionado borra la pantalla
      background(0);
    }
  }

  //boton
  fill(255);
  noStroke();
  rect(botx, boty, tam, tam);

  //texto
  text("Ponga 2 o mas dedos en la pantalla para dibujar", botx + 30, boty + 2);
  fill(0);
  text("Borrar", botx - 16, boty + 2);

}