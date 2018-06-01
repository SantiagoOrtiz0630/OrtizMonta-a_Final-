const MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    express = require('express'),
    engines = require('consolidate');
const path = require('path');
const hbs = require('express-handlebars');
const morgan = require('morgan');

var app = express(),
    db;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//

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

var b;

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

app.get('/3d', (req, res) => {
    res.render('3d', {
        title: 'holi'
    });
});

app.get('/song/:id', (req, res) => {
    var idd = parseInt(req.params.id);

    if (idd == 0 || idd >= 47) {
        res.render('error', {
            title: 'No se ha encontrado la Canción'
        });
    }


    var prod = db.collection('canciones').find({
        id: idd
    }).toArray((err, result) => {
        var list = db.collection('list').find({
            id: idd
        }).toArray((err, resultList) => {
            //
            var exist = (!(resultList[0] == undefined) && (result[0].nombre == resultList[0].nombre));
            res.render('cancion', {
                song: result[0],
                form: exist
            });
            //
        });
    });
});

app.get('/list', (req, res) => {

    var list = db.collection('list').find();

    list.toArray((err, result) => {
        res.render('list', {
            musica: result
        });
    });
});

app.post('/list/remove', (req, res) => {

    var idd = parseInt(req.body.id);

    db.collection('list').deleteOne({
        id: idd
    });

    res.redirect('/list');
});

app.post('/list/add', (req, res) => {

    var idd = parseInt(req.body.id);

    var songReal = db.collection('canciones').find({
        id: idd
    }).toArray((err, result) => {

        db.collection('list').save(result[0]);
        res.redirect('/list');
    });;
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

app.get('/*', (req, res) => {
    res.render('error', {
        title: 'Pagina no encontrada'
    });
});
//