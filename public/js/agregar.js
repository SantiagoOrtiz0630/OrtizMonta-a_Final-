document.querySelectorAll('#agregar').forEach(function(button) {
    button.addEventListener('click', function(){
        var id = button.parentNode.parentNode.getAttribute('data-id');
        console.log(button.parentNode.parentNode.getAttribute('data-id'));

        if(arreglo.indexOf(id) >= 0){
            console.log('paila');
            return;
        }

        arreglo.push(id);
        actualizarCarrito();
        localStorage.setItem('arreglo', JSON.stringify(arreglo));
    });
});