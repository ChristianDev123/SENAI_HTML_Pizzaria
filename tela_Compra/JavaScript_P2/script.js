const divEscolhaSabor = document.querySelector("div#escolhaSabor")
const pizSal = [
    "Mussarela",
    "Portuguesa",
    "Frango com Catupiry",
    "Carne Seca",
    "Caipira",
    "Frango com Cheddar",
    "Atum",
    "Baiana",
    "Camarão"
];
const pizDoc = [
    "Chocolate com Morango",
    "Chocolate com Banana",
    "Romeu e Julieta",
    "M&M",
    "Goiabada",
    "Prestígio",
];
const bebidas = [
    "Nenhuma Bebida",
    "Coca-Cola",
    "Guaraná",
    "Fanta-Laranja",
    "Água com gás",
    "Suco de uva Del Valle"
];
const opcoesSalEscolhida = [];
const opcoesDocEscolhida = [];
const opcoesBebidasEscolhidas = [];
const precoSal = [
    40,
    38,
    55,
    65,
    45,
    37,
    57,
    48,
    80
];
const precoDoc = [
    44.00,
    50.00,
    43.00,
    52.00,
    56.00,
    62.00,
];
const precoBebidas = [
    0,
    11.00,
    8.00,
    7.00,
    5.00,
    6.50,
];
const carteira = [];
const chamadasCookie = [
    "tipoPizza",
    "tipoSabor",
    "qtdComprada",
    "carteira",
    "sabores",
    "bebidas",
    "qtdBebida",
];
// ==========================================================================================
function apagaCookie(){
    for(i in chamadasCookie){
        document.cookie = `${coletaCookie(chamadasCookie[i])};expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
    } 
}
function coletaCookie(nomeCookie){
    const infoProcurada = nomeCookie + "=";
    const configValorProcurado = decodeURIComponent(document.cookie);
    const arrayValores = configValorProcurado.split(";");
    for(let i = 0; i < arrayValores.length; i++){
        var verificaValor = arrayValores[i];
        while(verificaValor.charAt(0) == ' '){
            verificaValor = verificaValor.substring(1);
        };
        if(verificaValor.indexOf(infoProcurada) == 0){
            return verificaValor
        };
    };
};
function verifica() {
    if (verificaRadioDivPizza() == "pizzaInteira" || verificaRadioDivPizza() == "pizzaMetade") {
        const divSaborSal = document.createElement("div");
        divSaborSal.setAttribute("id", "saborSal");
        const divSaborDoc = document.createElement("div");
        divSaborDoc.setAttribute("id", "saborDoc");
        const divBebidas = document.createElement("div");
        divBebidas.setAttribute("id","bebidas");
        const btnRadioSaborSal = `<input type="radio" name="sabores" id="salgado">
        <label for="salgado"> Pizza Salgado</label><br>`;
        const btnRadioSaborDoc = `<input type="radio" name="sabores" id="doce">
        <label for="doce">Pizza Doce</label><br>`;
        divEscolhaSabor.innerHTML = "";
        divEscolhaSabor.innerHTML += btnRadioSaborSal + btnRadioSaborDoc;
        divEscolhaSabor.innerHTML += `<input type="button"class="btns" value="Selecionar" id="btnDivEscolhaSabor" onclick="escolha()">`;
        divEscolhaSabor.appendChild(divSaborSal);
        divEscolhaSabor.appendChild(divSaborDoc);
        divEscolhaSabor.appendChild(divBebidas);
    };
};
function escolha() {
    saboresTela();
};
function saboresTela() {
    const lugarSaborSal = document.querySelector("div#saborSal");
    const lugarSaborDoc = document.querySelector("div#saborDoc");
    const caminhoDivBebidas = document.querySelector("div#bebidas");
    caminhoDivBebidas.innerHTML=""
    const btnCheckBox = `<input type="button" class="btns" id="verCheckBox" value="Registrar Pedido" onclick="registraCheckBox()">`;
    var codHTMLS = 0;
    var codHTMLD = 0;
    var textoS = 0;
    var textoD = 0;
    if (verificaRadioSaborPizza() == "pizzaSal") {
        lugarSaborDoc.innerHTML = "";
        textoS = "<h2>Pizza Salgada:</h2>";
        lugarSaborSal.innerHTML = textoS;
        for (i in pizSal) {
            if(verificaRadioDivPizza() == "pizzaInteira"){
                codHTMLS = `<input type="checkbox" class="pizSal" id="pizS${i}"> <label id="labelPizSal${i}" for="pizS${i}">${pizSal[i]} R$ ${precoSal[i]}</label><br>`;
            } else if(verificaRadioDivPizza() == "pizzaMetade"){
                codHTMLS = `<input type="checkbox" class="pizSal" id="pizS${i}"> <label id="labelPizSal${i}" for="pizS${i}">${pizSal[i]} R$ ${precoSal[i]/2}</label><br>`;
            };
            lugarSaborSal.innerHTML += codHTMLS;
        };
    } else if (verificaRadioSaborPizza() == "pizzaDoc") {
        lugarSaborSal.innerHTML = "";
        textoD = "<h2>Pizza Doce:</h2>";
        lugarSaborDoc.innerHTML = textoD;
        for (i in pizDoc) {
            if(verificaRadioDivPizza() == "pizzaInteira"){
                codHTMLD = `<input type="checkbox" class="pizDoc" id="pizD${i}"> <label id="labelPizDoc${i}" for="pizD${i}">${pizDoc[i]} R$ ${precoSal[i]}</label><br>`;
            }else if(verificaRadioDivPizza() == "pizzaMetade"){
                codHTMLD = `<input type="checkbox" class="pizDoc" id="pizD${i}"> <label id="labelPizDoc${i}" for="pizD${i}">${pizDoc[i]} R$ ${precoSal[i]/2}</label><br>`;
            }
            lugarSaborDoc.innerHTML += codHTMLD;
        };
    };
    caminhoDivBebidas.innerHTML = `<h2>Bebidas:</h2>`
    bebidas.map((bebida,i)=>{
        caminhoDivBebidas.innerHTML += `<input type="checkbox" id="bebidas${i}" class="drink"><label id="labelBebida${i}" for="bebida${i}">${bebida} R$ ${precoBebidas[i]}</label><br>`
    });
    caminhoDivBebidas.innerHTML += `<br>`;
    caminhoDivBebidas.innerHTML += btnCheckBox;
};
function registraCheckBox() {
    carteira.length = 0;
    opcoesDocEscolhida.length = 0;
    opcoesSalEscolhida.length = 0;
    opcoesBebidasEscolhidas.length = 0;
    var listaSabor = [];
    var listaBebida = [];
    if (verificaRadioSaborPizza() == "pizzaSal") {
        const caminhoSal = document.querySelectorAll(`input.pizSal`);
        caminhoSal.forEach((cS,i) => {
            if (cS.checked) {
                opcoesSalEscolhida.push(cS.id);
                carteira.push(precoSal[i]);
            };
        });
    };
    if (verificaRadioSaborPizza() == "pizzaDoc") {
        const caminhoDoc = document.querySelectorAll(`input.pizDoc`);
        caminhoDoc.forEach((cD,i) => {
            if (cD.checked) {
                opcoesDocEscolhida.push(cD.id);
                carteira.push(precoDoc[i]);
            };
        });
    };
    const caminhoBebidas = document.querySelectorAll("input.drink")
    caminhoBebidas.forEach((cB,i)=>{
        if(cB.checked){
            opcoesBebidasEscolhidas.push(cB.id);
            carteira.push(precoBebidas[i]);
        };
    });
    if (verificaRadioDivPizza() == "pizzaInteira") {
        if (verificaRadioSaborPizza() == "pizzaSal"){
            const pizzasCompradas = opcoesSalEscolhida.length
            const valorPizza = calculaCarteira();
            criadorCookie("tipoPizza","1 Sabor")
            criadorCookie("tipoSabor","Salgada")
            criadorCookie("qtdComprada",`${pizzasCompradas}`)
            criadorCookie("carteira",`${valorPizza}`)
            opcoesSalEscolhida.forEach((id,i)=>{
                let identificacao = id
                identificacao = identificacao.substring(4,id.length)
                listaSabor.push(`${pizSal[identificacao]}`)
            })
            criadorCookie(`sabores`,`${listaSabor}`)
            alert("O pedido foi registrado! 😊")
            // enviar informação de pizzaInteira e salgada, carteira, sabor;
        } else if (verificaRadioSaborPizza() == "pizzaDoc") {
            pizzasCompradas = opcoesDocEscolhida.length
            valorPizza = calculaCarteira();
            criadorCookie("tipoPizza","1 Sabor")
            criadorCookie("tipoSabor","Doce")
            criadorCookie("qtdComprada",`${pizzasCompradas}`)
            criadorCookie("carteira",`${valorPizza}`)
            opcoesDocEscolhida.forEach((id,i)=>{
                let identificacao = id
                identificacao = identificacao.substring(4,id.length)
                listaSabor.push(`${pizDoc[identificacao]}`)
            })
            criadorCookie(`sabor`,`${listaSabor}`)
            alert("O pedido foi registrado! 😊")
            // enviar Informação de pizzaInteira e salgada a outra página;
        };
    }else if (verificaRadioDivPizza() == "pizzaMetade") {
        if (verificaRadioSaborPizza() == "pizzaSal") {
            if (opcoesSalEscolhida.length % 2 == 0) {
                pizzasCompradas = (opcoesSalEscolhida.length) / 2;
                valorPizza = calculaCarteira()/2;
                criadorCookie("tipoPizza","2 Sabores")
                criadorCookie("tipoSabor","Salgada")
                criadorCookie("qtdComprada",`${pizzasCompradas}`)
                criadorCookie("carteira",`${valorPizza}`)
                opcoesSalEscolhida.forEach((id,i)=>{
                    let identificacao = id
                    identificacao = identificacao.substring(4,id.length)
                    listaSabor.push(`${pizSal[identificacao]}`)
                })
                criadorCookie(`sabores`,`${listaSabor}`)
                alert("O pedido foi registrado!😊")
            }else {
                alert("Por Favor escolha dois sabores para cada pizza que deseja comprar");
            }
        }else if (verificaRadioSaborPizza() == "pizzaDoc") {
            if (opcoesDocEscolhida.length % 2 == 0) {
                pizzasCompradas = (opcoesDocEscolhida.length)/2
                valorPizza = calculaCarteira()/2;
                criadorCookie("tipoPizza","2 Sabores")
                criadorCookie("tipoSabor","Doce")
                criadorCookie("qtdComprada",`${pizzasCompradas}`)
                criadorCookie("carteira",`${valorPizza}`)
                opcoesDocEscolhida.forEach((id,i)=>{
                    let identificacao = id
                    identificacao = identificacao.substring(4,id.length)
                    listaSabor.push(`${pizDoc[identificacao]}`)
                })
                criadorCookie(`sabores`,`${listaSabor}`)
                alert("O pedido foi registrado!😊")
            } else {
                alert("Por Favor escolha dois sabores para cada pizza que deseja comprar")
            }
            // enviar informação de pizzaMetade e doce a outra página;
        };
    };
    criadorCookie("qtdBebidas",`${opcoesBebidasEscolhidas.length}`)
    opcoesBebidasEscolhidas.forEach((id)=>{
        let identificacao = id
        identificacao = identificacao.substring(7,id.length)
        listaBebida.push(`${bebidas[identificacao]}`)
    })
    criadorCookie(`bebidas`,`${listaBebida}`)
    const enviarPagina = document.querySelector("input#enviarPagina").disabled = false;
};
function calculaCarteira(){
    let cart = carteira.reduce((acumulador,valorAtual)=>{
        return acumulador + valorAtual
    },0);
    return cart
};
function verificaRadioDivPizza() {
    var pizInt = document.querySelector("input#pizInt");
    var pizMet = document.querySelector("input#pizMet");
    if (pizInt.checked) {
        return "pizzaInteira";
    } else if (pizMet.checked) {
        return "pizzaMetade";
    };
};
function verificaRadioSaborPizza() {
    const pizSal = document.querySelector("input#salgado");
    const pizDoc = document.querySelector("input#doce");
    if (pizDoc.checked) {
        return "pizzaDoc";
    } else if (pizSal.checked) {
        return "pizzaSal";
    };
};
function criadorCookie(nomeCookie,valorCookie){
    document.cookie = `${nomeCookie}=${valorCookie};path=/;`
};