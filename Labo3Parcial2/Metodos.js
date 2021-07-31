var Persona;
(function (Persona_1) {
    var listaPersona = new Array();
    var globalTr;
    var contenedorAgregar;
    window.onload = function () {
        var _a, _b, _c, _d, _e, _f, _g;
        (_a = document.getElementById("alta")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", AbrirRecuadro);
        (_b = document.getElementById("btnGuardar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", Persona.Guardar);
        (_c = document.getElementById("btnCerrarAbajo")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", CerrarRecuadro);
        (_d = document.getElementById("cerrar")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", CerrarRecuadro);
        (_e = document.getElementById("tipoFiltro")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", Persona.Filtrar);
        (_f = document.getElementById("filtro")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", Persona.Promedio);
        (_g = document.getElementById("limpiar")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", Persona.LimpiarLista);
    };
    function LimpiarLista() {
        var tbody = document.getElementById("tbody");
        tbody.remove();
    }
    Persona_1.LimpiarLista = LimpiarLista;
    function AbrirRecuadro() {
        var recuadro = document.getElementById("contenedorAgregar");
        contenedorAgregar = recuadro;
        recuadro.hidden = false;
    }
    Persona_1.AbrirRecuadro = AbrirRecuadro;
    function CerrarRecuadro() {
        var recuadro = document.getElementById("contenedorAgregar");
        contenedorAgregar = recuadro;
        recuadro.hidden = true;
    }
    Persona_1.CerrarRecuadro = CerrarRecuadro;
    function Guardar() {
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;
        var edad = document.getElementById("edad").value;
        var pro = new Promise(function (resolve, reject) {
            var sexo = document.getElementById("sexo").value;
            if (sexo == "Femenino") {
                var p = parseInt(edad);
                if (p.toString() != "NaN") {
                    resolve(new Persona_1.Cliente(CalcularId(), nombre, apellido, p, sexo));
                }
                else {
                    reject("Error");
                }
            }
            else if (sexo == "Masculino") {
                var p = parseInt(edad);
                resolve(new Persona_1.Cliente(CalcularId(), nombre, apellido, p, sexo));
            }
            else {
                reject("Error");
            }
        });
        pro.then(function (persona) {
            listaPersona.push(persona);
            var tablaPersona = document.getElementById("tabla");
            var tbody = document.getElementById("tbody");
            var sexo2 = document.getElementById("sexo").value;
            var persona2 = {
                id: persona.getId(),
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                sexo: sexo2
            };
            ConstruirFila(tbody, persona2);
        })["catch"](function (error) {
            alert("La edad debe ser numerica" + error);
        });
    }
    Persona_1.Guardar = Guardar;
    function Eliminar(tr) {
        var borrar = tr.target.parentNode.parentNode;
        var borrado = borrar.childNodes[0].innerHTML;
        var listaId = listaPersona.filter(function (Persona) { return Persona.getId() == borrado; });
        if (listaId.length > 0) {
            listaPersona.splice(borrado, 1);
            tr.target.parentNode.parentNode.remove();
        }
    }
    Persona_1.Eliminar = Eliminar;
    function CalcularId() {
        var id = 1;
        if (listaPersona.length != 0) {
            var lastRegisterIndex = listaPersona.length - 1;
            var lastRegister = listaPersona[lastRegisterIndex];
            id = lastRegister.getId() + 1;
        }
        return id;
    }
    function ConstruirFila(tabla, persona) {
        var tr = document.createElement("tr");
        if (persona.id) {
            var td3 = document.createElement("td");
            td3.appendChild(document.createTextNode((persona.id.toString())));
            tr.appendChild(td3);
        }
        if (persona.nombre) {
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(persona.nombre));
            tr.appendChild(td);
        }
        if (persona.apellido) {
            var td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(persona.apellido));
            tr.appendChild(td2);
        }
        if (persona.edad) {
            var td4 = document.createElement("td");
            td4.appendChild(document.createTextNode(persona.edad));
            tr.appendChild(td4);
        }
        if (persona.sexo) {
            var td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(persona.sexo));
            tr.appendChild(td5);
        }
        var tdAccion = document.createElement("td");
        var button = document.createElement("button");
        button.textContent = "Eliminar";
        button.addEventListener('click', Persona.Eliminar);
        tdAccion.appendChild(button);
        tr.appendChild(tdAccion);
        tr.addEventListener("dblclick", fillData);
        tabla.appendChild(tr);
    }
    Persona_1.ConstruirFila = ConstruirFila;
    function fillData(tr) {
        var trForFilling = tr.target.parentNode;
        globalTr = trForFilling;
        document.getElementById("nombre").value = trForFilling.childNodes[0].innerHTML;
        document.getElementById("atributo").value = trForFilling.childNodes[1].innerHTML;
        document.getElementById("sexo").value = trForFilling.childNodes[2].innerHTML;
    }
    Persona_1.fillData = fillData;
    function Filtrar() {
        var select = document.getElementById("tipoFiltro").value;
        if (select == "Femenino") {
            var listaFemenino = listaPersona.filter(function (item) {
                if (item instanceof Persona_1.Cliente) {
                    return item;
                }
            });
            var tablaCliente = document.getElementById("tabla");
            var tablaBody = document.getElementById("tbody");
            tablaBody.innerHTML = "";
            tablaCliente.childNodes.forEach(function (element) {
                if (element.nodeName == "TBODY") {
                    tablaCliente.removeChild(element);
                }
            });
            tablaCliente.appendChild($_Tbody(listaFemenino));
        }
        else if (select == "Masculino") {
            var listaMasculino = listaPersona.filter(function (item) {
                if (item instanceof Persona_1.Cliente) {
                    return item;
                }
            });
            var tablaPersona = document.getElementById("tabla");
            var tablaBody = document.getElementById("tbody");
            tablaPersona.childNodes.forEach(function (element) {
                if (element.nodeName == "TBODY") {
                    tablaPersona.removeChild(element);
                }
            });
            tablaPersona.appendChild($_Tbody(listaMasculino));
        }
        else {
            var tablaPersona = document.getElementById("tabla");
            var tablaBody = document.getElementById("tbody");
            tablaPersona.childNodes.forEach(function (element) {
                if (element.nodeName == "TBODY") {
                    tablaPersona.removeChild(element);
                }
            });
            tablaPersona.appendChild($_Tbody(listaPersona));
        }
    }
    Persona_1.Filtrar = Filtrar;
    function $_Tbody(array) {
        var tbody = document.createElement("tbody");
        tbody.id = "tbody";
        var _loop_1 = function (i) {
            arraykeys = Object.keys(array[i]);
            tr = document.createElement("tr");
            tr.id = "tr" + i;
            arraykeys.forEach(function (element) {
                tr.appendChild($_Td(array[i][element]));
            });
            tbody.appendChild(tr);
        };
        var arraykeys, tr;
        for (var i = 0; i < array.length; i++) {
            _loop_1(i);
        }
        return tbody;
    }
    Persona_1.$_Tbody = $_Tbody;
    function $_Td(value) {
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(value));
        return td;
    }
    function Promedio() {
        var promedio = 0;
        var total = 0;
        var select = document.getElementById("tipoFiltro").value;
        if (select == "Femenino") {
            var listaFemenino = listaPersona.filter(function (item) {
                if (item instanceof Persona_1.Cliente) {
                    return item;
                }
            });
            promedio = listaFemenino.reduce(function (total, item) {
                console.log(item.getEdad());
                return total += item.getEdad();
            }, 0);
            promedio = promedio / listaFemenino.length;
        }
        else if (select == "Masculino") {
            var listaMasculino = listaPersona.filter(function (item) {
                if (item instanceof Persona_1.Cliente) {
                    return item;
                }
            });
            promedio = listaMasculino.reduce(function (total, item) {
                console.log(item.getEdad());
                return total += item.getEdad();
            }, 0);
            promedio = promedio / listaMasculino.length;
        }
        document.getElementById("precioFiltro").value = promedio.toString();
    }
    Persona_1.Promedio = Promedio;
})(Persona || (Persona = {}));
