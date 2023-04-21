class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }
  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}
class Bd {
  constructor() {
    let id = localStorage.getItem("id");
    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id");
    return proximoId == null ? 1 : parseInt(proximoId) + 1;
  }
  gravar(d) {
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem("id", id);
  }
  recuperarTodosRegistros() {
    //array de despesas
    let despesas = Array();
    let id = localStorage.getItem("id");
    //recuperar todas as despesas cadastradas em localStorage
    for (let i = 1; i <= id; i++) {
      //recuperar a despesa
      let despesa = JSON.parse(localStorage.getItem(i));
      //existe a possibilidade de haver indices que foram pulados/removidos
      //nestes casos nós vamos pular esses indices
      if (despesa === null) {
        continue;
      }
      despesas.push(despesa);
    }
    return despesas;
  }
  pesquisar(despesa) {
    console.log(despesa);
  }
}

let bd = new Bd();

function cadastrarDespesa() {
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );
  if (despesa.validarDados()) {
    bd.gravar(despesa);
    document.getElementById("modal_titulo_div").className =
      "modal-header text-success";
    document.getElementById("modal_titulo").innerHTML =
      "Registro inserido com sucesso";
    document.getElementById("modal_conteudo").innerHTML =
      "Despesa foi cadastrada com sucesso.";
    document.getElementById("modal_botao").innerHTML = "Voltar";
    document.getElementById("modal_botao").className = "btn btn-success";
    $("#modalRegistraDespesa").modal("show");
    ano.value = "";
    mes.value = "";
    dia.value = "";
    tipo.value = "";
    descricao.value = "";
    valor.value = "";
  } else {
    document.getElementById("modal_titulo_div").className =
      "modal-header text-danger";
    document.getElementById("modal_titulo").innerHTML =
      "Erro na inclusão do registro";
    document.getElementById("modal_conteudo").innerHTML =
      "Existem campos obrigatórios que não foram preenchidos.";
    document.getElementById("modal_botao").innerHTML = "Voltar e corrigir";
    document.getElementById("modal_botao").className = "btn btn-danger";
    $("#modalRegistraDespesa").modal("show");
  }
}
function carregaListaDespesas() {
  let despesas = [];
  despesas = bd.recuperarTodosRegistros();
  //selecionando o elemento tbody da tabela
  let listaDespesas = document.getElementById("listaDespesas");
  //percorrer o array despesas, listando cada despesa de forma dinamica
  despesas.forEach(function (d) {
    //criando a linha (tr)
    let linha = listaDespesas.insertRow();
    //criar as colunas (td)
    switch (d.dia) {
      case "1":
        d.dia = "01";
        break;
      case "2":
        d.dia = "02";
        break;
      case "3":
        d.dia = "03";
        break;
      case "4":
        d.dia = "04";
        break;
      case "5":
        d.dia = "05";
        break;
      case "6":
        d.dia = "06";
        break;
      case "7":
        d.dia = "07";
        break;
      case "8":
        d.dia = "08";
        break;
      case "9":
        d.dia = "09";
        break;
    }
    switch (d.mes) {
      case "1":
        d.mes = "01";
        break;
      case "2":
        d.mes = "02";
        break;
      case "3":
        d.mes = "03";
        break;
      case "4":
        d.mes = "04";
        break;
      case "5":
        d.mes = "05";
        break;
      case "6":
        d.mes = "06";
        break;
      case "7":
        d.mes = "07";
        break;
      case "8":
        d.mes = "08";
        break;
      case "9":
        d.mes = "09";
        break;
    }
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
    //ajustar o tipo
    switch (d.tipo) {
      case "1":
        d.tipo = "Alimentação";
        break;
      case "2":
        d.tipo = "Contas";
        break;
      case "3":
        d.tipo = "Comunicação";
        break;
      case "4":
        d.tipo = "Educação";
        break;
      case "5":
        d.tipo = "Lazer";
        break;
      case "6":
        d.tipo = "Saúde";
        break;
      case "7":
        d.tipo = "Transporte";
        break;
    }
    linha.insertCell(1).innerHTML = d.tipo;
    linha.insertCell(2).innerHTML = d.descricao;
    linha.insertCell(3).innerHTML = d.valor;
  });
}
function pesquisarDespesa() {
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;
  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);
  bd.pesquisar(despesa);
}
