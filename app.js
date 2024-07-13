function criptografar(textoOriginal) {
    const substituicoes = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };
    
    let textoCriptografado = '';
    
    for (let letra of textoOriginal) {
        if (substituicoes[letra]) {
            textoCriptografado += substituicoes[letra];
        } else {
            textoCriptografado += letra;
        }
    }   

    return textoCriptografado;
}

function descriptografar(textoCriptografado) {
    const substituicoesInvertidas = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    let textoDescriptografado = textoCriptografado;

    for (let chave in substituicoesInvertidas) {
        const expressaoRegular = new RegExp(chave, 'g');
        textoDescriptografado = textoDescriptografado.replace(expressaoRegular, substituicoesInvertidas[chave]);
    }

    return textoDescriptografado;
}

function ocultarMensagemDeTextoVazio() {
    let textoVazio = document.getElementById('avisos');
    let textoDigitado = document.getElementById('textoDigitado').value;    

    if (textoDigitado != '') {
        textoVazio.style.display = "none";        
    } else {      
        textoVazio.style.display = "block";               
    }
}

function exibirMensagem(novoMensagem, cor) {
    const corDoTexto = document.getElementById('atualizaMensagem');
    document.getElementById('atualizaMensagem').innerText = novoMensagem;
    corDoTexto.style.color = cor;
}

function liberarBotaoCopiar() {    
    const botaoCopiar = document.getElementById('botaoCopiar')
    let textoDigitado = document.getElementById('textoDigitado').value;

    if (textoDigitado != '') {
        botaoCopiar.disabled = false;
    } else {
        botaoCopiar.disabled = true;
    }    
}

function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function verificarTexto(texto) {
    const textoSemAcentos = removerAcentos(texto);
    const textoEmMinusculo = textoSemAcentos === textoSemAcentos.toLowerCase();
    return textoEmMinusculo && texto === textoSemAcentos;
}

const botãoCriptografar = document.getElementById('botaoCriptografar');

botaoCriptografar.addEventListener("click", function() {
    const textoDigitado = document.getElementById("textoDigitado").value;
    
    if (!verificarTexto(textoDigitado)) {
        document.getElementById("textoProcessado").textContent = '';
        exibirMensagem("Digite apenas letras minúsculas e sem acentos.","#9b111e")

    } else { 

    if (botãoCriptografar) {
        const textoCriptografado = criptografar(textoDigitado);
        saida = document.getElementById('textoProcessado');       
        saida.textContent = '';      
        saida.textContent = textoCriptografado;
        exibirMensagem('Texto Criptografado', '#000');
    }};
    ocultarMensagemDeTextoVazio();    
    liberarBotaoCopiar();
});

const botaoDescriptografar = document.getElementById('botaoDescriptografar')

botaoDescriptografar.addEventListener("click", function() {
    const textoDigitado = document.getElementById("textoDigitado").value;    
    const textoDescriptografado = descriptografar(textoDigitado);

    saida = document.getElementById('textoProcessado');    
    saida.textContent = '';     
    saida.textContent = textoDescriptografado;
    exibirMensagem('Texto Descriptografado', '#000');    
    ocultarMensagemDeTextoVazio();    
    liberarBotaoCopiar();
});

const botaoCopiar = document.getElementById('botaoCopiar');

botaoCopiar.addEventListener("click", function() {                
    const saida = document.getElementById("textoProcessado");
    
    textoOriginal = document.getElementById('textoDigitado');
    textoOriginal.value = '';    

    navigator.clipboard.writeText(saida.innerText);
    botaoCopiar.disabled = true;        
    exibirMensagem("Texto copiado para área de transferência!", "#357975"); 
});       