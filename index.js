const MongoClient = require('mongodb').MongoClient,
    //ObjectID = require('mongodb').ObjectID,
    express = require('express'),
    engines = require('consolidate');
const path = require('path');
const hbs = require('express-handlebars');
const morgan = require('morgan');



var app = express(),
    db;

//middlewares

//app.use(morgan('dev'));
app.use(express.static('public'));

//mongoDB


// Conectarse a Base de Datos
MongoClient.connect('mongodb+srv://tallerweb-xhkvw.mongodb.net/test?retryWrites=true', {

    auth: {
        user: 'sendout',
        password: 'santy0630'
    }

}, function (err, client) {
    if (err) throw err;

    db = client.db('player');

    // Iniciar servidor
    app.listen(process.env.PORT || 3000);
});

//render app
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layout/'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//

//rutas
app.get('/', (req, res) => {

    var can = db.collection('canciones').find();
    var alb = db.collection('albums').find();

    can.filter({
        destacada: true
    });

    can.toArray((err, resultA) => {
        alb.toArray((err, resultB) => {
            res.render('index', {
                canDestacadas: resultA,
                albums: resultB
            });
        });
    });
});

app.get('/song/:id', (req, res) => {

    if (req.params.id == 0 || req.params.id >= 47) {
        res.render('error', {
            title: 'No se ha encontrado la Canción'
        });
    }

    var idd = parseInt(req.params.id);

    var prod = db.collection('canciones').find({
        id: idd
    }).toArray((err, result) => {
        res.render('cancion', {
            song: result[0]
        });
    });

});

app.get('/player/', (req, res) => {
    var can = db.collection('canciones').find();

    if (req.query.genero)
        can.filter({
            genero: req.query.genero
        });

    if (req.query.album)
        can.filter({
            album: req.query.album
        });

    if (req.query.destacada)
        can.filter({
            destacada: true
        });

    var alb = db.collection('albums').find();
    can.toArray((err, canciones) => {
        alb.toArray((err, result) => {

            res.render('player', {
                albumes: result,
                musica: canciones
            });
        });
    });
});

//post

app.post('/song/:id', (req, res) => {

    //codigo de agregar

    var i = parseInt(req.param.id);

    if (i == 0 || i >= 47) {
        res.redirect('/song/' + i + '');
    }
});

app.get('/*', (req, res) => {
    res.render('error', {
        title: 'Pagina no encontrada'
    });
});
//