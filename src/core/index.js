import TWEEN from '@tweenjs/tween.js';

import initialise from './initialise';
import Tree from './meshes/tree';

/**
 * @class: Core
 * The Core class acts as the core of the threejs environment. It is in this
 * class that the scene, renderer, camera, controls and lights are all configured
 */
class Core {
    constructor() {
            this.stats = new Stats();
            this.scene = new THREE.Scene();
            this.renderer = initialise.configureRenderer();
            this.camera = initialise.configureCamera();
            // this.controls = this.configureControls();
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            // this.ui = new UI();

            this.init();
            this.animate(0);
    }



    /**
     * @function: onWindowResize
     * Is triggered by a window resize which will adjust the camera and
     * renderer size and ration for responsive rendering.
     */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * @function: init
     * Initialises the environment. All the pieces of the scene are put
     * together in this function.
     */
    init() {
        /** direct the renderer and UI elements to the container element */
        const container = document.getElementById('container');
        container.appendChild(this.renderer.domElement);
        container.appendChild(this.stats.dom);
        // this.camera.lookAt(this.controls.target);



        /** Set up lights to be used in the scene */

        // const shadowHelper = new THREE.CameraHelper(light.shadow.camera);
        // this.scene.add(shadowHelper)

        const light = initialise.configureLight();

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0a420d, 0.4 );
        hemiLight.position.y = 50;
        // var helper = new THREE.HemisphereLightHelper( hemiLight, 5, 0x000000);
        // this.scene.add( helper );

        const groundGeo = new THREE.PlaneBufferGeometry(100, 100, 1);
        const groundMat = new THREE.MeshLambertMaterial({ color: 0x0a420d })
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.name = 'ground';
        ground.rotation.x = - Math.PI * 0.5;
        ground.receiveShadow = true;

        const treeMesh = new Tree().mesh;
        treeMesh.name = `tree`
        treeMesh.position.set(0, 0, 0)
        this.scene.add(treeMesh);

        this.camera.lookAt(treeMesh.position);

        /** Add all lights, meshes and shaders to the scene */
        this.scene.add(light);
        this.scene.add(hemiLight);
        this.scene.add(ground);


        /** Add event listeners for screen resizing */
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    /**
     * @function: animate
     * @param {Number} timestamp: Used to measure the progress of time, a frame counter
     * Used to call upon the render function continuously so a new frame can be drawn
     * allowing for animation
     */
    animate(timestamp) {
        this.renderer.setAnimationLoop(this.animate.bind(this));
        this.update();
        this.render(timestamp);

        // this.camera.position.set(-275 + this.character.position.x, 275 + this.character.position.y,250 + this.character.position.z);
        // this.camera.lookAt(this.character.position);

        // this.controls.update();
    }

    update() {
        /** FPS counter */
        this.stats.update();

    }

    /**
     * @function: render
     * @param {Number} timestamp: Used to measure the progress of time, a frame counter
     * Draws an image to the screen including any pogressive changes. Uses the
     * threejs/WebGL renderer to draw an image
     */
    render(timestamp) {

        /** Render the scene */
        this.renderer.render(this.scene, this.camera);
    }
}

export default Core;
