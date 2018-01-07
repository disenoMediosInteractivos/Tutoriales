import http.requests.*;

//importar biblioteca para hacer http requests
import http.requests.*;

//variable que guarda el estado del botón
boolean prendido = false; 

void setup() {
  size(500, 500);
  noStroke();
    fill(255, 0, 0);
}

void draw() {
  background(255);
  //dibujar elipse del botón
  ellipse(width/2, height/2, 150, 150);
}

//función que se activa si el mouse es oprimido
void mousePressed() {
  //revisa que el mouse este tocando el botón
  if (dist(mouseX, mouseY, width/2, height/2) < 150) {
    //si el led esta apagado
    if (prendido == false) {
      //cambia el color a verde
      fill(0, 255, 0);
      
      //llamar url que prende el LED
      GetRequest get = new GetRequest("http://192.168.0.8/arduino/digital/13/1");
      get.send();
     
      //cambia el estado a prendido
      prendido = true;
      
      //si el led esta prendido
    } else {
      //cambia el color a rojo
      fill(255, 0, 0);
      
      //llamar url que apaga el LED
      GetRequest get = new GetRequest("http://192.168.0.8/arduino/digital/13/0");
      get.send();
      
      
      //cambia el estado a apagado
      prendido = false;
    }
  }
}