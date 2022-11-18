
let Nave = new Player(275,750,60,60,0,"imagens/nave.png") //Instância do objeto Nave, parâmetros: Ponto x, Ponto y, Largura, Altura, velocidade de queda (Nesse caso não tem), endereço da imagem  
let back = new Player(0,0,650,1156,0,'imagens/background.jpg') //Instância do objeto Background ||| Será necessário criar uma classe para imagens de cenário, fica mais organizado 
let inimigo1 = new Player(0,0,80,80,20,'imagens/inimigo1.png') //Instância do objeto inimigo1, nesse possui velocidade 2.2
let inimigo2 = new Player(200,0,80,80,30,'imagens/inimigo2.png')
let inimigo3 = new Player(400,0,80,80,45,'imagens/inimigo3.png')
let vida = new Player(10,10,30,30,0,'imagens/nave.png') //Instância do objeto vida ||| Pertencerá a classe de imagens de cenário
let vida1 = new Player(40,10,30,30,0,'imagens/nave.png') 
let vida2 = new Player(70,10,30,30,0,'imagens/nave.png')
let vida3 = new Player(100,10,30,30,0,'imagens/nave.png')

function jogo(){
    //Chamada para os métodos de desenho 
    back.desenhar() 
    Nave.desenhar()
    inimigo1.desenhar()
    inimigo2.desenhar()
    inimigo3.desenhar() 

    //Teste de colisão da nave com os inimigos 
    inimigo1.colidir(Nave)
    inimigo2.colidir(Nave)
    inimigo3.colidir(Nave)

    //Métodos de movimento das naves inimigas 


   inimigo1.cair() //Movimento para baixo(queda)
   inimigo2.cair()
   inimigo3.cair()
  


    Nave.pontuar(inimigo1,inimigo2,inimigo3) // Método que verifica se os inimigos passaram pela nave sem atingi-la, em outras palavras, verifica se nosso player desviou de uma nave inimiga 
    ctx.fillStyle = 'blue'
    ctx.fillRect(660,700,60,60);
    ctx.fillStyle = 'red'
    ctx.fillRect(725,700,60,60);
    ctx.fillStyle = 'gray'
    ctx.fillRect(670,10,50,50);
    ctx.fillRect(730,10,50,50);
    ctx.fillRect(790,10,50,50);
    time() // Cronômmetro 
    
    // Aumento de dificuldade, sempre que os segundos estiverem em 10 e em 30, a velocidade irá mudar 3 vezes: 10s, 40s, 1:10min, num modo infinito a velocidade cresce inifinitamente... 1:30min, 2:10min, 2:30min, 3:10....
    if((segundos == 10 || segundos == 30) && miliSegundos == 0){ 
        inimigo1.velocidade += 5 //Aumentamos em 1 a velocidade de cada inimigo 
        inimigo2.velocidade += 5
        inimigo3.velocidade += 5
    }
    // Colocar na tela a Quantidade de minutos, Quantidade de segundos, Quantidade de Milisegundos, nas posições (220,100) (Em java essas posições poderão mudar)
    ctx.fillStyle = 'white' //Texto na cor branca
    ctx.font = "30px Arial" //Texto de 30px fonte Arial


    ctx.fillText(`${minutos}:${segundos}:${miliSegundos}`,220,100)
    ctx.fillText(`Pontos: ${Nave.pnts}`,10,70) //texto que apresenta a quantdade de pontos

   perder(Nave.vida) // Função que verifica se a vida chegou em 0 (Player perdeu)
   ganhar(minutos,segundos) //Função que verifica se chegou em determinado tempo (Ganha quem sobreviver ao tempo estabelecido)

    // Condições para desenhar as vidas na tela
    if (Nave.vida > 0){ 
        vida.desenhar()
        if(Nave.vida > 1){
            vida1.desenhar()
            if(Nave.vida > 2){
                vida2.desenhar()
                if(Nave.vida > 3){
                   vida3.desenhar() 
                }
            }
        }
    }

}
//Funções dos botões 
function direita(){
    Nave.moverDireita()
}
function esquerda(){
    Nave.moverEsquerda()
}

// Função time 
let miliSegundos = 0 //Quantidade de milisegundos
let segundos = 0 //Quantidade de segundos 
let minutos = 0 //Quantidade de minutos

//Lembrando que essa função está sendo chamada a cada 0,01 segundos
function time(){ 
    miliSegundos++ //Cada vez que ela é chamada incrementamos 1 milisegundo que corresponde a 0,01 segundo
    if(miliSegundos == 10){ // Quando chamarmos a função 100 vezes, atingiremos 1 segundo, pois 0,01(tempo de repetição) * 100(quantidade de repetição) = 1  
            segundos++ //Incrementamos na quantidade de segundos
            miliSegundos = 0 //Resetamos a quantidade de miliSegundos
        if(segundos == 60){ // 60 seg = 1 min
            minutos++ //Incrementa o minuto
            segundos = 0 //Reseta o segundo
        }
    }
}
let ativo = false //Verifica se o jogo já está ativo
function jogar(){ //Dá play no jogo
    if(!ativo){ //Se ele estiver desligado
        rodar = setInterval(jogo,100) //Começa a rodar o jogo e armazena a repetiçaõ numa variável, atualizando os frames a cada 10 milésimos de segundo (eu acho), 0,01 seg
        ativo = true // Coloca o jogo como ativo, caso contrário, poderíamos clicar em jogor e chamar a função muitas vezes fazendo com que ele inicie muitos processos e aumente a velocidade (vai pedir muitas atualizações de cena)
        clearInterval(descanso)
    }
}
function pausar(){ //Pausa o jogo
    clearInterval(rodar) //Interrompe a repetição queficou aramazenada na variável rodar(Não sei se é possível fazer em java, teremos que usar outro artifício(Talvez colocar uma condição para só desenhar o jogo caso não estiver pausado))
    ativo = false //Jogo agora está parado
}
function reiniciar(){
    Nave.x = 275;
    Nave.pnts = 0;
    Nave.vida = 4;

    inimigo1.y = 0;
    inimigo2.y = 0;
    inimigo3.y = 0;

    inimigo1.x = 0;
    inimigo2.x = 200;
    inimigo3.x = 400;

    inimigo1.velocidade = 20;
    inimigo2.velocidade = 30;
    inimigo3.velocidade = 45;

    minutos = 0;
    segundos = 0;
    miliSegundos = 0; 

    jogo(); 
}
function perder(vida){ // verificar se eu perdi todas as vidas
    if(vida <= 0){ //Se vida <= 0, sem vidas, perdeu
        pausar() //Pausa a repetição

        //Coloca um texto na tela
        ctx.fillText('Perdeu! ):', 150, 170) 
        ctx.fillText('Quantidades de pontos feitos:', 60, 240)
        ctx.fillText('' + Nave.pnts, 150, 280)
    }
}
function ganhar(min,seg){ //verifica se ganhou
    if(min == 1 && seg == 30){ //Se sobrevivel até esse time
        pausar() //Pausa o jogo

        //Coloca um texto na tela
        ctx.fillText('Ganhou (:', 150, 170) 
        ctx.fillText('Quantidades de pontos feitos:', 60, 240)
        ctx.fillText('' + Nave.pnts, 150, 280)
    }
}
