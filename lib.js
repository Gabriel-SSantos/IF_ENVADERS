let canvas = document.getElementById('canvas') 
let ctx = canvas.getContext('2d') 
let main = document.getElementsByTagName('main')[0]
let altura = document.body.clientHeight
let largura = document.body.clientWidth

canvas.style.height = `${altura*0.85}px`
if(largura < 600){
    canvas.style.width = `${altura*(2/3)}`
}

//Essa classe é a junção de 4, teremos que dividir entre mães e filhas
//Classe mãe (Precisa de um nome)
//Classe de desenhosfixos(imagens de cenário)
//Classe do nosso player
//Classe dos inimigos
class Player{
    constructor(pontox, pontoy, largura, altura,vel, img){
        this.x = pontox, //Classe mãe
        this.y = pontoy, //Classe  mãe
        this.altura = altura, //Não necessário
        this.largura = largura, //Não necessário
        this.velocidade = vel, //Classe de inimigos
        this.vida = 4, //Classe do player
        this.pnts = 0, //Classe do player
        this.img = new Image(), //Classe  mãe
        this.img.src = img //Classe mãe
    }
    colidir(Nave){ //Classe dos Inimigos

        //If que verifica se  meu inimigo colidiu
        if(Nave.y < this.y + this.altura  && ((Nave.x > this.x && Nave.x + Nave.largura < this.x + this.largura) || (this.x + this.largura > Nave.x && Nave.x > this.x) || (this.x < Nave.x + Nave.largura && this.x + this.largura > Nave.x))){
            //O inimigo que me acertou volta para o início (Isso faz com que ele me atinja apenas uma vez... vai por mim... isso é extremamente necessário)
            this.y = 0
            Nave.vida -= 1; //Eu perco uma vida
            this.voltar()
            
        }
    }
    desenhar(){ //Método já contruido em java, Classe mãe
        ctx.drawImage(this.img,this.x,this.y,this.largura,this.altura)
    }
    cair(){ //Classe dos inimigos
        this.y += this.velocidade //Como cada inimigo terá uma velocidade diferente, fica bom transformar em uma variável que podemos failmente alterar
    }
    voltar(){ //Classe dos inimigos
            this.y = 0
            this.x = Math.random()*420
    }
    moverDireita(){ //Classe do player
        if(this.x + this.largura < 500){ //Impede que o personagem vá para fora da tela pelo lado direito 
            this.x += 100 
        }
    }
    moverEsquerda(){ //Classe do player
        if(this.x > 0){ //Impede que eu vá para fora da tela pelo lado esquerdo
            this.x -= 100
        }
    }
    pontuar(Inimigo1, Inimigo2, Inimigo3){ //Classe do player
        if(Inimigo1.y + Inimigo1.altura  >= this.y + Inimigo1.velocidade){
            Inimigo1.voltar()
            this.pnts += 1
        } if(Inimigo2.y + Inimigo2.altura >= this.y + Inimigo2.velocidade){
            Inimigo2.voltar()
            this.pnts += 1
        }
        if(Inimigo3.y +  Inimigo3.altura >= this.y + Inimigo3.velocidade){ //Se algum desses inimigos inimigo passou pelo player sem o atingir, então ele conseguiu desviar, +1 ponto
            Inimigo3.voltar()
            this.pnts += 1
        }
        
    }
}
