namespace Persona
{
    var listaPersona: Array<Personas> = new Array <Personas>();
    var globalTr : any;
    var contenedorAgregar:any;


    window.onload = function ()
    {
        document.getElementById("alta")?.addEventListener("click",AbrirRecuadro);
        document.getElementById("btnGuardar")?.addEventListener("click",Persona.Guardar);
        document.getElementById("btnCerrarAbajo")?.addEventListener("click",CerrarRecuadro);
        document.getElementById("cerrar")?.addEventListener("click",CerrarRecuadro);
        document.getElementById("tipoFiltro")?.addEventListener("change",Persona.Filtrar);
        document.getElementById("filtro")?.addEventListener("click",Persona.Promedio);
        document.getElementById("limpiar")?.addEventListener("click",Persona.LimpiarLista);
       
        
        
    }

    export function LimpiarLista(){
        
        var tbody = (<HTMLElement>document.getElementById("tbody"));
        tbody.remove();

    }

   
   

   
    export function AbrirRecuadro()
        {
            var recuadro:any = document.getElementById("contenedorAgregar");
            contenedorAgregar=recuadro;
            recuadro.hidden=false;
        }

    export function CerrarRecuadro()
    {
        var recuadro:any = document.getElementById("contenedorAgregar");
            contenedorAgregar=recuadro;
            recuadro.hidden=true;
    }
    
    export function Guardar()
    {
        var nombre:string = (<HTMLInputElement>document.getElementById("nombre")).value;
        var apellido = (<HTMLInputElement>document.getElementById("apellido")).value;
        var edad =(<HTMLInputElement>document.getElementById("edad")).value;

        

        var pro = new Promise((resolve, reject) => {
            var sexo = (<HTMLSelectElement>document.getElementById("sexo")).value;
            if (sexo == "Femenino")
            {
                var p = parseInt(edad);
                
                if (p.toString() != "NaN" )
                {
                resolve(new Cliente(CalcularId(),nombre, apellido,p,sexo))
                }
                else
                {
                    reject("Error")
                }
            }
            else if (sexo == "Masculino")
            {        
                var p = parseInt(edad);
                resolve (new Cliente(CalcularId(),nombre, apellido, p, sexo))
            }
            else 
            {
                reject("Error")
            }
        });

        pro.then((persona) => {
            listaPersona.push(<Personas>persona);
            var tablaPersona = (<HTMLTableElement>document.getElementById("tabla")); 
            var tbody = (<HTMLElement>document.getElementById("tbody"));
            var sexo2 = (<HTMLSelectElement>document.getElementById("sexo")).value;
            const persona2={
                id:(<Personas>persona).getId(),
                nombre:nombre,
                apellido:apellido,
                edad:edad,
                sexo:sexo2
                
            }
            ConstruirFila(tbody,persona2);
                }).catch((error)=>
        {
            alert("La edad debe ser numerica" + error)
        })
    }

    export function Eliminar(tr:any){
        var borrar = tr.target.parentNode.parentNode;
        var borrado  = borrar.childNodes[0].innerHTML
        var listaId = listaPersona.filter(Persona => Persona.getId()== borrado);
        if(listaId.length>0)
        {
            listaPersona.splice(borrado,1);
            tr.target.parentNode.parentNode.remove();
        }
    }

    function CalcularId()
    {
        var id : number = 1;
        if(listaPersona.length != 0)
        {
            var lastRegisterIndex : number = listaPersona.length-1;
            var lastRegister : Personas = listaPersona[lastRegisterIndex];
            id = lastRegister.getId() + 1;
        }
        return id;
    }


    export function ConstruirFila(tabla:HTMLElement,persona:any):void
    {
        var tr = document.createElement("tr");
        if(persona.id){
            var td3 = document.createElement("td");
            td3.appendChild(document.createTextNode((persona.id.toString())));
            tr.appendChild(td3);

        }
       
        if(persona.nombre){
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(persona.nombre));
            tr.appendChild(td);

        }
       
