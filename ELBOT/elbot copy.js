import * as THREE from "./three.js-master/build/three.module.js"

import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
/*
import { CSS2DRenderer, CSS2DObject } from './three.js-master/examples/jsm/renderers/CSS2DRenderer.js'
import { EffectComposer } from './three.js-master/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from './three.js-master/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from './three.js-master/examples/jsm/postprocessing/ShaderPass.js'
import { OutlinePass } from './three.js-master/examples/jsm/postprocessing/OutlinePass.js';
*/



const canvas = document.querySelector('#c');
let composer;

const elbotMeshGroup = new THREE.Group();
const outlineMeshGroup = new THREE.Group();
const outline2MeshGroup = new THREE.Group();


//const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
const renderer = new THREE.WebGLRenderer({
   antialias: true,
   canvas, alpha: true,
});

//const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
const camera = new THREE.OrthographicCamera( (window.innerWidth / 700), -(window.innerWidth / 700) , (window.innerHeight / 700), -(window.innerHeight / 700), 1, 20 );

let elbotMesh, outlineMesh, outline2Mesh;

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.innerWidth / window.innerHeight);
  //renderer.setSize( window.innerWidth, window.innerHeight, false );
  camera.updateProjectionMatrix();
  
  //renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  //renderer.setSize(window.innerWidth, window.innerHeight);

  //const camera = new THREE.OrthographicCamera( (window.innerWidth / 700), -(window.innerWidth / 700) , (window.innerHeight / 700), -(window.innerHeight / 700), 1, 20 );

  console.log("running  " + window.innerWidth);
}, false);


function main() {

  camera.position.z = 5;
  camera.position.y = 0;
  camera.rotation.z = (Math.PI);


  const scene = new THREE.Scene();


  let elbotLoader = new GLTFLoader();
  let outlineLoader = new GLTFLoader();
  let outline2Loader = new GLTFLoader();


  outline2Loader.load('./model/outline2_1.glb', (gltf) => {
      outline2Mesh = gltf.scene;
      outline2Mesh.scale.set(0.8,0.8,0.8);
      /*scene.add(Mesh2);/**/

      const lightGreenColor = new THREE.Color("rgb(179,251,229)").convertSRGBToLinear();

      var newMaterial = new THREE.MeshBasicMaterial({color: lightGreenColor, side: THREE.BackSide});
      outline2Mesh.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
      });

      //var Material = new THREE.MeshStandardMaterial({color : 0x000000, side: THREE.BackSide});
      //outlineMesh.material = Material;
      //outlineMesh.scale.multiplyScalar(1.1);
      outline2Mesh.position.z = -.4;

      outline2MeshGroup.add( outline2Mesh );
      scene.add( outline2MeshGroup );

      outline2MeshGroup.position.z = -6;
  });

  outlineLoader.load('./model/outline5.glb', (gltf) => {
      outlineMesh = gltf.scene;
      outlineMesh.scale.set(0.8,0.8,0.8);
      /*scene.add(Mesh2);/**/

      const darkBlueColor = new THREE.Color("rgb(28,40,120)").convertSRGBToLinear();

      var newMaterial = new THREE.MeshBasicMaterial({color: darkBlueColor, side: THREE.BackSide});
      outlineMesh.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
      });

      //var Material = new THREE.MeshStandardMaterial({color : 0x000000, side: THREE.BackSide});
      //outlineMesh.material = Material;
      //outlineMesh.scale.multiplyScalar(1.1);
      outlineMesh.position.z = -.4;

      outlineMeshGroup.add( outlineMesh );
      scene.add( outlineMeshGroup );

      outlineMeshGroup.position.z = -3;
  });

  elbotLoader.load('./model/elbot5.glb', (gltf) => {
    elbotMesh = gltf.scene;
    elbotMesh.scale.set(0.8,0.8,0.8);
    /*scene.add(elbotMesh);/**/

    //var Material = new THREE.MeshStandardMaterial({color : 0x000000, side: THREE.BackSide});
    //elbotMesh.material = Material;

    elbotMesh.position.z = -.4;



    elbotMeshGroup.add( elbotMesh );
    scene.add( elbotMeshGroup );
});

/*
  composer = new EffectComposer( renderer );

  let renderPass = new RenderPass(scene, camera);
  composer.addPass( renderPass );

  outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
  outlinePass.renderToScreen = true;

  outlinePass.edgeStrength = 5;
  outlinePass.edgeGlow = 1;
  outlinePass.edgeThickness = 3.3;
  outlinePass.pulsePeriod = 0;
  outlinePass.visibleEdgeColor.set(0x0078ff);

  composer.addPass(renderPass);
  composer.addPass(outlinePass);


  outlinePass.edgeStrength = 200;
  outlinePass.visibleEdgeColor.set( "#000000" );
  */

  //outlinePass.Mesh2;


  var frame = 0;

  var mouseX = (window.innerWidth / 3 );
  var mouseY = (window.innerHeight / 3 );

  var oldMouseX = (window.innerWidth / 3 );
  var oldMouseY = (window.innerHeight / 3 );
  var isAnimating = false;
  var tempXX, tempYY, transitionCounter;

  document.onmousemove = handleMouseMove;

  function handleMouseMove(event) {
    var e = window.event;
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  renderer.render(scene, camera);

  /*
  window.addEventListener( 'resize', onWindowResize );




  function onWindowResize() {

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize( width, height );
      composer.setSize( width, height );

  }
  */

  function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const pixelRatio = window.devicePixelRatio;
		const width = Math.floor( canvas.clientWidth * pixelRatio );
		const height = Math.floor( canvas.clientHeight * pixelRatio );
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}


  function render(time) {

      //requestAnimationFrame( animate );

      renderer.outputEncoding = THREE.sRGBEncoding;



      if (elbotMesh ) {
        /*
        if ((mouseX !== oldMouseX || mouseY !== oldMouseY) && !isAnimating) {
          isAnimating = true;
          transitionCounter = 0;
          tempXX = (mouseX - oldMouseX) / 20;
          tempYY = (mouseY - oldMouseY) / 20;
        }
          */
        //var xRotation = ((mouseX) - (canvas.width / 2)) * .001;

        //techmanGroup.rotation.y = xRotation;

        //if (isAnimating && transitionCounter <= 20) {
          if ( resizeRendererToDisplaySize( renderer ) ) {

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
      
          }

          elbotMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) /*- 3*Math.PI /5 ;*/;
          elbotMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) /*- 3*Math.PI /5 ;*/;
  
          outlineMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) /*- 3*Math.PI /5 ;*/;
          outlineMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) /*- 3*Math.PI /5 ;*/;
          
          outline2MeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) /*- 3*Math.PI /5 ;*/;
          outline2MeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) /*- 3*Math.PI /5 ;*/;
/*
          transitionCounter++;

          if (transitionCounter == 20) {
            oldMouseX = mouseX;
            oldMouseY = mouseY;
            isAnimating = false;
          }
        }*/
        


        time += .3;

        //composer.render();
          
      }
      renderer.render( scene, camera );

		  requestAnimationFrame( render );
  }
  requestAnimationFrame( render );
}


main();