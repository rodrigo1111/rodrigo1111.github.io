import * as THREE from "./three.js-master/build/three.module.js"

import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'






const canvas = document.querySelector('#three-ghost');
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas, alpha: true,
});

renderer.setClearColor( 0x000000, 0 );
renderer.physicallyCorrectLights = true;
renderer.outputEncoding =  THREE.sRGBEncoding;

renderer.gammaOutput =  true;
renderer.gammaFactor =  2.2;
    const camera = new THREE.OrthographicCamera( (window.innerWidth / 1000), -(window.innerWidth / 1000) , (window.innerHeight / 1000), -(window.innerHeight / 1000), 1, 10 );
    const scene = new THREE.Scene();
    let Mesh;
    //let light;
    const techmanGroup = new THREE.Group();



    var mouseX = (window.innerWidth / 3 );
    var mouseY = (window.innerHeight / 3 );
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
      var e = window.event;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    renderer.render(scene, camera);


    function init() {
        //scene.background = new THREE.Color(/*'#0D201A'*/ '#000000');
        camera.position.set(.65, 0, 4);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function setLight() {
      //light = new THREE.HemisphereLight( 0xffffff, /*0x0D201A*/ 0x000000, 1 ); // soft white light
      //scene.add(light);
    }

    function loadGLTF() {
        let balloonLoader = new GLTFLoader();

        balloonLoader.load('./model/ghost.glb', (gltf) => {
            Mesh = gltf.scene;
            Mesh.scale.set(0.7,0.7,0.7);
            /*scene.add(Mesh);/**/
            Mesh.rotation.x = Math.PI / 2;

            techmanGroup.add( Mesh );



        });
    }







    scene.add(techmanGroup);
    techmanGroup.position.x = 0;
    techmanGroup.position.y = 0;
    techmanGroup.position.z = 0;


    var frame = 0;

    function animate() {

        
        setTimeout( function() {

            requestAnimationFrame( animate );
    
        }, 1000 / 15 );
        

        if (activeSection == 0 || activeSection == 1) {
            if (Mesh && Mesh.rotation) {

                //ohmnomSine = (Math.sin(frame) * .5 + .5);

                var xRotation = ((mouseX) - (canvas.width / 2)) * .001;
                var yRotation = ((mouseY) - (canvas.height / 2)) * .001;

                techmanGroup.rotation.y = -xRotation;
                techmanGroup.rotation.x = yRotation;
                //Mesh.rotation.x =  (-Math.PI / 4) * ohmnomSine;

                frame += .3;
            }
            renderer.render(scene, camera);
        }
        
    }

    window.addEventListener('resize', function() {
        var aspect = window.innerWidth / window.innerHeight;
        camera.left = (window.innerWidth / 1000);
        camera.right = -(window.innerWidth / 1000);
        camera.top = (window.innerHeight / 1000);
        camera.bottom = -(window.innerHeight / 1000);
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

      
    init();
    setLight();
    loadGLTF();
    animate();