        if(persona.apellido){
            var td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(persona.apellido));
            tr.appendChild(td2);
        }
       
        if(persona.edad){
            var td4 = document.createElement("td");
        td4.appendChild(document.createTextNode(persona.edad));
        tr.appendChild(td4);
        }
        
        if(persona.sexo){
            var td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(persona.sexo));
            tr.appendChild(td5);
        }

        var tdAccion = document.createElement("td");
        var button = document.createElement("button");
        button.textContent = "Eliminar";
        button.addEventListener('click',Persona.Eliminar);
        tdAccion.appendChild(button);
        tr.appendChild(tdAccion);
        
        tr.addEventListener("dblclick", fillData);
        tabla.appendChild(tr); 
    } 

    export function fillData(tr:any)
    {
        var trForFilling = tr.target.parentNode;
        globalTr=trForFilling;
       
        (<HTMLInputElement>document.getElementById("nombre")).value=trForFilling.childNodes[0].innerHTML;
        (<HTMLInputElement>document.getElementById("atributo")).value=trForFilling.childNodes[1].innerHTML;
        (<HTMLInputElement>document.getElementById("sexo")).value=trForFilling.childNodes[2].innerHTML;
    }

    export function Filtrar(){
        var select = (<HTMLInputElement>document.getElementById("tipoFiltro")).value;
        if (select == "Femenino"){
            var listaFemenino:Array<Personas> = listaPersona.filter(function(item){
                if (item instanceof Cliente){
                    return item;
                }
            } );
            var tablaCliente = (<HTMLTableElement>document.getElementById("tabla"));
            var tablaBody = (<HTMLElement>document.getElementById("tbody"));
            tablaBody.innerHTML = "";
            tablaCliente.childNodes.forEach(element => {
                if(element.nodeName == "TBODY"){
                    tablaCliente.removeChild(element);
                }
            });
            tablaCliente.appendChild($_Tbody(listaFemenino));
        }
        else if (select == "Masculino"){
            var listaMasculino:Array<Personas> = listaPersona.filter(function(item){
                if (item instanceof Cliente){
                    return item;
                }
            });  
            var tablaPersona = (<HTMLTableElement>document.getElementById("tabla"));
            var tablaBody = (<HTMLElement>document.getElementById("tbody"));
            tablaPersona.childNodes.forEach(element => {
                if(element.nodeName == "TBODY"){
                    tablaPersona.removeChild(element);
                }
            });
            tablaPersona.appendChild($_Tbody(listaMasculino));          
        }
        else{
            var tablaPersona = (<HTMLTableElement>document.getElementById("tabla"));
            var tablaBody = (<HTMLElement>document.getElementById("tbody"));
            tablaPersona.childNodes.forEach(element => {
                if(element.nodeName == "TBODY"){
                    tablaPersona.removeChild(element);
                }
            });
            tablaPersona.appendChild($_Tbody(listaPersona));
        }

    }

    export function $_Tbody(array:any){
        var tbody = document.createElement("tbody");
        tbody.id = "tbody"        
        for(let i = 0; i< array.length; i++)
        {
            var arraykeys = Object.keys(array[i]);
            var tr = document.createElement("tr");
            tr.id = "tr"+i;
            arraykeys.forEach(element => {
                tr.appendChild($_Td(array[i][element]));
            });        
            tbody.appendChild(tr);
        }   
        return tbody;
    }

    function $_Td(value: any){
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(value));
        return td;
    }

    export function Promedio()
    {
        var promedio : number=0;
        var total=0;
        var select = (<HTMLInputElement>document.getElementById("tipoFiltro")).value;
        if (select == "Femenino")
        {
            var listaFemenino:Array<Personas> = listaPersona.filter(function(item){
                if (item instanceof Cliente)
                {
                    return item;
                }
            } );
            promedio = listaFemenino.reduce(function(total,item){
                console.log(item.getEdad());
                return total+=item.getEdad();
            },0);
            promedio= promedio/listaFemenino.length;
        }else if (select == "Masculino")
        {
            var listaMasculino:Array<Personas> = listaPersona.filter(function(item){
                if (item instanceof Cliente)
                {
                    return item;
                }
        
            });
            promedio = listaMasculino.reduce(function(total,item){
                console.log(item.getEdad());
                return total+=item.getEdad();
            },0);
            promedio= promedio/listaMasculino.length;
        }

        (<HTMLInputElement>document.getElementById("precioFiltro")).value =promedio.toString();
    }
}