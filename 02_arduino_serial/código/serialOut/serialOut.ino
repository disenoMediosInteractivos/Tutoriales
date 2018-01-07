const int analogIn = A0; //Pin que lee los datos del sensor
int sensorValue = 0; //datos recibidos

void setup() {
  //inicia la comunicación serial en 9600 bps:
  Serial.begin(9600);
}
void loop() {
  //lee los datos recibidos del sensor y los guarda en la variable sensorValue
  sensorValue = analogRead(analogIn); 
  //Imprime los resultados en el monitor serial
  Serial.write(sensorValue);
  delay(2);
}
