import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from  'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass  } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/SMAAPass.js';
import { BokehPass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/BokehPass.js';

function init(){

const webgl = document.querySelector('#webgl');
const width = webgl.offsetWidth;
const height = webgl.offsetHeight;
let model;
let shoes;

console.log(width,height)
            const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 60, width / height, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true,canvas: webgl});
			renderer.setSize( width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;
            

            // const light = new THREE.HemisphereLight( 'white', 'white', 1.2);
            // scene.add( light );

            // const pmremGenerator = new THREE.PMREMGenerator( renderer );
            // scene.background = new THREE.Color( 0xeeeeee );
			// scene.environment = pmremGenerator.fromScene( new RoomEnvironment() ).texture;
			// scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 );


            const controls = new OrbitControls( camera, renderer.domElement );
            controls.enableDamping = true;
            controls.dampingFactor = 0.08;
            controls.maxDistance = 20;
            controls.enablePan = false;


            const gui = new dat.GUI();

    
     
const pmremGenerator = new THREE.PMREMGenerator( renderer );
new RGBELoader().load( 'Studio.hdr', function ( texture ) {

	texture.mapping = THREE.EquirectangularReflectionMapping;

	scene.environment = texture;


});


			camera.position.set(0,3,6);



            const renderScene = new RenderPass( scene, camera );

           

                // const bokehPass = new BokehPass( scene, camera, {
				// 	focus: 0.8,
				// 	aperture: 0.025,
				// 	maxblur: 0.01,

				// 	width: window.innerWidth,
				// 	height: window.innerHeight,
				// } );

				const composer = new EffectComposer( renderer );
				composer.addPass( renderScene );
             
              //  composer.addPass(bokehPass)


            const loader = new GLTFLoader();
            loader.load('room.glb', function(gltf){
               model = gltf.scene;
               shoes = model.getObjectByName('Shoes');

               scene.add(model);
               
          anime({
            targets: shoes.rotation,
           z: [shoes.rotation.z, shoes.rotation.z + 0.4 ],
       
            duration: 1200,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutExpo',
       });

       anime({
            targets: shoes.position,
            y: [shoes.position.y, shoes.position.y + 0.8],
            delay: 310,
            duration: 900,
            loop: true,
            easing: 'easeInOutExpo',
            direction: 'alternate',
       })

    
       anime({
            targets: shoes.position,
            z: [shoes.position.z, '2'],
            delay: 300,
            duration: 900,
            loop: true,
            easing: 'easeInOutExpo',
            direction: 'alternate',
       })
    
            },
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            );
         const clock = new THREE.Clock();
         let oldtime = 0;

			function animate() {
				requestAnimationFrame( animate );
                const elapse = clock.getElapsedTime();
                const deltatime = elapse - oldtime;
                oldtime = deltatime;

              
                    
               controls.update();      
          
			composer.render();
			};

			animate();

        }

        init();