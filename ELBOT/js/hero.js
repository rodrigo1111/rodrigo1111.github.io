import * as THREE from "./../three.js-master/build/three.module.js"
import {GLTFLoader} from './../three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { clone } from './../three.js-master/examples/jsm/utils/SkeletonUtils.js'


var sparkMesh;

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
  renderer.outputEncoding = THREE.sRGBEncoding;

	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	//const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  const camera = new THREE.OrthographicCamera( (window.innerWidth / 700), -(window.innerWidth / 700) , (window.innerHeight / 700), -(window.innerHeight / 700), 1, 320 );
	//camera.position.z = 2;

	const scene = new THREE.Scene();
  var clock = new THREE.Clock();



  var elbotMesh, outlineMesh, outline2Mesh, /*outline3Mesh,*/ irisMeshLeft, irisMeshRight, mixer;
  camera.position.z = 5;
  camera.position.y = 0;
  camera.rotation.z = (Math.PI);
  let elbotLoader = new GLTFLoader();
  let sparkLoader = new GLTFLoader();
  let outlineLoader = new GLTFLoader();
  let outline2Loader = new GLTFLoader();
  //let outline3Loader = new GLTFLoader();
  var elbotMeshGroup = new THREE.Group();
  var irisMeshGroup = new THREE.Group();
  var sparkMeshGroup = new THREE.Group();
  var outlineMeshGroup = new THREE.Group();
  var outline2MeshGroup = new THREE.Group();
  //var outline3MeshGroup = new THREE.Group();
  var pivotL = new THREE.Group();
  var pivotR = new THREE.Group();
  
