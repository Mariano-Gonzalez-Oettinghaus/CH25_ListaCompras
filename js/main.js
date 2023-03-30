// El código va aquí -> 
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let alertValidaciones = document.getElementById("alertValidaciones")
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto")

let tabla = document.getElementById("tablaListaCompras")
let cuerpoTabla = tabla.getElementsByTagName("tbody")

let isValid = true;
let idTimeout;
let precio = 0;
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0;


let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");
//Limpiar campos
btnClear.addEventListener("click", function(event){
event.preventDefault();
txtNombre.value="";
txtNumber.value="";
cuerpoTabla[0].innerHTML="";

contador = 0;
totalEnProductos = 0;
costoTotal = 0;
contadorProductos.innerText="0";
productosTotal.innerText="0";
precioTotal.innerText="$ 0";
  
 
localStorage.setItem("contadorProductos",contador);
localStorage.setItem("totalEnProductos",totalEnProductos);
localStorage.setItem("costoTotal",costoTotal.toFixed(2));



});//click btnClear

function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }//if
    if (isNaN (txtNumber.value)){
       return false;
    }//if
    if (parseFloat(txtNumber.value)<=0){
        return false;
    }//if

    return true;
}//validarCantidad

function getPrecio(){
  return Math.floor(Math.random() * 50 * 100) / 100;
}

btnAgregar.addEventListener("click", function(event){
event.preventDefault();
isValid = true;
console.log(getPrecio());
clearTimeout(idTimeout);
alertValidacionesTexto.innerHTML="";
alertValidaciones.style.display="none"
let lista = "Los siguientes campos deben ser llenados correctamente:<ul>"
// txtNombre.value = txtNombre.value.trim();

if (txtNombre.value.length<2){
    txtNombre.style.border="solid thin red";
    lista +="<li> se debe escribir un nombre valido</li>"
    // alertValidacionesTexto.innerHTML="Se debe escribir un nombre valido";
    alertValidaciones.style.display="block"
    isValid = false;
} else{
    txtNombre.style.border="";
    }
//if txtNombre

if (! validarCantidad()){
    txtNumber.style.border="solid thin red";
    lista +="<li> se debe escribir una cantidad valido</li>"
    // alertValidacionesTexto.innerHTML="Se debe escribir una cantidad valido";
    alertValidaciones.style.display="block"
    isValid = false;
} else{
    txtNumber.style.border="";
    }
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
    idTimeout= setTimeout(function() {
        alertValidaciones.style.display = "none";
    }, 5000);

    if(isValid){
    contador ++;
    precio = getPrecio();

    let row =`<tr>
                <th>${contador}</th>
                <td>${txtNombre.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
             </tr>`;

            cuerpoTabla[0].insertAdjacentHTML("beforeend", row)
            contadorProductos.innerText=contador;
            totalEnProductos += parseFloat (txtNumber.value);
            productosTotal.innerText=totalEnProductos;
            costoTotal += precio * parseFloat(txtNumber.value);
            precioTotal.innerText=` ${costoTotal.toFixed(2)}`;
            localStorage.setItem("contadorProductos",contador);
            localStorage.setItem("totalEnProductos",totalEnProductos);
            localStorage.setItem("costoTotal",costoTotal.toFixed(2));
            txtNombre.value="";
            txtNumber.value="";
            txtNombre.focus();
        }
//if txtNumber
});//btnAgregar click

txtNumber.addEventListener("blur", function(event){
    event.preventDefault()
    txtNumber.value = txtNumber.value.trim();
}); //  txtNumber.blur


txtNombre.addEventListener("blur", function(event){
    event.preventDefault()
    txtNombre.value = txtNombre.value.trim();
}); //  txtNombre.blur

window.addEventListener("load", function(event){

if(localStorage.getItem("contadorProductos")==null){
localStorage.getItem("contadorProductos", "0");
}//if

if(localStorage.getItem("totalEnProductos")==null){
    localStorage.getItem("totalEnProductos", "0");
}//if

if(localStorage.getItem("costoTotal")==null){
   localStorage.getItem("costoTotal", "0.0");
}//if

 contador = parseInt(localStorage.getItem("contadorProductos"));
 totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
 costoTotal = parseFloat(localStorage.getItem("costoTotal"));

contadorProductos.innerText=contador;
productosTotal.innerText=totalEnProductos;
precioTotal.innerText=`$ ${costoTotal}`;
  
});