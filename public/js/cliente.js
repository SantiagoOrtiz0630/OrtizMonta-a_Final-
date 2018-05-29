// carrito
function actualizarCarrito (){
    document.querySelector('.lista').innerHTML = arreglo.length;
}

var lista = JSON.parse(localStorage.getItem('lista'));
if(lista == null) lista = [];

actualizarCarrito();