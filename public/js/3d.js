function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var db = [{
    titulo: 'SWEATER WEATHER',
    data: 'Canción más escuchada: 242 Millones en Youtube'
}, {
    titulo: 'THE NEIGHBOURHOOD',
    data: 'Su ultimo album, lleva el nombre de la Banda'
}, {
    titulo: 'SCARY LOVE',
    data: 'Canción más escuchada del ultimo album: The Neighbourhood'
}, {
    titulo: 'THE NBHD',
    data: 'La abreviatura de su nombre'
}, {
    titulo: 'GÉNEROS',
    data: 'Electro Rock, Indie Rock, Alternative Rock, Rap, entre otros...'
}, {
    titulo: 'ORIGEN',
    data: 'Newbury Park, California, Estados Unidos, 2011'
}, {
    titulo: 'FEMALE ROBBERY',
    data: 'Primer video Musical'
}, {
    titulo: 'JESSE RUTHERFORD',
    data: 'Vocalista '
}, {
    titulo: "I'M SORRY",
    data: 'Su primer album'
}, {
    titulo: 'HONEST',
    data: 'Canción que fue banda sonora de la pelicula THE AMAZING SPIDER-MAN 2'
}, {
    titulo: 'SWEATER WEATHER',
    data: 'Canción más escuchada: 242 Millones en Youtube'
}];

var main = document.getElementById("grupo3D");
var temp = document.getElementById("temp");

function mostrarTemp(i) {
    ocultarTemp();

    var t = document.createElement('div');
    t.setAttribute('id', 'temp');

    var c = document.createElement('div');
    c.setAttribute('class', 'cont');

    var h1 = document.createElement('h1');
    h1.innerHTML = db[i].titulo;

    var h3 = document.createElement('h3');
    h3.innerHTML = db[i].data;

    c.appendChild(h1);
    c.appendChild(h3);

    t.appendChild(c);
    main.appendChild(t);

}

function ocultarTemp() {
    if (document.getElementById("temp")) {
        document.getElementById("temp").remove();
    }
}

ocultarTemp();

/*
function mostrarTemp(i) {
    ocultarTemp();

    temp.childNodes[1].childNodes[0].innerHTML = db[i].titulo;
    temp.childNodes[1].childNodes[1].innerHTML = db[i].data;

    temp.style.opacity = '1';
}

function ocultarTemp() {
    temp.style.opacity = '0';
}*/

var renderer, scene, camera;
var particles, uniforms;
var PARTICLE_SIZE = 20;
var raycaster, intersects;
var mouse = new THREE.Vector2(),
    INTERSECTED;

var obj;

var contenedor = document.getElementById("grupo3D");

var particles;

var circles;

var rot = true;

var numObj = 30;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 300;

    //controls
    var controls = new THREE.OrbitControls(camera);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.5;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141414);
    scene.fog = new THREE.FogExp2(0x000000, 0.0013);

    var ambientLight = new THREE.AmbientLight(0x168e6, 0.3);
    scene.add(ambientLight);
    var pointLight = new THREE.PointLight(0xfffffff, 0.5);
    camera.add(pointLight);
    scene.add(camera);

    //

    var g = new THREE.BufferGeometry();
    var v = [];
    var s = new THREE.TextureLoader().load("/models/text/circle.png")
    for (var i = 0; i < 2000; i++) {
        var x = getRandom(-700, 700);
        var y = getRandom(-700, 700);
        var z = getRandom(-700, 700);
        v.push(x, y, z);
    }
    g.addAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    var m = new THREE.PointsMaterial({
        size: 10,
        sizeAttenuation: false,
        map: s,
        alphaTest: 0.9,
        transparent: true
    });
    m.color.setHSL(0.55, 0.1, 0.6);
    var p = new THREE.Points(g, m);
    scene.add(p);

    //
    var geometry1 = new THREE.SphereGeometry(100, 32, 32);
    var vertices = geometry1.vertices;
    var positions = new Float32Array(vertices.length * 3);
    var colors = new Float32Array(vertices.length * 3);
    var sizes = new Float32Array(vertices.length);
    var ind = new Float32Array(vertices.length);
    var vertex;
    var color = new THREE.Color();
    var total = vertices.length;

    for (var i = 0, l = numObj; i < l; i++) {
        var r = getRandom(0, total - 1);
        var ii = parseInt(r);
        vertex = vertices[ii];
        vertex.toArray(positions, ii * 3);
        if (i < db.length - 1) {
            color.setHSL(0.55, 0.8, 0.5);
        } else {
            color.setHSL(0.55, 0.5, 0.8);
        }
        color.toArray(colors, ii * 3);
        sizes[ii] = PARTICLE_SIZE;
        ind[ii] = i;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.addAttribute('ind', new THREE.BufferAttribute(ind, 1));
    //
    var material = new THREE.ShaderMaterial({
        uniforms: {
            color: {
                value: new THREE.Color(0xffffff)
            },
            texture: {
                value: new THREE.TextureLoader().load("/models/text/becircle.png")
            }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        alphaTest: 0.9
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    //

    // model
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function (xhr) {};

    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    new THREE.MTLLoader()
        .setPath('/models/')
        .load('holi.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('/models/')
                .load('Logo.obj', function (object) {
                    obj = object;
                    obj.rotation.x = 4.9;
                    scene.add(obj);
                }, onProgress, onError);
        });

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    contenedor.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function animate() {

    requestAnimationFrame(animate);

    if (rot) {
        if (obj != null) {
            obj.rotation.z += 0.001;
            particles.rotation.z += 0.0015;
            particles.rotation.y += 0.0015;
            particles.rotation.x += 0.0015;
        }
    }
    render();
    renderer.render(scene, camera);

}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    // find intersections 
    var geometry = particles.geometry;
    var attributes = geometry.attributes;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(particles);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].index) { //press

            attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
            INTERSECTED = intersects[0].index;
            attributes.size.array[INTERSECTED] = PARTICLE_SIZE + 10;
            attributes.size.needsUpdate = true;

            rot = false;
            if (attributes.ind.array[INTERSECTED] < 10) {
                mostrarTemp(attributes.ind.array[INTERSECTED]);
            }
        }
    } else if (INTERSECTED !== null) { //releassed
        ocultarTemp();
        attributes.size.array[INTERSECTED] = PARTICLE_SIZE;
        attributes.size.needsUpdate = true;
        INTERSECTED = null;
        rot = true;
    }
    renderer.render(scene, camera);
}
