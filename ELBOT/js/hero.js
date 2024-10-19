import * as THREE from "./../three.js-master/build/three.module.js"
import {GLTFLoader} from './../three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { clone } from './../three.js-master/examples/jsm/utils/SkeletonUtils.js'

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true } );
  renderer.outputEncoding = THREE.sRGBEncoding;

	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	//const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  const camera = new THREE.OrthographicCamera( (window.innerWidth / 700), -(window.innerWidth / 700) , (window.innerHeight / 700), -(window.innerHeight / 700), 1, 20 );
	//camera.position.z = 2;

	const scene = new THREE.Scene();




  var elbotMesh, outlineMesh, outline2Mesh, irisMeshLeft, irisMeshRight;
  camera.position.z = 5;
  camera.position.y = 0;
  camera.rotation.z = (Math.PI);
  let elbotLoader = new GLTFLoader();
  let outlineLoader = new GLTFLoader();
  let outline2Loader = new GLTFLoader();
  var elbotMeshGroup = new THREE.Group();
  var irisMeshGroup = new THREE.Group();
  var outlineMeshGroup = new THREE.Group();
  var outline2MeshGroup = new THREE.Group();
  var pivotL = new THREE.Group();
  var pivotR = new THREE.Group();
  

  outline2Loader.load('./model/outline2_1.glb', (gltf) => {
    outline2Mesh = gltf.scene;
    outline2Mesh.scale.set(0.8,0.8,0.8);

    const lightGreenColor = new THREE.Color("rgb(179,251,229)").convertSRGBToLinear();

    var newMaterial = new THREE.MeshBasicMaterial({color: lightGreenColor, side: THREE.BackSide});
    outline2Mesh.traverse((o) => {
      if (o.isMesh) o.material = newMaterial;
    });

    outline2Mesh.position.z = -.4;

    outline2MeshGroup.add( outline2Mesh );
    scene.add( outline2MeshGroup );

    outline2MeshGroup.position.z = -6;
  });

  outlineLoader.load('./model/outline5.glb', (gltf) => {
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

    outlineMeshGroup.position.z = -3;
  });

  elbotLoader.load('./model/elbot5.glb', (gltf) => {
    elbotMesh = gltf.scene;
    elbotMesh.scale.set(0.8,0.8,0.8);

    elbotMesh.position.z = -.4;



    elbotMeshGroup.add( elbotMesh );
    scene.add( elbotMeshGroup );
  });

  elbotLoader.load('./model/iris2.glb', (gltf) => {
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
      outlineMeshGroup.scale.set(responsiveSize,responsiveSize,responsiveSize);
      outline2MeshGroup.scale.set(responsiveSize,responsiveSize,responsiveSize);
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

    var sinOffsetPositionY = (Math.sin(time * 3) / 80) + 0.00625;
    

    var sinIrisFlickerZ = Math.sin(time * 70) / 15;

    



    

    if ( mouseY > (window.innerHeight / 2)) {
      var sinIrisOffsetZ = -Math.atan( (mouseX - (window.innerWidth / 2)) / (mouseY - (window.innerHeight / 2)));
    } else {
      var sinIrisOffsetZ = -Math.atan( (mouseX - (window.innerWidth / 2)) / (mouseY - (window.innerHeight / 2))) + Math.PI;
    }

    if (isHeroTransitioning) {
      if (scrollTransitionStartFrame == -1) {
        scrollTransitionStartFrame = time;
        //console.log("step1  " + scrollTransitionStartFrame);
      } else if ((time - scrollTransitionStartFrame) < .7) {
        scrollTransitionRotationX = ((time - scrollTransitionStartFrame)*2) * ((time - scrollTransitionStartFrame)*2);
        //console.log("step2  " + (time - scrollTransitionStartFrame));
      } else {
        isHeroTransitioning = false;
        scrollTransitionRotationX = 0;
        //console.log("step3  " + scrollTransitionRotationX);
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
    

    irisMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetRotationY;
    irisMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetRotationX + scrollTransitionRotationX;
    pivotR.rotation.z = sinIrisOffsetZ + sinIrisFlickerZ;
    pivotL.rotation.z = sinIrisOffsetZ + sinIrisFlickerZ;
    irisMeshGroup.position.y = sinOffsetPositionY;

    








		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();
