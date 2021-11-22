const chamadasCookie = [
    "tipoPizza",
    "tipoSabor",
    "qtdComprada",
    "carteira",
    "sabores",
    "bebidas"
];
const respostasCookie = []
function pedidoTela() {
    const caminhoPedido = document.querySelector("Section#pedido");
    const chamadaDivTexto = document.querySelector("div#text")
    const divErro = document.createElement("div")
    divErro.setAttribute("id", "erro")
    for (i in chamadasCookie) {
        respostasCookie.push(coletaCookie(chamadasCookie[i]));
    };
    for (p in chamadasCookie) {
        const div = document.createElement("div")
        div.setAttribute("id", `${chamadasCookie[p]}`)
        div.setAttribute("class", "apresentacao")
        if (chamadasCookie[p] != "tipoPizza") {
            chamadaDivTexto.appendChild(div)
        }
    }
    if (respostasCookie[0] != undefined) {
        respostasCookie.map((resps, i) => {
            const caminhoDivImagem = document.querySelector("#tipoPizza")
            var caminhoDiv;
            switch (i) {
                case 0:
                    if (resps == "1 Sabor") {
                        caminhoDivImagem.innerHTML += `<img src="pizza1Sabor.png" id="img1Sabor" class="imagemDivPiz">`
                        caminhoDivImagem.innerHTML += "<p>Pizza 1 Sabor</p>"
                    } else if (resps == "2 Sabores") {
                        caminhoDivImagem.innerHTML += `<img src="pizza2Sabor.png" id="img2Sabor" class="imagemDivPiz">`
                        caminhoDivImagem.innerHTML += "<p>Pizza 2 Sabores</p>"
                    }
                    break
                case 1:
                    caminhoDiv = document.querySelector(`#${chamadasCookie[i]}`)
                    caminhoDiv.innerHTML += `<p>${resps}</p>`
                    break
                case 2:
                    caminhoDiv = document.querySelector(`#${chamadasCookie[i]}`)
                    caminhoDiv.innerHTML += `<p>Quantidade foi: ${resps} pizzas</p>`
                    break
                case 3:
                    caminhoDiv = document.querySelector(`#${chamadasCookie[i]}`)
                    caminhoDiv.innerHTML += `<p>A conta fechou em: R$ ${resps}</p>`
                    break
                case 4:
                    caminhoDiv = document.querySelector(`#${chamadasCookie[i]}`)
                    caminhoDiv.innerHTML += `<p>Sabores Pizza:</p>`
                    var arraySabor = resps.split(",")
                    arraySabor.map((sabor) => {
                        caminhoDiv.innerHTML += `<p>${sabor}</p>`
                    })
                    break
                case 5:
                    caminhoDiv = document.querySelector(`#${chamadasCookie[i]}`)
                    caminhoDiv.innerHTML += `<p>Bebidas Selecionadas: </p>`
                    var arrayBebida = resps.split(",")
                    arrayBebida.map((bebida) => {
                        caminhoDiv.innerHTML += `<p>${bebida}</p>`
                    })
                    break
            };
        });
    } else {
        caminhoPedido.innerHTML = ""
        caminhoPedido.appendChild(divErro)
        const caminhoErro = document.querySelector("div#erro")
        caminhoErro.innerHTML = `
        <h1> Não identificamos o pedido.<h1>
        <h2>Por gentileza refaça-o antes de avançar na compra.<h2>`
    }
};
function coletaCookie(nomeCookie) {
    const infoProcurada = nomeCookie + "=";
    const configValorProcurado = decodeURIComponent(document.cookie);
    const arrayValores = configValorProcurado.split(";");
    for (let i = 0; i < arrayValores.length; i++) {
        var verificaValor = arrayValores[i];
        while (verificaValor.charAt(0) == ' ') {
            verificaValor = verificaValor.substring(1);
        };
        if (verificaValor.indexOf(infoProcurada) == 0) {
            var resposta = verificaValor.substring(infoProcurada.length, verificaValor.length);
            return resposta
        };
    };
};
function verificar() {
    var escolha = window.document.getElementsByName('escolha');
    var res = document.querySelector('div#res');
    if (escolha[0].checked) {
        location.href = 'Pagina Cartao/pagcomcartao.html';
    } else if (escolha[1].checked) {
        location.href = 'Pagina Pix/pagpix.html';
    } else if (escolha[2].checked) {
        location.href = "../index.html";
    };
};