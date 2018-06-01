//discografia

hoverAlbum();

function hoverAlbum() {
    var albumsArray = document.getElementsByClassName('album');

    for (var i = 0; i < albumsArray.length; i++) {
        const element = albumsArray[i];
        element.children[0].style.display = 'none';
    }

    for (var i = 0; i < albumsArray.length; i++) {
        const element = albumsArray[i];
        element.addEventListener("mouseover", function () {
            element.children[0].style.display = 'flex';
        });
    }

    for (var i = 0; i < albumsArray.length; i++) {
        const element = albumsArray[i];
        element.addEventListener("mouseout", function () {
            element.children[0].style.display = 'none';
        });
    }
}


//discografia


//info

var contCards = document.getElementById('contCard');
var cards = [{
    name: 'HISTORIA',
    texto: 'The Neighbourhood (estilizado como THE NBHD) es un grupo musical de rock estadounidense formado en agosto de 2011. La banda está compuesta por el vocalista Jesse Rutherford, los guitarristas Jeremy Freedman y Zach Abels, el baterista Brandon Fried y el bajista Mikey Margott. Después de lanzar dos EPs, I’m Sorry… y Thank You, The Neighbourhood publicó su primer álbum de larga duración, I Love You., el 23 de abril de 2013, a través de Columbia Records. El 16 de enero de 2014, la banda reveló a través de medios de comunicación social que el baterista Bryan Sammis dejaba la banda para seguir una carrera en solitario en la música.'
}, {
    name: 'VIDEOS',
    texto: 'Los videos musicales en los que ha participado:',
    list: ['Female Robbery', 'Let It Go', 'A Little Death', 'Sweater Weather', 'Afraid', 'Dangerous', 'R.I.P. 2 my youth', 'Daddy Issues']
}, {
    name: 'INTEGRANTES',
    texto: 'Los miembros actuales del grupo son:',
    list: ['Jesse Rutherford: voz', 'Zach Abels: guitarra', 'Michael «Mikey» Margott: bajo', 'Jeremy Freedman: guitarra', 'Brandon Fried: batería']
}];

function createCard(name, texto, list) {
    var card = document.createElement('article');
    card.setAttribute('class', 'card');

    var titulo = document.createElement('h2');
    titulo.innerHTML = name;

    var text = document.createElement('p');
    text.innerHTML = texto;

    card.appendChild(titulo);
    card.appendChild(text);

    if (list != null) {
        var lista = document.createElement('ul');
        for (var i = 0; i < list.length; i++) {
            const element = list[i];
            var li = document.createElement('li');
            li.innerHTML = element;
            lista.appendChild(li);
        }
        card.appendChild(lista);
        lista.style.display = 'none';
    }

    contCards.appendChild(card);

    text.style.display = 'none';
}

for (var i = 0; i < cards.length; i++) {
    const element = cards[i];
    createCard(element.name, element.texto, element.list);
}

var cardsArray = document.getElementsByClassName('card');

for (var i = 0; i < cardsArray.length; i++) {
    const card = cardsArray[i];

    card.addEventListener('mouseover', function () {
        card.children[1].style.display = 'block';
        if (card.children.length > 2) {
            card.children[2].style.display = 'block';
        }
    });

    card.addEventListener('mouseout', function () {
        card.children[1].style.display = 'none';
        if (card.children.length > 2) {
            card.children[2].style.display = 'none';
        }
    });

}

//sub
var btnCorreo = document.getElementById('btnCorreo');
var inpCorreo = document.getElementById('correo');

btnCorreo.addEventListener('click', sub);

function sub() {
    if (inpCorreo.value != '') {
        swal({
            title: '¡Gracias!',
            text: 'Te enviaremos informacion a: ' + inpCorreo.value,
            type: 'success',
            showConfirmButton: false,
            timer: 2000
        });
        inpCorreo.value = '';
    }
}

//

//info

//scrollReveral
window.sr = ScrollReveal({
    reset: true
});
sr.reveal('footer');
sr.reveal('.songLink');
sr.reveal('.album');
sr.reveal('.card');
sr.reveal('.titleSec');
sr.reveal('label');
//