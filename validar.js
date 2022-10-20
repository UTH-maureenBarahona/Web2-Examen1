let subtotal = 0;
let impuesto = 0;
let total = 0;

function soloNumeros(e) {
  var key = e.keyCode || e.which;
  var tecla = String.fromCharCode(key).toLocaleLowerCase();
  var numeros = "0123456789";

  if (numeros.indexOf(tecla) == -1) {
    return false;
  }
}

function validateDecimal(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLocaleLowerCase();
  var numeros = "0123456789.";

  if (numeros.indexOf(tecla) == -1) {
    return false;
  }
}

function soloLetras(e) {
  var key = e.keyCode || e.which;
  var tecla = String.fromCharCode(key).toLocaleLowerCase();
  var letras = " áéíóúabcdefghijklmnopqrstuvwxyz";

  if (letras.indexOf(tecla) == -1) {
    return false;
  }
}

var contEstufa = 0;
var contLavadora = 0;
var contRefri = 0;
var contLicua = 0;

var contSumEstufa = 0;
var contSumLavadora = 0;
var contSumRefri = 0;
var contSumLicua = 0;

function agregar() {
  calculos();
  var articulo = document.getElementById("articulo").value;
  var precio = document.getElementById("precio").value;
  var cantidad = document.getElementById("cantidad").value;

  var registro =
    "<tr><td>" +
    articulo +
    "</td><td>" +
    precio +
    "</td><td>" +
    cantidad +
    "</td><td>" +
    impuesto +
    "</td><td>" +
    subtotal +
    "</td><td>" +
    total +
    "</td><td><button class='btnDel' onclick='eliminar(event);'>Eliminar</button></td></tr>";

  var add = document.createElement("tr");
  add.innerHTML = registro;

  document.getElementById("grilla").appendChild(add);

  if (articulo == "estufa") {
    contEstufa++;
    contSumEstufa = contSumEstufa + total;
  } else if (articulo == "lavadora") {
    contLavadora++;
    contSumLavadora = contSumLavadora + total;
  } else if (articulo == "refrigeradora") {
    contRefri++;

    contSumRefri = contSumRefri + total;
  } else if (articulo == "licuadora") {
    contLicua++;
    contSumLicua = contSumLicua + total;
  }
}

function cancelar() {
 
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("subtotal").innerHTML = 0;
  document.getElementById("impuesto").innerHTML = 0;
  document.getElementById("total").innerHTML = 0;
  document.getElementById("articulo").focus();
}

function eliminar(evento) {
  if (confirm("Estas seguro que deseas eliminar este registro?")) {
    var fila = evento.target.parentNode.parentNode;
    var celdas = fila.getElementsByTagName("td");

    if (celdas[0].innerHTML == "estufa") {
      contEstufa--;
      contSumEstufa = contSumEstufa - total;
    } else if (celdas[0].innerHTML == "lavadora") {
      contLavadora--;
      contSumLavadora = contSumLavadora - total;
    } else if (celdas[0].innerHTML == "refrigeradora") {
      contRefri--;
      contSumRefri = contSumRefri - total;
    } else if (celdas[0].innerHTML == "licuadora") {
      contLicua--;
      contSumLicua = contSumLicua - total;
    }

    fila.remove();
  }
}

function calculos() {
  var precio = document.getElementById("precio").value;
  var cantidad = document.getElementById("cantidad").value;

  if (isNaN(precio) || isNaN(cantidad)) {
    text = "Es necesarios introducir dos números válidos";
  } else {
    //si no ponemos parseFloat concatenaría x con y
    subtotal = parseFloat(precio) * parseFloat(cantidad);
    document.getElementById("subtotal").innerHTML = subtotal;

    impuesto = parseFloat(subtotal) * 0.15;
    document.getElementById("impuesto").innerHTML = impuesto;

    total = parseFloat(subtotal) + parseFloat(impuesto);
    document.getElementById("total").innerHTML = total;
  }
}

function generarGrafico() {
  generarGrafico1();
  generarGrafico2();
}

function generarGrafico1() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(grafico1);

  function grafico1() {
    var data = google.visualization.arrayToDataTable([
      ["Articulos", "Articulos por ventas"],
      ["Estufa", contEstufa],
      ["Lavadora", contLavadora],
      ["Refrigeradora", contRefri],
      ["Licuadora", contLicua],
    ]);

    var options = {
      title: "Articulos por ventas",
      pieHole: 0.4,
      slices: {
        0: { color: "red" },
        1: { color: "blue" },
        2: { color: "yellow" },
        3: { color: "green" },
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("pieChart")
    );
    chart.draw(data, options);
  }
}

function generarGrafico2() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(grafico2);

  function grafico2() {
    var data = google.visualization.arrayToDataTable([
      ["Articulos", "Totales de venta por articulo"],
      ["Estufa", contSumEstufa],
      ["Lavadora", contSumLavadora],
      ["Refrigeradora", contSumRefri],
      ["Licuadora", contSumLicua],
    ]);

    var options = {
      title: "Porcentaje por totales de ventas",
      is3D: true,
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("pieChart2")
    );
    chart.draw(data, options);
  }
}
