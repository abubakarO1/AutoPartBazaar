// "use client";

// import { useEffect } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

// export default function Garage() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       let carModel; // Variable to store the loaded car model

//       // Scene
//       const scene = new THREE.Scene();

//       // Camera (Zoomed-in by default)
//       const desiredZoom = 4.5; // Adjust zoom level
//       const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
//       camera.position.set(0, 2, desiredZoom); // Zoom in on the car

//       // Renderer
//       const renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.shadowMap.enabled = true;
//       renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//       renderer.outputEncoding = THREE.sRGBEncoding;
//       renderer.physicallyCorrectLights = true;
//       renderer.toneMapping = THREE.ACESFilmicToneMapping;
//       renderer.toneMappingExposure = 1.5;
//       document.getElementById("garage").appendChild(renderer.domElement);

//       // Lighting
//       const ambientLight = new THREE.AmbientLight(0xffffff, 4.0); // Brighter lighting
//       scene.add(ambientLight);

//       const directionalLight = new THREE.DirectionalLight(0xffffff, 6);
//       directionalLight.position.set(5, 10, 5);
//       directionalLight.castShadow = true;
//       scene.add(directionalLight);

//       // ✅ Load HDR Environment Map for Realistic Lighting
//       new RGBELoader().load("/textures/studio.hdr", function (texture) {
//         texture.mapping = THREE.EquirectangularReflectionMapping;
//         scene.environment = texture; // Set as environment
//         scene.background = texture; // Optional: Set as background
//       });

//       // Load Car Model
//       const loader = new GLTFLoader();
//       loader.load("/CarModels/civic.glb", (gltf) => {
//         carModel = gltf.scene;
//         carModel.scale.set(3, 3, 3);
//         carModel.position.set(0, -1.2, 0); // Ensure car is on the floor

//         // Fix Materials & Textures
//         carModel.traverse((child) => {
//           if (child.isMesh) {
//             child.castShadow = true;
//             child.receiveShadow = true;

//             if (child.material) {
//               child.material.side = THREE.DoubleSide;
//               child.material.needsUpdate = true;

//               if (child.material.map) {
//                 child.material.map.colorSpace = THREE.SRGBColorSpace;
//                 child.material.map.needsUpdate = true;
//               }

//               if (child.material.metalnessMap) {
//                 child.material.metalnessMap.colorSpace = THREE.SRGBColorSpace;
//                 child.material.metalnessMap.needsUpdate = true;
//               }

//               if (child.material.roughnessMap) {
//                 child.material.roughnessMap.colorSpace = THREE.SRGBColorSpace;
//                 child.material.roughnessMap.needsUpdate = true;
//               }

//               if (child.material.color) {
//                 child.material.color.convertSRGBToLinear();
//               }

//               // ✅ Ensure correct material properties
//               child.material.metalness = child.material.metalness || 0.5;
//               child.material.roughness = child.material.roughness || 0.5;
//             }
//           }
//         });

//         scene.add(carModel);
//       });

//       // Controls (Restrict Movement & Zoom)
//       const controls = new OrbitControls(camera, renderer.domElement);
//       controls.enableDamping = true;
//       controls.dampingFactor = 0.1;
//       controls.rotateSpeed = 0.8;
//       controls.enablePan = false; // Disable panning

//       // ❌ Prevent Up/Down movement
//       controls.minPolarAngle = Math.PI / 2;
//       controls.maxPolarAngle = Math.PI / 2;

//       // ❌ Disable Zooming via Scroll/Gestures
//       controls.enableZoom = false;
//       controls.minDistance = desiredZoom;
//       controls.maxDistance = desiredZoom;

//       // ✅ Keyboard Controls for Rotation
//       function handleKeyDown(event) {
//         if (!carModel) return; // Ensure the car is loaded before modifying it

//         const rotationSpeed = 0.05; // Rotation speed

//         if (event.key === "ArrowLeft") {
//           carModel.rotation.y += rotationSpeed; // Rotate left
//         } else if (event.key === "ArrowRight") {
//           carModel.rotation.y -= rotationSpeed; // Rotate right
//         }
//       }

//       window.addEventListener("keydown", handleKeyDown);

//       // Handle Window Resize
//       window.addEventListener("resize", () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//       });

//       // Render Loop
//       function animate() {
//         requestAnimationFrame(animate);
//         controls.update();
//         renderer.render(scene, camera);
//       }
//       animate();

//       // Cleanup event listener when component unmounts
//       return () => {
//         window.removeEventListener("keydown", handleKeyDown);
//       };
//     }
//   }, []);

//   return <div id="garage" style={{ width: "100vw", height: "100vh" }}></div>;
// }

"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Garage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let carModel;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff); // White Background ✅

      // Camera (Zoomed-in)
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
      camera.position.set(0, 2, 4.5);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding; // ✅ Ensure proper color encoding
      renderer.toneMapping = THREE.NoToneMapping; // ✅ Prevent color distortion
      document.getElementById("garage").appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.8); // ✅ Softer light
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 10, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // Load Car Model
      const loader = new GLTFLoader();
      loader.load("/CarModels/civic2.glb", (gltf) => {
        carModel = gltf.scene;
        carModel.scale.set(3, 3, 3);
        carModel.position.set(0, -1.2, 0);

        // ✅ Fix Material Colors & Textures
        carModel.traverse((child) => {
    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
            child.material.side = THREE.DoubleSide;
            child.material.needsUpdate = true;

            // Ensure textures are handled properly
            if (child.material.map) {
                child.material.map.encoding = THREE.sRGBEncoding;
                child.material.map.needsUpdate = true;
            }

            // Force PBR shading
            child.material.metalness = 0.8; // Adjust as needed
            child.material.roughness = 0.4; // Adjust for better reflections
        }
    }
});


        scene.add(carModel);
      });

      // Controls (Restrict Movement)
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.8;
      controls.enablePan = false;
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
      controls.enableZoom = false;

      // Keyboard Controls
      function handleKeyDown(event) {
        if (!carModel) return;

        const rotationSpeed = 0.05;
        if (event.key === "ArrowLeft") carModel.rotation.y += rotationSpeed;
        if (event.key === "ArrowRight") carModel.rotation.y -= rotationSpeed;
      }

      window.addEventListener("keydown", handleKeyDown);

      // Handle Resize
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // Animation Loop
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return <div id="garage" style={{ width: "100vw", height: "100vh" }}></div>;
}

