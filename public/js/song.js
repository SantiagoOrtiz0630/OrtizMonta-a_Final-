
//canvas

var canvas = document.getElementById("canvas");

var visualizer = function (p) {

    var id = idSonido;

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var x = width / 2;
    var y = height / 2;
    var radio = width / 5;
    var song;
    var ancho = width / 100;
    var numLineas = 100;
    var tipe = true;
    var amplitude;
    var anchoLineas = width / 500;

    var special = false;

    p.preload = function () {
        p.soundFormats('mp3', 'ogg');
        var s = p.loadSound('/rec/songs/s (' + id + ').mp3');
        song = s;
        fft = new p5.FFT();
        amplitude = new p5.Amplitude();
        amplitude.setInput(song);
        if (id == 29) {
            special = true;
        } else {
            special = false;
        }
    }

    p.setup = function () {
        p.createCanvas(width, height);
        p.noStroke();
        p.angleMode(p.DEGREES);
        song.loop();
    };

    p.draw = function () {
        p.background(20);
        let spectrum = fft.analyze();

        var amp = (20 * amplitude.getLevel());


        if (tipe) {
            for (let i = 0; i < numLineas; i++) {
                try {
                    p.push();
                    p.translate(x, y);
                    p.rotate(((360 / numLineas) * i));
                    var prom = spectrum[i];
                    var prom2 = spectrum[i + 100];
                    //var prom = (spectrum[i - 2] + spectrum[i - 1] + spectrum[i] + spectrum[i + 1] + spectrum[i + 2]) / 5;
                    var tam = prom / 5.5;
                    var tam2 = prom2 / 3.5;
                    if (special == false) {
                        p.fill(22, 136, 230, 80);
                    } else {
                        p.fill(243, 72, 113, 90);
                    }
                    p.ellipse(0, amp + radio, ancho / 2, tam2 * anchoLineas);
                    p.fill(210, 210, 210);
                    p.ellipse(0, amp + radio, ancho / 2, tam * anchoLineas);
                    p.pop();
                } catch (e) {}
            }
        } else {
            p.fill(250, 250, 250, 120);
            for (let i = 0; i < numLineas; i++) {
                try {
                    var newAncho = (width - 20) / 100;
                    var prom = spectrum[i];
                    var prom2 = spectrum[i + 100];
                    //var prom = (spectrum[i - 2] + spectrum[i - 1] + spectrum[i] + spectrum[i + 1] + spectrum[i + 2]) / 5;
                    var tam = prom / 5.5;
                    var tam2 = prom2 / 3.5;
                    if (special == false) {
                        p.fill(22, 136, 230, 80);
                    } else {
                        p.fill(243, 72, 113, 90);
                    }
                    p.ellipse(10 + (i * newAncho), width / 2, ancho / 2, tam2 * anchoLineas);
                    p.fill(210, 210, 210);
                    p.ellipse(10 + (i * newAncho), width / 2, ancho / 2, tam * anchoLineas);
                    p.pop();
                } catch (e) {}
            }
        }
        p.noFill();
    };

    p.changeSong = function (i) {
        if (song != null) {
            song.stop();
            song = songs[i];
            song.loop();
        }
    }

    p.changePlay = function () {
        if (song != null) {
            if (song.isPlaying()) {
                song.pause();
            } else {
                song.loop();
            }
        }
    }

    p.changeTipe = function () {
        if (song != null) {
            tipe = !tipe;
        }
    }

    p.stop = function () {
        if (song != null) {
            song.stop();
        }
    }

    p.windowResized = function () {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        anchoLineas = width / 500;
        radio = width / 5;
        ancho = width / 100;
        x = width / 2;
        y = height / 2;
        p.resizeCanvas(width, height);
    };

};

var myp5 = new p5(visualizer, canvas);


//menu


var btnPlay = document.getElementById('play');
btnPlay.addEventListener('click', myp5.changePlay);

var btnStop = document.getElementById('stop');
btnStop.addEventListener('click', myp5.stop);

var btnTipe = document.getElementById('tipe');
btnTipe.addEventListener('click', myp5.changeTipe);

//canvas

var buttonAgregar = document.getElementById('agregar');



//scrollReveral
window.sr = ScrollReveal({
    reset: true
});
sr.reveal('#canvas');
sr.reveal('footer');
sr.reveal('#data');