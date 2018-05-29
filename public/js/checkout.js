fetch('http://localhost:3000/checkout=' + arreglo)
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        console.log(res);

        var lista = document.querySelector('.lista');
        res.forEach(function (elem) {
            lista.innerHTML;
        });
    });