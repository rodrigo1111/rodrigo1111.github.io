import * as THREE from "./three.js-master/build/three.module.js"

import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { CSS2DRenderer, CSS2DObject } from './three.js-master/examples/jsm/renderers/CSS2DRenderer.js';





const canvas = document.querySelector('#three-techman');

//const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
const renderer = new THREE.WebGLRenderer({
   antialias: true,
   canvas , alpha: true,
});
const labelRenderer = new CSS2DRenderer();

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
let Mesh, Mesh2;

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const techmanGroup = new THREE.Group();

function main() {


camera.position.z = 5;
camera.position.y = -1;
//camera.rotation.x = - 3 * (Math.PI / 5);
camera.rotation.z = Math.PI;
camera.rotation.x = (Math.PI / 20);





const scene = new THREE.Scene();
{
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.HemisphereLight( 0xffffbb, /*0x0D201A*/ 0x000000, 1 ); // soft white light
scene.add(light);
}





renderer.render(scene, camera);
renderer.setSize(window.innerWidth, window.innerHeight);



















let balloonLoader = new GLTFLoader();
let balloonLoader2 = new GLTFLoader();

balloonLoader.load('./model/techman3.glb', (gltf) => {
    Mesh = gltf.scene;
    Mesh.scale.set(0.8,0.8,0.8);
    /*scene.add(Mesh);/**/
    Mesh.rotation.x = -Math.PI / 4 /*- 3*Math.PI /5 ;*/;

    scene.add( Mesh );



    gltf.parser.getDependencies( 'material' ).then( ( materials ) => {
      //console.log( materials );
    } );


    Mesh.material = new THREE.MeshPhongMaterial({
      color: 0xFFE968,
      side: THREE.DoubleSide,
    });
    const newMaterial = new THREE.MeshPhongMaterial({
      color: 0xFFE968,
      side: THREE.DoubleSide,
    });


});



balloonLoader2.load('./model/techman3.glb', (gltf) => {
    Mesh2 = gltf.scene;
    Mesh2.scale.set(0.8,0.8,0.8);
    /*scene.add(Mesh2);/**/
    Mesh2.rotation.x = Math.PI + Math.PI / 4 /*- 3*Math.PI /5 ;*/ ;

    scene.add( Mesh2 );
});

















scene.add(techmanGroup);
techmanGroup.position.x = 0;
techmanGroup.position.y = 10;
techmanGroup.position.z = 15;

var loader = new THREE.TextureLoader();

// Load an image file into a custom material
var todoMaterial = new THREE.MeshBasicMaterial({
  map: loader.load('lottie/images/img_4.png'),
  transparent: true,
});

// create a plane geometry for the image with a width of 10
// and a height that preserves the image's aspect ratio
var todoGeometry = new THREE.PlaneGeometry(8, 8/*  *.75  */);

// combine our image geometry and material into a mesh
var sprite1 = new THREE.Mesh(todoGeometry, todoMaterial);
var sprite2 = new THREE.Mesh(todoGeometry, todoMaterial);
var sprite3 = new THREE.Mesh(todoGeometry, todoMaterial);

// set the position of the image mesh in the x,y,z dimensions
sprite1.position.set(0,0,.6);
sprite1.scale.set(.03,.03,.03);
sprite1.rotation.z = Math.PI;

sprite2.position.set(0,0,.6);
sprite2.scale.set(.03,.03,.03);
sprite2.rotation.z = Math.PI;

sprite3.position.set(0,0,.6);
sprite3.scale.set(.03,.03,.03);
sprite3.rotation.z = Math.PI;
//sprite.rotation.x = Math.PI / 17;

// add the image to the scene
scene.add(sprite1);
scene.add(sprite2);
scene.add(sprite3);

var frame = 0;
var ohmnomSine = 0;
var todoCounter1 = -3;
var todoCounter2 = -2.1;
var todoCounter3 = -1.2;
function animate() {

    setTimeout( function() {

      requestAnimationFrame( animate );

    }, 1000 / 15 );

    if (activeSection == 2 || activeSection == 3) {
      if (Mesh && Mesh.rotation) {

        ohmnomSine = (Math.sin(frame) * .5 + .5);

        //var xRotation = ((mouseX) - (canvas.width / 2)) * .001;
        const randomList = [
          "Annoying customer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Changing requirements&nbsp;&nbsp;&nbsp;&nbsp;",
          "Working overtime&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Ambiguous specifications&nbsp;",
          "Team meeting&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Check email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Pull request&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Fix bugs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Delayed refactor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",

          "Role clarity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Quality feedback&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Results recognition&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Achievable deadlines&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "Non-financial benefits&nbsp;&nbsp;&nbsp;",
          "Economic compensation&nbsp;&nbsp;&nbsp;&nbsp;",
          "Group creativity&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        ];

        //techmanGroup.rotation.y = xRotation;
        Mesh2.rotation.x = Math.PI + ((Math.PI / 4) * ohmnomSine) /*- 3*Math.PI /5 ;*/;
        Mesh.rotation.x =  (-Math.PI / 4) * ohmnomSine /*- 3*Math.PI /5 ;*/;

        todoCounter1 += .1; //.1
        todoCounter2 += .1;
        todoCounter3 += .1;

        if (todoCounter1 > -.3 && ohmnomSine < .2) {
          todoCounter1 = -3;
          var tempRandom = Math.floor(Math.random() * 9)
          
          techmanLabelDiv1.innerHTML = randomList[tempRandom];
          techmanLabelDiv1.className = 'techman-label label-1 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red';
        }
        if (todoCounter2 > -.3 && ohmnomSine < .2) {
          todoCounter2 = -3;
          var tempRandom = Math.floor(Math.random() * 9)
          
          techmanLabelDiv2.innerHTML = randomList[tempRandom];
          techmanLabelDiv2.className = 'techman-label label-2 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red';
        }
        if (todoCounter3 > -.3 && ohmnomSine < .2) {
          todoCounter3 = -3;
          var tempRandom = Math.floor(Math.random() * 9)
          
          techmanLabelDiv3.innerHTML = randomList[tempRandom];
          techmanLabelDiv3.className = 'techman-label label-3 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red';
        }

        if (todoCounter1 > -1) {
          techmanLabelDiv1.className = 'techman-label label-1 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red fade-out';
        }
        if (todoCounter2 > -1) {
          techmanLabelDiv2.className = 'techman-label label-2 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red fade-out';
        }
        if (todoCounter3 > -1) {
          techmanLabelDiv3.className = 'techman-label label-3 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red fade-out';
        }

        sprite1.position.y = todoCounter1;
        sprite2.position.y = todoCounter2;
        sprite3.position.y = todoCounter3;

        frame += 5;
      }
      renderer.render(scene, camera);
      labelRenderer.render( scene, camera );
    }

    
}
animate();














//const moonDiv = document.createElement( 'div' );

//const techmanLabelDiv = document.querySelector('#three-techman-label');
const techmanLabelDiv1 = document.createElement( 'div' );
techmanLabelDiv1.className = 'techman-label label-1 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red';
techmanLabelDiv1.innerHTML = 'Annoying customer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
const techmanLabel1 = new CSS2DObject( techmanLabelDiv1 );
sprite1.add( techmanLabel1 );

const techmanLabelDiv2 = document.createElement( 'div' );
techmanLabelDiv2.className = 'techman-label label-2 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red';
techmanLabelDiv2.innerHTML = 'Changing requirements&nbsp;&nbsp;&nbsp;&nbsp;';
const techmanLabel2 = new CSS2DObject( techmanLabelDiv2 );
sprite2.add( techmanLabel2 );

const techmanLabelDiv3 = document.createElement( 'div' );
techmanLabelDiv3.className = 'techman-label label-3 font-ibm-plex-mono font-label font-uppercase font-semibold clr-red';
techmanLabelDiv3.innerHTML = 'Working overtime&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
const techmanLabel3 = new CSS2DObject( techmanLabelDiv3 );
sprite3.add( techmanLabel3 );

//


labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0';
//document.body.appendChild( labelRenderer.domElement );
document.getElementById( 'three-techman-label' ).appendChild(labelRenderer.domElement );




















}












main();