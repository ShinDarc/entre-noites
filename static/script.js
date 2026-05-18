const chat = document.getElementById("chat")
const input = document.getElementById("mensagemInput")
const avatar = document.getElementById("avatar")

function adicionarMensagem(texto, classe){

    const mensagem = document.createElement("div")

    mensagem.classList.add("mensagem")
    mensagem.classList.add(classe)

    mensagem.innerText = texto

    chat.appendChild(mensagem)

    chat.scrollTop = chat.scrollHeight
}

async function enviarMensagem(){

    const texto = input.value

    if(texto.trim() === ""){
        return
    }

    adicionarMensagem(texto, "user")

    input.value = ""

    avatar.src = "/static/thinking.gif"

    const resposta = await fetch("/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            mensagem: texto
        })

    })

    let dados

try{

    dados = await resposta.json()

}catch(erro){

    adicionarMensagem(
        "Erro ao processar resposta da IA",
        "ia"
    )

    return
}

    adicionarMensagem(
        dados.resposta,
        "ia"
    )

    avatar.src = "/static/normal.gif"

    falar(dados.resposta)
}

function limparTexto(texto){

    return texto

        .replace(/\*/g, "")
        .replace(/#/g, "")
        .replace(/_/g, "")
        .replace(/`/g, "")

        .replace(/\.\.\./g, ".")

        .replace(/[()]/g, "")

        .replace(/:/g, "")

        .replace(/\s+/g, " ")
}

function falar(texto){

    texto = limparTexto(texto)

    speechSynthesis.cancel()

    const voz = new SpeechSynthesisUtterance(texto)

    const vozes = speechSynthesis.getVoices()

    let vozEscolhida = vozes.find(v =>
        v.lang.includes("es")
    )

    if(vozEscolhida){
        voz.voice = vozEscolhida
    }

    voz.lang = "es-CO"

    voz.pitch = 1.2

    voz.rate = 0.95

    speechSynthesis.speak(voz)
}
