//canvas

var canvas = document.getElementById("canvas");

var visualizer = function (p) {

    var id = idSonido;

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    var x = width / 2;
    var y = height / 2;
    var radio = width / 3.2;
    var anchoLineas = width / 320;
    var song;
    var ancho = width / 100;
    var numLineas = 100;
    var tipe = true;
    var amplitude;

    var special = false;

    let audioSpect = [];
    let audioSpectDos = [];
    let spectrum;

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

        spectrum = fft.waveform();

        audioSpect = new Array(8);
        for (var i = 0; i < audioSpect.length; i++) {
            audioSpect[i] = new Array(10);
        }

        for (let a = 0; a < audioSpect.length; a++) {
            for (let b = 0; b < audioSpect[a].length; b++) {
                audioSpect[a][b] = false;
            }
        }

        audioSpectDos = new Array(8);
        for (var i = 0; i < audioSpectDos.length; i++) {
            audioSpectDos[i] = new Array(10);
        }

        for (let a = 0; a < audioSpectDos.length; a++) {
            for (let b = 0; b < audioSpectDos[a].length; b++) {
                audioSpectDos[a][b] = false;
            }
        }

        p.frameRate(60);
    };

    p.draw = function () {
        p.background(20);
        spectrum = fft.analyze();

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

            //EQ VIEW

            let marX = width / 53.3333;
            let marY = height / 53.3333;

            let tamX = width / 9.6269;
            let tamY = height / 12.5;

            p.rectMode(p.CORNER);
            for (let x = 0; x < audioSpectDos.length; x++) {
                let i = 0;
                for (let y = 0; y < audioSpectDos[0].length; y++) {
                    if (audioSpectDos[x][y]) {
                        let op = 33 - (i * 3);
                        p.fill(240, 240, 250, op);
                        p.rect((width - tamX) - (marX + (x * (tamX + marX))), (height - (marY + tamY)) - (y * (tamY + marY)), tamX,
                            tamY);
                        p.noFill();
                        p.fill(255);
                        p.noFill();
                        i++;

                        audioSpectDos[x][y] = false;
                    }
                }
            }

            p.rectMode(p.CENTER);

            p.noFill();

            p.rectMode(p.CORNER);
            for (let x = 0; x < audioSpect.length; x++) {
                let i = 0;
                for (let y = 0; y < audioSpect[0].length; y++) {
                    if (audioSpect[x][y]) {
                        let op = 55 - (i * 5);
                        if (special == false) {
                            p.fill(22, 136, 230, 80);
                        } else {
                            p.fill(243, 72, 113, 90);
                        }
                        p.rect((marX + (x * (tamX + marX))), (height - (marY + tamY)) - (y * (tamY + marY)), tamX,
                            tamY);
                        p.noFill();
                        p.fill(255);
                        p.noFill();
                        i++;

                        audioSpect[x][y] = false;
                    }
                }
            }

            p.rectMode(p.CENTER);

            p.noFill();

            p.eqCalculate();

            //EQ VIEW

            //LINEAR VIEW

            /* 
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
            */
        }
        p.noFill();
    };

    p.eqCalculate = function () {
        let num = 50;

        //
        let mov = 25;

        for (let i = mov; i < 1000; i += num) {
            let val = 0;

            for (let j = 0; j < num; j++) {
                let valor = Math.abs(spectrum[i + j]);
                val += (valor * 1);
            }

            let prom = val / num;

            let index = (i - mov) / num;

            if (index < audioSpect.length) {
                let n = parseInt(prom / 10) - 8;

                if (n < 0) {
                    n = 0;
                }

                if (n > audioSpect[0].length) {
                    n = 10;
                }

                for (let j = 0; j < n; j++) {
                    audioSpect[index][j] = true;
                }
            } else {
                break;
            }
        }
        //
        //
        let mov2 = mov + (num * audioSpect.length);

        for (let i = mov2; i < 1000; i += num) {
            let val = 0;

            for (let j = 0; j < num; j++) {
                let valor = Math.abs(spectrum[i + j]);
                val += (valor * 1);
            }

            let prom = val / num;

            let index = (i - mov2) / num;

            if (index < audioSpectDos.length) {
                let n = parseInt(prom / 10);

                if (n < 0) {
                    n = 0;
                }

                if (n > audioSpectDos[0].length) {
                    n = 10;
                }

                for (let j = 0; j < n; j++) {
                    audioSpectDos[index][j] = true;
                }
            } else {
                break;
            }
        }
        //
    }

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
        anchoLineas = width / 320;
        radio = width / 3.2;
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

//scrollReveral
window.sr = ScrollReveal({
    reset: true
});
sr.reveal('#canvas');
sr.reveal('footer');
sr.reveal('#data');