# 1. Arrastrar \(simple\)



**¿Cómo saber si una persona quiere arrastrar algún componente o cómo permitir que estos puedan ser arrastrados?** Se puede ver el código de este ejemplo [acá](http://alpha.editor.p5js.org/laurajunco/sketches/SkozlcA0Z)

### a. Saber si el ratón se encuentra sobre el objeto

```javascript
  //revisa si la posición del mouse es cercana a la posicion de la ellipse
  if (dist(mouseX, mouseY, x, y) < tam / 2) {

    //actualiza la posicion de la elipse con la posición del mouse
    x = mouseX;
    y = mouseY;
  }
```

Utilizando el comando [dist\(\)](https://p5js.org/reference/#/p5/dist) dentro de una **estructura condicional** se puede saber si el ratón se encuentra cercano al objeto que se va a arrastrar.

### b. Saber si el ratón esta siendo arrastrado

```javascript
//funcion que se activa si el mouse es arrastrado
function mouseDragged() {

  //revisa si la posición del mouse es cercana a la posicion de la ellipse
  if (dist(mouseX, mouseY, x, y) < tam / 2 ) {

  }
}
```

La función [mouseDragged\(\)](https://p5js.org/reference/#/p5/mouseDragged) se activa cada vez que el ratón es arrastrado dentro de la pantalla. Así, lo que se desee que ocurra cuando el ratón se arrastra debe ir **dentro de esta función**.

**mouseDragged\(\)** solo se activa cuando el mouse se arrastra, una vez se deje de arrastrar el mouse todos los comportamientos dentro de la función **dejarán de suceder**.

### c. Mover los objetos una vez se cumplan ambas condiciones

```javascript
//funcion que se activa si el mouse es arrastrado
function mouseDragged() {
​
  //revisa si la posición del mouse es cercana a la posicion de la ellipse
  if (dist(mouseX, mouseY, x, y) < tam / 2 ) {
​
    //actualiza la posicion de la elipse con la posición del mouse
    x = mouseX;
    y = mouseY;
    
  }
}
```

* Por último, pintar una elipse en las posición x, y

```javascript
function draw() {

  ellipse(x, y, tam, tam);
}
```

