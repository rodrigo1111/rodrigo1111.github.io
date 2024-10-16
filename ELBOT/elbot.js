import * as THREE from "./three.js-master/build/three.module.js"
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'

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




  let elbotMesh, outlineMesh, outline2Mesh, irisMesh;
  camera.position.z = 5;
  camera.position.y = 0;
  camera.rotation.z = (Math.PI);
  let elbotLoader = new GLTFLoader();
  let outlineLoader = new GLTFLoader();
  let outline2Loader = new GLTFLoader();
  const elbotMeshGroup = new THREE.Group();
  const irisMeshGroup = new THREE.Group();
  const outlineMeshGroup = new THREE.Group();
  const outline2MeshGroup = new THREE.Group();

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

  elbotLoader.load('./model/iris_c.glb', (gltf) => {
    irisMesh = gltf.scene;
    irisMesh.scale.set(0.8,0.8,0.8);

    irisMesh.position.set((0.519736 * .8), (0.090083 * .8), (-.4 + (0.410389 * .8)));

    irisMesh.rotation.z = Math.PI;


    irisMeshGroup.add( irisMesh );
    scene.add( irisMeshGroup );
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




	function render( time ) {

		time *= 0.001;

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;

      var temp = window.innerWidth / 2000;

      if (temp > 1) {
        temp = 1;
      }

      elbotMeshGroup.scale.set(temp,temp,temp);~
      irisMeshGroup.scale.set(temp,temp,temp);
      outlineMeshGroup.scale.set(temp,temp,temp);
      outline2MeshGroup.scale.set(temp,temp,temp);
			//camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.left = window.innerWidth / 700;
      camera.right = -(window.innerWidth / 700)
      camera.top = (window.innerHeight / 700)
      camera.bottom = -(window.innerHeight / 700)
			camera.updateProjectionMatrix();

		}





    var sinOffsetY = Math.sin(time * 4) / 80;
    var sinOffsetX = Math.sin(time * 2) / 60;
    var sinOffsetZ = Math.sin(time * 3) / 160;

    var sinOffsetY = Math.sin(time * 3) / 40;
    var sinOffsetX = Math.sin(time * 6) / 30;
    var sinOffsetZ = Math.sin(time * 3) / 80;

    var sinIrisOffsetZ = Math.sin(time * 10) / 10;

    elbotMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetY /*- 3*Math.PI /5 ;*/;
    elbotMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetX /*- 3*Math.PI /5 ;*/;
    elbotMeshGroup.rotation.z = sinOffsetZ;

    outlineMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetY /*- 3*Math.PI /5 ;*/;
    outlineMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetX /*- 3*Math.PI /5 ;*/;
    outlineMeshGroup.rotation.z = sinOffsetZ;
    
    outline2MeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetY /*- 3*Math.PI /5 ;*/;
    outline2MeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetX /*- 3*Math.PI /5 ;*/;
    outline2MeshGroup.rotation.z = sinOffsetZ;

    irisMeshGroup.rotation.y = Math.PI + ((Math.PI / 5) * ( -(mouseX - (window.innerWidth / 2)) * .002)) + sinOffsetY /*- 3*Math.PI /5 ;*/;
    irisMeshGroup.rotation.x = Math.PI + ((Math.PI / 5) * ( -(mouseY - (window.innerHeight / 2)) * .002)) + sinOffsetX /*- 3*Math.PI /5 ;*/;
    irisMeshGroup.rotation.z = sinOffsetZ;






    








		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();
