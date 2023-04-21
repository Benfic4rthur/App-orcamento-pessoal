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
      despesa.id = i;
      despesas.push(despesa);
    }
    return despesas;
  }
  pesquisar(despesa) {
    let despesasFiltradas = Array();
    despesasFiltradas = this.recuperarTodosRegistros();
    //filtro de ano
    if (despesa.ano != "") {
      console.log("filtro de ano");
      despesasFiltradas = despesasFiltradas.filter((d) => d.ano == despesa.ano);
    }
    //filtro de mes
    if (despesa.mes != "") {
      console.log("filtro de mes");
      despesasFiltradas = despesasFiltradas.filter((d) => d.mes == despesa.mes);
    }
    //filtro de dia
    if (despesa.dia != "") {
      console.log("filtro de dia");
      despesasFiltradas = despesasFiltradas.filter((d) => d.dia == despesa.dia);
    }
    //filtro de tipo
    if (despesa.tipo != "") {
      console.log("filtro de tipo");
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.tipo == despesa.tipo
      );
    }
    //filtro de descricao
    if (despesa.descricao != "") {
      console.log("filtro de descricao");
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.descricao == despesa.descricao
      );
    }
    //filtro de valor
    if (despesa.valor != "") {
      console.log("filtro de valor");
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.valor == despesa.valor
      );
    }
    return despesasFiltradas;
  }
  remover(id) {
    localStorage.removeItem(id);
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
    if (
      ano.value == "" ||
      mes.value == "" ||
      dia.value == "" ||
      tipo.value == "" ||
      descricao.value == "" ||
      valor.value == ""
    ) {
      document.getElementById(
        "modal_conteudo"
      ).innerHTML = `Por favor verifique os campos: ${
        ano.value == "" ? "<h6>Ano</h6>" : ""
      } ${mes.value == "" ? "<h6>Mês</h6>" : ""} ${
        dia.value == "" ? "<h6>Dia</h6> " : ""
      } ${tipo.value == "" ? "<h6>Tipo</h6>" : ""} ${
        descricao.value == "" ? "<h6>Descrição</h6>" : ""
      } ${valor.value == "" ? "<h6>Valor</h6>" : ""}`;
    } else {
      document.getElementById("modal_conteudo").innerHTML =
        "Existem campos que não foram preenchidos corretamente.";
    }
    document.getElementById("modal_botao").innerHTML = "Voltar e corrigir";
    document.getElementById("modal_botao").className = "btn btn-danger";
    $("#modalRegistraDespesa").modal("show");
  }
}
function carregaListaDespesas(despesas = Array(), filtro = false) {
  if (despesas.length == 0 && filtro == false) {
    despesas = bd.recuperarTodosRegistros();
  }
  //selecionando o elemento tbody da tabela
  let listaDespesas = document.getElementById("listaDespesas");
  listaDespesas.innerHTML = "";
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
    //criar o botão de exclusão
    let btn = document.createElement("button");
    btn.className = "btn btn-danger";
    btn.innerHTML = '<i class="fas fa-times"></i>';
    btn.id = `id_despesa_${d.id}`;
    btn.onclick = function () {
      document.getElementById("modal_titulo_div").className =
        "modal-header text-danger";
      document.getElementById("modal_titulo").innerHTML =
        "Exclusão de registro";
      document.getElementById(
        "modal_conteudo"
      ).innerHTML = `Deseja excluir o registro <b>${d.descricao}</b> no valor de R$:<b>${d.valor}</b>?`;
      document.getElementById("modal_botao1").innerHTML = "Sim";
      document.getElementById("modal_botao1").className = "btn btn-danger";
      document.getElementById("modal_botao2").innerHTML = "Não";
      document.getElementById("modal_botao2").className = "btn btn-danger";
      $("#modalApagaRegistro").modal("show");

      // Adiciona event listener para o botão "Voltar"
      document
        .getElementById("modal_botao1")
        .addEventListener("click", function () {
          bd.remover(d.id);
        });
    };

    linha.insertCell(4).append(btn);
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
  let despesas = bd.pesquisar(despesa);

  carregaListaDespesas(despesas, true);
}
