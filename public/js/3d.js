// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var temp = document.getElementById('temp');

var db = [{
    titulo: '1',
    data: 'Datos'
}, {
    titulo: '2',
    data: 'Datos'
}, {
    titulo: '3',
    data: 'Datos'
}, {
    titulo: '4',
    data: 'Datos'
}, {
    titulo: '5',
    data: 'Datos'
}, {
    titulo: '6',
    data: 'Datos'
}, {
    titulo: '7',
    data: 'Datos'
}, {
    titulo: '8',
    data: 'Datos'
}, {
    titulo: '9',
    data: 'Datos'
}, {
    titulo: '9',
    data: 'Datos'
}];

var scrollAnimation = anime({
    targets: temp,
    translateX: 250,
    delay: 200,
    duration: 1000,
    autoplay: false
 });

  var scrollAnimationR = anime({
    targets: temp,
    translateX: 250,
    delay: 200,
    duration: 1000,
    direction: 'reverse',
    autoplay: false
});

function mostrarTemp(i) {
    ocultarTemp();

    temp.childNodes[1].childNodes[0].innerHTML = db[i].titulo;
    temp.childNodes[1].childNodes[1].innerHTML = db[i].data;

    temp.style.opacity = '1';

    scrollAnimation.play;
}

function ocultarTemp() {
    temp.style.opacity = '0';
    scrollAnimationR.play;
}
//3D

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

var numObj = 10;

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
    scene.fog = new THREE.FogExp2( 0x000000, 0.0013);

    var ambientLight = new THREE.AmbientLight(0x168e6, 0.3);
    scene.add(ambientLight);
    var pointLight = new THREE.PointLight(0xfffffff, 0.7);
    camera.add(pointLight);
    scene.add(camera);

    //

    var g = new THREE.BufferGeometry();
    var v = [];
    var s = new THREE.TextureLoader().load("/models/text/circle.png")
    for ( var i = 0; i < 2000; i ++ ) {
        var x = getRandom(-700, 700);
        var y = getRandom(-700, 700);
        var z = getRandom(-700, 700);
        v.push( x, y, z );
    }
    g.addAttribute( 'position', new THREE.Float32BufferAttribute( v, 3 ) );
  var  m = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false, map: s, alphaTest: 0.9, transparent: true } );
    m.color.setHSL(0.55, 0.1, 0.6);
    var p = new THREE.Points( g, m );
    scene.add( p );


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
        color.setHSL(0.55, 0.8, 0.5);
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
                value: new THREE.TextureLoader().load("/models/text/circle.png")
            }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        alphaTest: 0.9
    });
    //
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
            particles.rotation.y += 0.001;
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
            attributes.size.array[INTERSECTED] = PARTICLE_SIZE+10;
            attributes.size.needsUpdate = true;
            console.log(attributes.ind.array[INTERSECTED]);
            if (rot) {
                rot = false;
            }
            mostrarTemp(attributes.ind.array[INTERSECTED]);
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
