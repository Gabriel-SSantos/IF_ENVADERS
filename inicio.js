
let TelaDeInicio = new Telas(50,100,500,altura * 0.85,"imagens/teladeinicio.png",0,0,500,500)
let i = 0
let descanso = clearInterval(inicio)
let telaDificuldade = document.getElementById("SelecionarModo")



function modoTempo(){
    telaDificuldade.style.display = "none"
    descanso = setInterval(inicio,500)
}
function modoInfinito(){
    telaDificuldade.style.display = "none"
    limM = -1
    limS = -1
    descanso = setInterval(inicio,500)
}

function inicio(){
    TelaDeInicio.desenha()
    i = (i + 1)%4
    TelaDeInicio.animação(i)
    ctx.fillStyle = 'white'
    ctx.font = "40px Arial"
    ctx.clearRect(TelaDeInicio.x - 15,TelaDeInicio.y + TelaDeInicio.altura - 80, 600,65)
    
    if(i != 1){
        ctx.fillText("Pressione JOGAR para iniciar", TelaDeInicio.x - 10, TelaDeInicio.y + TelaDeInicio.altura - 50)
    }
} 

