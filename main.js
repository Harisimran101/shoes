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
            renderer.setPixelRatio(window.devicePixelRatio / 1.2);
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;
     

            const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            scene.add( directionalLight );

            // const pmremGenerator = new THREE.PMREMGenerator( renderer );
            // scene.background = new THREE.Color( 0xeeeeee );
			// scene.environment = pmremGenerator.fromScene( new RoomEnvironment() ).texture;
			// scene.fog = new THREE.Fog( 0xeeeeee, 10, 50 );

            const linematerial = new THREE.LineBasicMaterial( {
                color: 0xffffff,
                linewidth: 0.01,
                linecap: 'round', //ignored by WebGLRenderer
                linejoin:  'round', //ignored by WebGLRenderer
                transparent: true
            } );
            const controls = new OrbitControls( camera, renderer.domElement );
            controls.enableDamping = true;
            controls.dampingFactor = 0.08;
            controls.maxDistance = 20;

            const geometry = new THREE.SphereGeometry(1.5,40,40);
            const material = new THREE.MeshPhysicalMaterial({
                 color: 'blue',
                 roughness: 0.1,
                 metalness:0.8,
                 clearcoat: 0.4,
                sheen: 1,
            })

            const sphere = new THREE.Mesh(geometry,material);
            scene.add(sphere);




            [[


            ]]
            



            
            const gui = new dat.GUI();
          
            
           let video = document.getElementById( 'video' );
				video.play();
				video.addEventListener( 'play', function () {

					this.currentTime = 3;

				} );

				const texture = new THREE.VideoTexture( video );
          

 const videomaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.85,
      metalness: 0.1,
 
 })               
     
const pmremGenerator = new THREE.PMREMGenerator( renderer );
new RGBELoader().load( 'Studio.hdr', function ( texture ) {

	texture.mapping = THREE.EquirectangularReflectionMapping;

	scene.environment = texture;


});


			camera.position.set(0,3,6);






            const loader = new GLTFLoader();
            loader.load('cubes.glb', function(gltf){
               model = gltf.scene;
            //    model.rotation.z = - Math.PI / 2;
              
            //   let screen = model.getObjectByName('screen');
             
            //   screen.material = videomaterial;
               scene.add(model);

            //   const glassmaterial = new THREE.MeshPhysicalMaterial({
            //      color: '#3D6475',
            //      roughness: 0.45,
            //      metalness: 0.75,
            //      Clearcoat: 1,
            //   });

            //   model.getObjectByName('Body').material = glassmaterial;
            //    anime({
            //       targets: model.rotation,
            //        keyframes: [
            //         {x: Math.PI / 1.2},
            //         {y: Math.PI },
                  
                 
            //        ],
            //        loop: true,
            //         direction: 'alternate',
            //        duration: 4000,
            //        easing: 'easeInOutBack'
            //    })
               
            //    anime({
            //       targets: model.scale,
            //        x: ['0', '1'],
            //        y: ['0', '1'],
            //        z: ['0', '1'],
            //       delay:500,
            //    })

            

              //  anime({
              //   targets: model.scale,
              //   x: [0, 1],
              //   y: [0, 1],
              //   z: [0, 1],
              //   delay: 200,
              //   easing: 'easeInOutExpo'
              // });

              // anime({
              //   targets: model.rotation,
              //   x: [model.rotation.x, Math.PI / 2.1 ],
              //   delay: 1000,
              //   easing: 'easeInOutExpo'
              // });

              // anime({
              //   targets: model.position,
              //   y: [model.position.y, model.position.y + 2],
              //   delay: 1800,
              //   easing: 'easeInOutExpo'
              // });


      
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
          
			renderer.render(scene,camera)
			};

			animate();

        }

        init();

