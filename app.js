// Atributo para dar foco ao primeiro input
let meuInput = document.getElementById("quantidade");
meuInput.focus();

// Função que comanda o jogo
function sortear() {
    let quantidade = parseInt(document.getElementById("quantidade").value);
    let primeiroNumero = parseInt(document.getElementById("de").value);
    let ultimoNumero = parseInt(document.getElementById("ate").value);

    let sorteados = [];
    let camposParaLimpar = ["quantidade", "de", "ate"];
    let numero;

    // Verificação de input
    if (primeiroNumero >= ultimoNumero) {
        alert("O primeiro número deve ser menor que o último!");
        limparCampos(camposParaLimpar);
        meuInput.focus();
        return;
    }

    // Verificação de input
    if ((ultimoNumero - primeiroNumero + 1) < quantidade) {
        alert("Por favor, configure um intervalo maior para esta quantidade de números sorteados!");
        limparCampos(camposParaLimpar);
        meuInput.focus();
        return;
    }

    for (i = 0; i < quantidade; i++){
        numero = obterNumeroAleatorio(primeiroNumero, ultimoNumero);
        // Validação para verificar se já existe o número sorteado na array e sortear novamente
        while(sorteados.includes(numero)) {
            numero = obterNumeroAleatorio(primeiroNumero, ultimoNumero); 
        }
        sorteados.push(numero);
    }

    // Variável que insere a ortografia correta no HTML
    let palavrasPlural = sorteados > 1 ? "Número sorteado" : "Números sorteados";
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `<label class="texto__paragrafo">${palavrasPlural}: ${sorteados}</label>`;
    alterarStatusBtn();
}

// Função para gerar um número aleatório (ou mais) dentro de um intervalo, incluindo os limites mínimo e máximo
function obterNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para limpar todos os campos dentro de uma array atribuída com os ids
function limparCampos(ids) {
    ids.forEach(id => {
        document.getElementById(id).value = " ";
    });
 }

// Função para alterar o status do botão de acordo com a necessidade
function alterarStatusBtn() {
    let botao = document.getElementById("btn-reiniciar");
    if (botao.classList.contains("container__botao-desabilitado")) {
        botao.classList.remove("container__botao-desabilitado");
        botao.classList.add("container__botao");
    } else {
        botao.classList.remove("container__botao")
        botao.classList.add("container__botao-desabilitado");
    }
}

// Função para reiniciar o jogo para a página de origem
function reiniciar() {
    let camposParaLimpar = ["quantidade", "de", "ate"];
    limparCampos(camposParaLimpar);
    document.getElementById("resultado").innerHTML = `<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>`;
    alterarStatusBtn();
    meuInput.focus();
}