/*
  outline3Loader.load('./model/outline_aqua2.glb', (gltf) => {
    outline3Mesh = gltf.scene;
    outline3Mesh.scale.set(0.8,0.8,0.8);

    const lightGreenColor = new THREE.Color("rgb(244,251,229)").convertSRGBToLinear();

    var newMaterial = new THREE.MeshBasicMaterial({color: lightGreenColor, side: THREE.BackSide});
    outline3Mesh.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });

    outline3Mesh.position.z = -.4;

    outline3MeshGroup.add( outline3Mesh );
    scene.add( outline3MeshGroup );

    outline3MeshGroup.position.z = -9;
  });
*/
  outline2Loader.load('./model/outline_aqua.glb', (gltf) => {
    outline2Mesh = gltf.scene;
    outline2Mesh.scale.set(0.8,0.8,0.8);

    const lightGreenColor = new THREE.Color("rgb(219,226,232)").convertSRGBToLinear();

    var newMaterial = new THREE.MeshBasicMaterial({color: lightGreenColor, side: THREE.BackSide});
    outline2Mesh.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });

    outline2Mesh.position.z = -.4;

    outline2MeshGroup.add( outline2Mesh );
    scene.add( outline2MeshGroup );

    outline2MeshGroup.position.z = -309;
  });

  outlineLoader.load('./model/outline_dark_blue.glb', (gltf) => {
    outlineMesh = gltf.scene;
    outlineMesh.scale.set(0.8,0.8,0.8);

    const darkBlueColor = new THREE.Color("rgb(28,40,120)").convertSRGBToLinear();

    var newMaterial = new THREE.MeshBasicMaterial({color: darkBlueColor, side: THREE.BackSide});
    outlineMesh.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });

    outlineMesh.position.z = -.4;

    outlineMeshGroup.add( outlineMesh );
    scene.add( outlineMeshGroup );

    outlineMeshGroup.position.z = -306;
  });

  elbotLoader.load('./model/elbot.glb', (gltf) => {
    elbotMesh = gltf.scene;
    elbotMesh.scale.set(0.8,0.8,0.8);

    elbotMesh.position.z = -.4;



    elbotMeshGroup.add( elbotMesh );
    scene.add( elbotMeshGroup );

    elbotMeshGroup.position.z = -303;
  });

  elbotLoader.load('./model/iris.glb', (gltf) => {
    //pivot.scale.set(0.8,0.8,0.8);
    
    pivotR.position.set((0.519736 * .8), (0.090083 * .8), (-.4 + (0.410389 * .8)));
    pivotL.position.set((-0.519736 * .8), (0.090083 * .8), (-.4 + (0.410389 * .8)));
    scene.add( irisMeshGroup );
    elbotMeshGroup.add(pivotL);
    elbotMeshGroup.add(pivotR);
    
    irisMeshLeft = gltf.scene;
    irisMeshLeft.scale.set(0.8,0.8,0.8);

    irisMeshRight = clone(irisMeshLeft);
    irisMeshRight.scale.set(0.8,0.8,0.8);
    

    //irisMesh.position.set((0.519736 * .8), (0.090083 * .8), (-.4 + (0.410389 * .8)));

    //irisMesh.rotation.z = Math.PI;

    //irisMeshGroup

    //irisMeshGroup.add( irisMesh );
    
    pivotL.add( irisMeshLeft );
    pivotR.add( irisMeshRight );

    elbotMeshGroup.position.z = -303;
  });

  sparkLoader.load('./model/spark2.glb', (gltf) => {
    sparkMesh = gltf.scene;
    sparkMesh.scale.set(0.8,0.8,0.8);

    const sparkColor = new THREE.Color("rgb(255,221,96)").convertSRGBToLinear();
    var newMaterial = new THREE.MeshBasicMaterial({color: sparkColor, side: THREE.BackSide, opacity: 0, transparent: true});

    sparkMesh.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });

    sparkMesh.position.z = -.4;



    sparkMeshGroup.add( sparkMesh );
    scene.add( sparkMeshGroup );

    mixer = new THREE.AnimationMixer( gltf.scene );
        
    gltf.animations.forEach( ( clip ) => {
      
        mixer.clipAction( clip ).play();
      
    });

    sparkMeshGroup.position.z = -300;
  });







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




  var mouseX = (window.innerWidth / 3 );
  var mouseY = (window.innerHeight / 3 );
  document.onmousemove = handleMouseMove;

  function handleMouseMove(event) {
    var e = window.event;
    mouseX = e.clientX;
    mouseY = e.clientY;
  };


  
  var scrollTransitionStartFrame = -1;
  var scrollTransitionRotationX = 0;

	function render( time ) {

		time *= 0.001;

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;

      var responsiveSize = window.innerWidth / 2000;
      if (responsiveSize > 1) {
        responsiveSize = 1;
      }

      elbotMeshGroup.scale.set(responsiveSize,responsiveSize,responsiveSize);
      irisMeshGroup.scale.set(responsiveSize,responsiveSize,responsiveSize);
      sparkMeshGroup.scale.set(responsiveSize,responsiveSize,responsiveSize);
      outlineMeshGroup.scale.set(responsiveSize,responsiveSize,responsiveSize);
      outline2MeshGroup.scale.set(responsiveSize,responsiveSize,responsiveSize);
      //outline3MeshGroup.scale.set(responsiveSize,responsiveSize,responsiveSize);
			//camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.left = window.innerWidth / 700;
      camera.right = -(window.innerWidth / 700)
      camera.top = (window.innerHeight / 700)
      camera.bottom = -(window.innerHeight / 700)
			camera.updateProjectionMatrix();

		}





    var sinOffsetRotationY = Math.sin(time * 4) / 80;
    var sinOffsetRotationX = Math.sin(time * 2) / 60;
    var sinOffsetRotationZ = Math.sin(time * 3) / 160;

    var sinOffsetRotationY = Math.sin(time * 1.5) / 40;
    var sinOffsetRotationX = Math.sin(time * 3) / 30;
    var sinOffsetRotationZ = Math.sin(time * 1.5) / 80;

    var sinOffsetPositionY = (Math.sin(time * 3) / 80) - 0.05;
    

    var sinIrisFlickerZ = Math.sin(time * 70) / 15;

    



    

    if ( mouseY > (window.innerHeight / 2)) {
      var sinIrisOffsetZ = -Math.atan( (mouseX - (window.innerWidth / 2)) / (mouseY - (window.innerHeight / 2)));
    } else {
      var sinIrisOffsetZ = -Math.atan( (mouseX - (window.innerWidth / 2)) / (mouseY - (window.innerHeight / 2))) + Math.PI;
    }

    if (isHeroTransitioning) {
      if (scrollTransitionStartFrame == -1) {
        scrollTransitionStartFrame = time;
      } else if ((time - scrollTransitionStartFrame) < 1.4) {
        if ((time - scrollTransitionStartFrame) > .1) {
          scrollTransitionRotationX = (((time - scrollTransitionStartFrame) - .1)*2) * (((time - scrollTransitionStartFrame) - .1)*2);
        }
      } else {
        isHeroTransitioning = false;
        scrollTransitionRotationX = 0;
      }
    } else {
      if (scrollTransitionStartFrame != -1) {
        scrollTransitionStartFrame = -1;
      }
    }
    
    elbotMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetRotationY;
    elbotMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetRotationX + scrollTransitionRotationX;
    elbotMeshGroup.rotation.z = sinOffsetRotationZ;
    elbotMeshGroup.position.y = sinOffsetPositionY;

    outlineMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetRotationY;
    outlineMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetRotationX + scrollTransitionRotationX;
    outlineMeshGroup.rotation.z = sinOffsetRotationZ;
    outlineMeshGroup.position.y = sinOffsetPositionY;
    
    outline2MeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetRotationY;
    outline2MeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetRotationX + scrollTransitionRotationX;
    outline2MeshGroup.rotation.z = sinOffsetRotationZ;
    outline2MeshGroup.position.y = sinOffsetPositionY;
/*
    outline3MeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetRotationY;
    outline3MeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetRotationX + scrollTransitionRotationX;
    outline3MeshGroup.rotation.z = sinOffsetRotationZ;
    outline3MeshGroup.position.y = sinOffsetPositionY;
    */

    irisMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetRotationY;
    irisMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetRotationX + scrollTransitionRotationX;
    pivotR.rotation.z = sinIrisOffsetZ + sinIrisFlickerZ;
    pivotL.rotation.z = sinIrisOffsetZ + sinIrisFlickerZ;
    irisMeshGroup.position.y = sinOffsetPositionY;

    sparkMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetRotationY;
    sparkMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetRotationX + scrollTransitionRotationX;
    sparkMeshGroup.rotation.z = sinOffsetRotationZ;
    sparkMeshGroup.position.y = sinOffsetPositionY;
    




    var delta = clock.getDelta();
  
  if ( mixer ) mixer.update( delta );



		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();


$(document).ready(function(){
  $(document).mousedown(function(){
    const sparkColor = new THREE.Color("rgb(255,221,96)").convertSRGBToLinear();
    var newMaterial = new THREE.MeshBasicMaterial({color: sparkColor, side: THREE.BackSide, opacity: 1, transparent: true});

    sparkMesh.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });
  }).mouseup(function(){
    const sparkColor = new THREE.Color("rgb(255,221,96)").convertSRGBToLinear();
    var newMaterial = new THREE.MeshBasicMaterial({color: sparkColor, side: THREE.BackSide, opacity: 0, transparent: true});

    sparkMesh.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });
  })
});