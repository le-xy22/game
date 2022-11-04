//variaveis da bolinha

let xBolinha = 300;
let yBolinha = 200;
let diamentro = 15;

//variaveis da velocidade bolinha

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raio = diamentro / 2;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis da raquete

let xRaquete=5;
let yRaquete=150;

//variaveis da raqueteOponente

let xRaqueteOponente= 585;
let yRaqueteOponente= 150;
let velocidadeYOponente;

let colidiu = false;

// placar do jogo

let meusPontos = 0;
let pontosdoOponente = 0;

let chanceDeErrar=0;

//sons do jogo

let trilha;
let raquetada;
let ponto;

function preload() 
{
    trilha = loadSound("sons/trilha.mp3");
    raquetada = loadSound("sons/raquetada.mp3");
    ponto = loadSound("sons/ponto.mp3");
}

function setup() 
{
  createCanvas(600, 400);
  trilha.loop();
}

function draw() 
{
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaminhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete (xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha ()
{
   circle(xBolinha,yBolinha,diamentro);
}

function movimentaBolinha ()
{
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha; 
}

function verificaColisaoBorda()
{ 
  if (xBolinha + raio> width || 
     xBolinha - raio < 0 ){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0 ) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete (x,y)
{
  rect(x,y,raqueteComprimento,raqueteAltura);
}
  
function movimentaminhaRaquete ()
{
  if (keyIsDown(UP_ARROW))
  {
          yRaquete -=10;
  }
  if(keyIsDown (DOWN_ARROW))
  {
      yRaquete += 10;
  }
}

function verificaColisaoRaquete ()
{
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete)
  {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete ( x,y) 
{
  colidiu = 
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) 
  {
   velocidadeXBolinha *= -1;
   raquetada.play();
  }
}

function movimentaRaqueteOponente ()
{
    velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() 
{
  if (pontosdoOponente >= meusPontos) 
  {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39)
    {
    chanceDeErrar = 40
    }
  } else{
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35)
    {
    chanceDeErrar = 35
    }
  }
}
  function incluiPlacar()
  {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill (color (255,140,0))
    rect(150,10,40,20);
    fill (255);
    text(meusPontos, 170,26);
    fill (color (255,140,0))
    rect(450,10,40,20);
    fill (255);
    text (pontosdoOponente, 470,26);
  }
function marcaPonto()
{
  if (xBolinha >590)
  {
    meusPontos +=1;
    ponto.play();
  }
  
  if(xBolinha <10)
  {
    pontosdoOponente +=1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa()
{
    if (XBolinha - raio < 0)
    {
    XBolinha = 23
    }
}
