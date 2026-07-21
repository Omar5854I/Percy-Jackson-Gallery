import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const canvas = document.getElementById("c")
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)
const renderer = new THREE.WebGLRenderer({antialias: true, canvas})
renderer.outputColorSpace = THREE.SRGBColorSpace

const loader = new THREE.TextureLoader()
const texture1 = loader.load("./assets/PJO.jpg")
const texture2 = loader.load("./assets/AJO.jpg")

texture1.colorSpace = THREE.SRGBColorSpace
texture2.colorSpace = THREE.SRGBColorSpace


const geometry = new THREE.BoxGeometry(0.6,0.6,0.6)
const material = new THREE.MeshBasicMaterial({map:texture1})
const material2 = new THREE.MeshBasicMaterial({map:texture2})

const cube = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(geometry, material2)

const bgTexture = loader.load("./assets/PJOB.jpg")

scene.background = bgTexture

cube.position.set(1, 0, 0)
cube2.position.set(0, -1, 0)

camera.position.z = 2
camera.position.x = 0


let model
const gltfLoader = new GLTFLoader()


const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)

directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

gltfLoader.load("./assets/PJS.glb", function(gltf){
    model = gltf.scene
    model.scale.set(0.01, 0.01, 0.01)
    model.position.set(-1, 0, 0)
    scene.add(model, cube, cube2)
})


const controls  = new OrbitControls(camera, canvas)

controls.enableZoom = true

controls.enableDamping = true

function animate() {
    requestAnimationFrame(animate)

    controls.update()
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube2.rotation.x += 0.01
    cube2.rotation.y += 0.01

    if (model) {
    model.rotation.y += 0.01
    }

    renderer.render(scene, camera)
}

requestAnimationFrame(animate)
