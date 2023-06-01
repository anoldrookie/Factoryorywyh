import * as THREE from '../../node_modules/three/build/three.module.js'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from '../../node_modules/dat.gui/build/dat.gui.module.js'
import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from '../../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js'
// import gsap from '../gsap/dist/gsap.js'
// import {TweenMax} from '../../node_modules/gsap/all'
// console.log(TweenMax);
// import gsap from 'gsap'
const manager = new THREE.LoadingManager()
manager.onProgress = function (url, itemsLoaded, itemsTotal) {

    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

}

const groupGwdl = new THREE.Group()
const grouphotel = new THREE.Group()
const groupTree = new THREE.Group()
const groupGGP = new THREE.Group()
const groupBTR = new THREE.Group()
const group2 = new THREE.Group()
const group3 = new THREE.Group()
const group4 = new THREE.Group()
const group5 = new THREE.Group()
const group6 = new THREE.Group()
const groupBOX = new THREE.Group()
const groupSchool = new THREE.Group()
const groupUH1B = new THREE.Group()
const groupmig = new THREE.Group()
const loader = new FBXLoader()
const GLTFloader = new GLTFLoader()
const groupx = new THREE.Group()
const grouptext = new THREE.Group()

// 保存定时器的变量
let moving = null
let tag = true
let grundTexture = 'image/snow.jpg'
let BoxToptexture = ''
let BoxMidtexture = ''
let BoxButtontexture = ''
let top = null
let mid = null
let button = null
let lastClickedObject = null
const textureDiv = document.getElementById('texture')
const Starttext = document.getElementById('Starttext')
const closeButton = document.getElementById('close');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const glassButton = document.getElementById('map1');
const rockButton = document.getElementById('map2');
const snowButton = document.getElementById('map3');
const removeSchoolButton = document.getElementById('remove');
const addSchoolButton = document.getElementById('addSchool');
const helicopterMove = document.getElementById('helicopterMove');
const helicopterStop = document.getElementById('helicopterStop');
const boxTexture = document.getElementById('boxTexture');
const boxTopButton = document.getElementById('boxTop');
const boxMidButton = document.getElementById('boxMid');
const boxButtonButton = document.getElementById('boxButton');
const t1Button = document.getElementById('Boxtexture1');
const t2Button = document.getElementById('Boxtexture2');
const t3Button = document.getElementById('Boxtexture3');
const t4Button = document.getElementById('Boxtexture4');
const t5Button = document.getElementById('Boxtexture5');
const cloneButton = document.getElementById('cloneSchool');

//创建场景和相机
const Scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000)
// 创建一个面
const geometry = new THREE.PlaneGeometry(10000, 10000);
const geometryVideo = new THREE.PlaneGeometry(138, 60);
const video = document.getElementById('video');
const textureLoader = new THREE.TextureLoader()
const textureVido = new THREE.VideoTexture(video);
const texture = textureLoader.load(grundTexture);
const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
const materialVideo = new THREE.MeshBasicMaterial({ map: textureVido, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
const videoPlane = new THREE.Mesh(geometryVideo, materialVideo);
videoPlane.position.set(0, 154, -90)
plane.rotation.x = Math.PI / 2
Scene.add(plane);
// ----------------------------------------------
// 创建天空球几何体
const geometrySky = new THREE.SphereGeometry(15000, 32, 32);

// 创建天空球纹理材质
const textureSky = new THREE.TextureLoader().load('image/sky.jpg');
const materialSky = new THREE.MeshBasicMaterial({ map: textureSky, side: THREE.BackSide });

// 创建天空球对象
const skydome = new THREE.Mesh(geometrySky, materialSky);

// 将天空球添加到场景中
Scene.add(skydome);

//-------------------------------------------------------

// 设置场景的背景颜色为天空颜色
const skyColor = 0xffff;
Scene.background = new THREE.Color(skyColor);

// 设置相机位置并添加进场景
camera.position.set(900, 100, 200)
Scene.add(camera)

// 添加光源
const light = new THREE.AmbientLight(0xffffff, 1.1)
light.position.set(0, 100, 0)
Scene.add(light)
////////////////////////////////////////////FBX模型加载函数////////////////////////////////
let configBOX = {
    scale: {
        x: 0.5,
        y: 0.5,
        z: 0.5
    },
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    rotation: 2,
}
let configGGP = {
    scale: {
        x: 1,
        y: 1,
        z: 1
    },
    position: {
        x: 0,
        y: 0,
        z: -100
    },
    rotation: 2,
}
let configgwdl = {
    scale: {
        x: 0.05,
        y: 0.05,
        z: 0.05
    },
    position: {
        x: 500,
        y: 1,
        z: 5
    },
    // position.set(500, 1, 5)
    rotation: 1,
}
function LoadFBXmodel(url, group, config) {
    loader.load(url, function (fbx) {
        group.add(fbx)
        fbx.scale.set(config.scale.x, config.scale.y, config.scale.z)
        fbx.position.set(config.position.x, config.position.y, config.position.z)
        fbx.rotation.y = Math.PI / config.rotation
        fbx.frustumCulled = false
    },
        function (xhr) {
            if (url === 'model/BOX.FBX') {
                gsap.from(groupBOX.position, { x: 200, y: 200, z: 200, duration: 3, repeat: -1, yoyo: true })
                gsap.from(groupBOX.scale, { x: 5, y: 5, z: 5, duration: 3, repeat: -1, yoyo: true });
            }
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        })

}
LoadFBXmodel('model/guanggaopai.FBX', groupGGP, configGGP)
LoadFBXmodel('model/BOX.FBX', groupBOX, configBOX)
LoadFBXmodel('model/gwdl.FBX', groupGwdl, configgwdl)
////////////////////////////////////////////加载模型////////////////////////////////////////
// loader.load('model/guanggaopai.FBX', function (fbx) {
//     // model.add(fbx)
//     groupGGP.add(fbx)
//     fbx.scale.set(1 ,1, 1)
//     fbx.position.set(0, 0, -100)
//     fbx.rotation.y = Math.PI / 2
//     fbx.frustumCulled = false

// })
// loader.load('model/BOX.FBX', function (fbx) {
//     groupBOX.add(fbx)
//     fbx.scale.set(1, 1, 1)
//     fbx.rotation.y = Math.PI / 2
//     fbx.frustumCulled = false

// },
// )
groupGGP.add(videoPlane)
//道路(直)模型
for (let i = 0; i < 3; i++) {
    loader.load('model/road.FBX', function (fbx) {
        // model.add(fbx)
        group3.add(fbx)
        fbx.scale.set(0.05, 0.05, 0.05)
        fbx.position.x += 100 * i
        fbx.position.y = 0.5
        fbx.frustumCulled = false

    })
}
for (let i = 0; i < 3; i++) {
    loader.load('model/road.FBX', function (fbx) {
        // model.add(fbx)
        group4.add(fbx)
        fbx.scale.set(0.05, 0.05, 0.05)
        fbx.position.x += 100 * i
        fbx.position.y = 0.5
        fbx.frustumCulled = false

    })
}
group4.rotation.y = Math.PI / 2
//道路(弯)模型

loader.load('model/roadU.FBX', function (fbx) {
    // model.add(fbx)
    group2.add(fbx)
    fbx.scale.set(0.05, 0.05, 0.05)
    fbx.position.x = -50
    fbx.position.z = 27
    fbx.position.y = 0.5
    fbx.rotation.y = Math.PI / 2
    fbx.frustumCulled = false

})
// 汽车模型
GLTFloader.load('model/car.gltf', function (gltf) {
    group6.add(gltf.scene)
    gltf.scene.scale.set(4, 4, 4)
})
//-------------------------------------------------------MIG23---------------------------------//
// GLTFloader.load('model/mig23.glb', function (glb) {
//     // model.add(fbx)
//     groupmig.add(glb.scene)
//     glb.scene.scale.set(4, 4, 4)
// })
// 树木模型
for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 7; i++) {
        GLTFloader.load('model/tree.gltf', function (gltf) {
            // model.add(fbx)

            groupTree.add(gltf.scene)
            gltf.scene.scale.set(4, 4, 4)
            gltf.scene.position.x += 50 * i
            gltf.scene.position.z += 55 * j
        })

    }
}

GLTFloader.load('model/school.gltf', function (gltf) {
    groupSchool.add(gltf.scene)
    gltf.scene.scale.set(9, 9, 9)
    gltf.scene.position.set(-500, 0, 0)
    gltf.scene.frustumCulled = false

})


// loader.load('model/gwdl.FBX', function (fbx) {
//     groupGwdl.add(fbx)
//     fbx.scale.set(0.05, 0.05, 0.05)
//     fbx.position.set(500, 1, 5)
//     fbx.rotation.y = Math.PI
//     fbx.frustumCulled = false
// })
// groupGwdl.rotation.y = Math.PI
loader.load('model/hotel.FBX', function (fbx) {
    // model.add(fbx)
    grouphotel.add(fbx)
    fbx.scale.set(0.05, 0.05, 0.05)
    fbx.position.set(0, -0.1, 500)
    fbx.frustumCulled = false

})

////////////////////////////////////////////直升飞机/////////////////////////////////////////
loader.load('model/UH1B.FBX', function (fbx) {
    // model.add(fbx)
    const model = fbx;
    groupUH1B.add(fbx)
    fbx.scale.set(0.2, 0.2, 0.2)
    fbx.position.set(0, 100, 0)
    fbx.frustumCulled = false
    if (fbx.animations && fbx.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model);

        // 遍历动画数组，创建动画剪辑和动画动作
        fbx.animations.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
        function animate() {
            requestAnimationFrame(animate);
            // 计算deltaTime
            const currentTime = performance.now();
            const deltaTime = (currentTime - prevTime) / 1000; // 转换为秒
            prevTime = currentTime;
            mixer.update(deltaTime); // 更新动画         
            // 执行其他渲染逻辑
            rander.render(Scene, camera);
        }
        let prevTime = performance.now();
        animate();
    }
})
///////////////////////////////////////////////////////////////////////////////////////////////
const speed = {
    speed: 10
}
let angle = 0
const gui = new dat.GUI()
const controller = gui.add(speed, 'speed').name('汽车速度').min(1).max(100);

controller.onChange((value) => {
    // SpeedValue.speed = parseInt(value); // 更新 speed.speed 的值
    IsCarMoving(true, parseInt(100 - value))
})

// 创建雾气
const fog = {
    isFog: false,
    color: 0x000000,
    near: 1,
    far: 1000
};
gui.add(fog, 'isFog').name('是否开启雾气').onChange(function (value) {
    if (value) {
        Scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
    } else {
        Scene.fog = null;
    }
});

gui.addColor(fog, 'color').name('雾的颜色').onChange(function (value) {
    Scene.fog.color.set(value);
});

gui.add(fog, 'near', 1, 10).name('雾的最小距离').onChange(function (value) {
    Scene.fog.near = value;
});

gui.add(fog, 'far', 1000, 10000).name('雾的最大距离').onChange(function (value) {
    Scene.fog.far = value;
});




// 加载场景
const rander = new THREE.WebGLRenderer()
rander.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(rander.domElement)
// document.getElementById('Ptext').appendChild(rander.domElement);
// 创建轨道控制器
const controls = new OrbitControls(camera, rander.domElement)
// controls.enableDamping = true



// 添加坐标系
const axeHelper = new THREE.AxesHelper(1000)
Scene.add(axeHelper)

// 监听画面变化
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    rander.setSize(window.innerWidth, window.innerHeight)
})

//双击进入全屏
// window.addEventListener('dblclick', () => {
//     rander.domElement.requestFullscreen()
// })

// 声明组对象

// 广告牌警示标签
const canvastoAlert = document.createElement('canvas');
const contexttoAlert = canvastoAlert.getContext('2d');
canvastoAlert.width = 3000
canvastoAlert.height = 3000
canvastoAlert.textAlign = 'center'
canvastoAlert.textBaseline = 'middle'
contexttoAlert.font = 'Bold 100px Arial'
contexttoAlert.strokeStyle = '#ff0000'
contexttoAlert.lineWidth = 100
contexttoAlert.fillStyle = 'rgba(125, 205, 25, 1)'
contexttoAlert.fillText('不要在上班时间点广告牌,不然老板会以为你在摸鱼', 250, 450)
const textureAlert = new THREE.CanvasTexture(canvastoAlert)
const materialAlert = new THREE.SpriteMaterial({ map: textureAlert });
const sprite = new THREE.Sprite(materialAlert);
sprite.position.set(0, 0, -120)
sprite.scale.set(1000, 1000, 1000)
Scene.add(sprite)
// 给模型上标签------------------------------------------------
const canvastoStart = document.createElement('canvas');
const contexttoStart = canvastoStart.getContext('2d');
canvastoStart.width = 1200
canvastoStart.height = 200
canvastoStart.textAlign = 'center'
canvastoStart.textBaseline = 'middle'
contexttoStart.font = 'Bold 100px Arial'
contexttoStart.strokeStyle = '#ff0000'
contexttoStart.lineWidth = 100
contexttoStart.fillStyle = 'rgba(125, 205, 25, 1)'
contexttoStart.fillText('你可以点击我', 250, 130)
const textureTagtoStart = new THREE.CanvasTexture(canvastoStart)
textureTagtoStart.repeat.x = -1
textureTagtoStart.offset.x = 1


// 创建标签
const materialTexttoStart = new THREE.MeshBasicMaterial({ map: textureTagtoStart, side: THREE.DoubleSide });
const geometryTexttoStart = new THREE.PlaneGeometry(150, 25)
const textTagtoStart = new THREE.Mesh(geometryTexttoStart, materialTexttoStart)
textTagtoStart.position.set(500, 150, 0)
// textTagtoStart.rotation.y = Math.PI*1.5
//=======================================================================
// 在每一帧渲染前，将标签的面法线朝向摄像机。
function updateLabelOrientationofStart() {
    const vector = new THREE.Vector3();
    vector.subVectors(camera.position, textTagtoStart.position).normalize();
    textTagtoStart.lookAt(textTagtoStart.position.clone().sub(vector));
}
// 将标签添加到场景中
Scene.add(textTagtoStart);

////////////////////////////////////////////////////////////////////////////////
// 给模型上标签------------------------------------------------
const canvastoStop = document.createElement('canvas');
const contexttoStop = canvastoStop.getContext('2d');
canvastoStop.width = 1200
canvastoStop.height = 200
canvastoStop.textAlign = 'center'
canvastoStop.textBaseline = 'middle'
contexttoStop.font = 'Bold 100px Arial';
contexttoStop.strokeStyle = '#ff0000'
contexttoStop.lineWidth = 100
contexttoStop.fillStyle = 'rgba(125, 205, 25, 1)';
contexttoStop.fillText('你也可以点击我', 250, 130);
const textureTagtoStop = new THREE.CanvasTexture(canvastoStop);
textureTagtoStop.repeat.x = -1;
textureTagtoStop.offset.x = 1;


// 创建标签的材质和精灵对象
const materialTexttoStop = new THREE.MeshBasicMaterial({ map: textureTagtoStop, side: THREE.DoubleSide });
const geometryTexttoStop = new THREE.PlaneGeometry(150, 25);
const textTagtoStop = new THREE.Mesh(geometryTexttoStop, materialTexttoStop);
textTagtoStop.position.set(0, 250, 450)
// textTagtoStart.rotation.y = Math.PI*1.5
//=======================================================================
// 在每一帧渲染前，将标签的面法线朝向摄像机。
function updateLabelOrientationofStop() {
    const vector = new THREE.Vector3();
    vector.subVectors(camera.position, textTagtoStop.position).normalize();
    textTagtoStop.lookAt(textTagtoStop.position.clone().sub(vector));
}
// 将标签添加到场景中
Scene.add(textTagtoStop);
///////////////////////////////////////////////////////////////////////////////

//加载模型
grouphotel.name = 'hotel'
groupGwdl.name = 'gwdl'
grouptext.name = 'text'
groupSchool.name = 'school'
group4.position.set(-78, 2, 350)
group3.position.set(80, 2, 0)
group2.position.set(0, 2, 0)
groupTree.position.set(0, 0, -20)
group6.position.set(340, 2.5, 0)
groupBTR.position.set(240, 0.5, -50)
group5.position.set(0, 0.5, 5)
groupmig.position.set(0, 200, 5)
groupBOX.position.set(200, 0, 200)
groupmig.scale.set(2, 2, 2)
group5.add(group2, group3, group4)
grouptext.add(textTagtoStart, textTagtoStop)
// groupx.add( grouptext)
const school = groupx.getObjectByName("hotel");
// group6.rotation.y=Math.PI
Scene.add(grouphotel, groupGwdl, groupSchool, grouptext, groupx, groupBOX, groupmig, group5, group6, groupTree, groupGGP, groupUH1B)

// group6.rotation.y+=Math.PI/4

// 烟雾效果



// 汽车运动动画
function startCarAnimation() {
    if (group6.position.x !== 0 && group6.position.x >= 0 && tag) {
        group6.position.x -= 1
    }
    else if (group6.position.x <= -100 || group6.position.x > -1 && tag) {
        group6.position.x -= 1
        group6.position.z += 0.1
        group6.rotation.y = Math.PI / 20

    }
    else if (group6.position.x <= -100 || group6.position.x > -10 && tag) {
        group6.position.x -= 0.9
        group6.position.z += 0.2
        group6.rotation.y = Math.PI * (2 / 20)

    }
    else if (group6.position.x <= -100 || group6.position.x > -20 && tag) {
        group6.position.x -= 0.8
        group6.position.z += 0.3
        group6.rotation.y = Math.PI * (3 / 20)

    }
    else if (group6.position.x <= -100 || group6.position.x > -30 && tag) {
        group6.position.x -= 0.7
        group6.position.z += 0.4
        group6.rotation.y = Math.PI * (4 / 20)

    }
    else if (group6.position.x <= -100 || group6.position.x > -40 && tag) {
        group6.position.x -= 0.6
        group6.position.z += 0.5
        group6.rotation.y = Math.PI * (5 / 20)

    }
    else if (group6.position.x <= -100 || group6.position.x > -50 && tag) {
        group6.position.x -= 0.55
        group6.position.z += 0.6
        group6.rotation.y = Math.PI * (6 / 20)

    }
    else if (group6.position.x <= -100 || group6.position.x > -60 && tag) {
        group6.position.x -= 0.45
        group6.position.z += 0.7
        group6.rotation.y = Math.PI * (7 / 20)

    }
    else if (group6.position.x <= -100 || group6.position.x > -70 && tag) {
        group6.position.x -= 0.45
        group6.position.z += 0.85
        group6.rotation.y = Math.PI * (8 / 20)

    }
    else if (group6.position.x <= -100 || group6.position.x > -80 && tag) {
        group6.position.x -= 0.35
        group6.position.z += 0.9
        group6.rotation.y = Math.PI * (9 / 20)

    }
    else if (group6.position.x <= -80 && group6.position.x >= -100 && group6.position.z <= 420 && tag) {
        if (tag) {
            group6.rotation.y = Math.PI / 2
            group6.position.z += 1
        }

    }
    // 反向开始
    if (Math.ceil(group6.position.z) == 420 && tag) {
        tag = false
        group6.position.z += 1
    }
    if (!tag) {
        // console.log('--------->132143',group6.position.z)
        if (group6.position.z >= 100 && group6.position.z <= 421) {
            if (Math.ceil(group6.position.z) == 101) {
                group6.rotation.y = Math.PI * (29 / 20)
                group6.position.z -= 1
            }
            group6.rotation.y = Math.PI * 1.5
            group6.position.z -= 1
        } else if (Math.ceil(group6.position.z) <= 100 && Math.ceil(group6.position.z) >= 80) {
            group6.rotation.y = Math.PI * (28 / 20)
            group6.position.x += 0.15
            group6.position.z -= 0.9
        } else if (Math.ceil(group6.position.z) <= 80 && Math.ceil(group6.position.z) >= 70) {
            group6.rotation.y = Math.PI * (27 / 20)
            group6.position.x += 0.25
            group6.position.z -= 0.85
        } else if (Math.ceil(group6.position.z) <= 70 && Math.ceil(group6.position.z) >= 60) {
            group6.rotation.y = Math.PI * (26 / 20)
            group6.position.x += 0.35
            group6.position.z -= 0.7
        } else if (Math.ceil(group6.position.z) <= 60 && Math.ceil(group6.position.z) >= 50) {
            group6.rotation.y = Math.PI * (25 / 20)
            group6.position.x += 0.45
            group6.position.z -= 0.65
        } else if (Math.ceil(group6.position.z) <= 50 && Math.ceil(group6.position.z) >= 40) {
            group6.rotation.y = Math.PI * (24 / 20)
            group6.position.x += 0.5
            group6.position.z -= 0.55
        } else if (Math.ceil(group6.position.z) <= 40 && Math.ceil(group6.position.z) >= 30) {
            group6.rotation.y = Math.PI * (23 / 20)
            group6.position.x += 0.7
            group6.position.z -= 0.45
        } else if (Math.ceil(group6.position.z) <= 30 && Math.ceil(group6.position.z) >= 20) {
            group6.rotation.y = Math.PI * (22 / 20)
            group6.position.x += 0.8
            group6.position.z -= 0.45
        } else if (Math.ceil(group6.position.z) <= 20 && Math.ceil(group6.position.z) >= 10) {
            group6.rotation.y = Math.PI * (21 / 20)
            group6.position.x += 0.9
            group6.position.z -= 0.35
        } else if (Math.ceil(group6.position.z) <= 10 && group6.position.z >= 0 && group6.position.x > 0 && group6.position.x <= 340) {
            group6.position.x += 1
            group6.rotation.y = Math.PI * (20 / 20)
            if (Math.ceil(group6.position.x) == 340) {
                group6.rotation.y = 0
                tag = true
            }
        }
    }
    // requestAnimationFrame(startCarAnimation)
}


function onChangeTexture() {
    glassButton.addEventListener('click', function () {
        grundTexture = 'image/desert.jpg';
        updateTexture();
    });
    rockButton.addEventListener('click', function () {
        grundTexture = 'image/rock.jpg';
        updateTexture();
    });
    snowButton.addEventListener('click', function () {
        grundTexture = 'image/snow.jpg';
        updateTexture();
    });
    t1Button.addEventListener('click', function () {
        BoxToptexture = 'model/t1.jpg';
        BoxMidtexture = 'model/t1.jpg';
        BoxButtontexture = 'model/t1.jpg';
        updateTexture();
    });
    t2Button.addEventListener('click', function () {
        BoxToptexture = 'model/t2.jpg';
        BoxMidtexture = 'model/t2.jpg';
        BoxButtontexture = 'model/t2.jpg';
        updateTexture();
    });
    t3Button.addEventListener('click', function () {
        BoxToptexture = 'model/t3.jpg';
        BoxMidtexture = 'model/t3.jpg';
        BoxButtontexture = 'model/t3.jpg';
        updateTexture();
    });
    t4Button.addEventListener('click', function () {
        BoxToptexture = 'model/t4.jpg';
        BoxMidtexture = 'model/t4.jpg';
        BoxButtontexture = 'model/t4.jpg';
        updateTexture();
    });
    t5Button.addEventListener('click', function () {
        BoxToptexture = 'model/t5.jpg';
        BoxMidtexture = 'model/t5.jpg';
        BoxButtontexture = 'model/t5.jpg';
        updateTexture();
    });
}
function updateTexture() {
    if (grundTexture) {
        const texture = textureLoader.load(grundTexture);
        material.map = texture;
        material.needsUpdate = true;
    }
    if (BoxToptexture, top) {
        console.log('tttttttttttttttttttttttttttttt', top);
        const textureTop = textureLoader.load(BoxToptexture);
        groupBOX.children[0].children[1].material.map = textureTop
        groupBOX.children[0].children[1].material.needsUpdate = true;
    }
    if (BoxMidtexture, mid) {
        const textureMid = textureLoader.load(BoxMidtexture);
        groupBOX.children[0].children[2].material.map = textureMid
        groupBOX.children[0].children[2].material.needsUpdate = true;
    }
    if (BoxButtontexture, button) {
        const textureButton = textureLoader.load(BoxButtontexture);
        groupBOX.children[0].children[0].material.map = textureButton
        groupBOX.children[0].children[0].material.needsUpdate = true;
    }
}
onChangeTexture();

function free() {
    window.removeEventListener('click', MouseClick)
}

let v = true
let a = false
// 显示文字

function BoxTopButton(){
    top = true
    mid = false
    button = false
    if (!a) {
        boxTexture.style.display = 'block'
        a = true
    }
    else {
        boxTexture.style.display = 'none'
        a = false
    }
}
window.BoxTopButton = BoxTopButton
function BoxMidButton(){
    mid = true
    top = false
    button = false
    if (!a) {
        boxTexture.style.display = 'block'
        a = true
    }
    else {
        boxTexture.style.display = 'none'
        a = false
    }
}
window.BoxMidButton = BoxMidButton
function BoxBottonButton(){
    button = true
    top = false
    mid = false
    if (!a) {
        boxTexture.style.display = 'block'
        a = true
    }
    else {
        boxTexture.style.display = 'none'
        a = false
    }
}
window.BoxBottonButton = BoxBottonButton
function textShowStart(v, clickPosition) {
    let cloneModel = groupSchool.clone()
    if (v) {
        Starttext.style.display = 'block'
        Starttext.style.left = clickPosition.x + 'px';
        Starttext.style.top = clickPosition.y - 80 + 'px';
        Starttext.addEventListener('click', function () {
            free()
        })
        startButton.addEventListener('click', function () {
            IsCarMoving(true, 10)
        })
        stopButton.addEventListener('click', function () {
            IsCarMoving(false, 10)
        })
        closeButton.addEventListener('click', function () {
            Starttext.style.display = 'none'
            textureDiv.style.display = 'none'
        })
        cloneButton.addEventListener('click', function () {
            // let cloneModel = groupSchool.clone()

            cloneModel.position.set(-200, 0, -200)
            Scene.add(cloneModel)
        })
        removeSchoolButton.addEventListener('click', function () {
            Scene.remove(groupSchool);
            Scene.remove(cloneModel);
            // Starttext.style.display = 'none'
        })
        addSchoolButton.addEventListener('click', function () {
            Scene.add(groupSchool);
        })
        // boxTopButton.addEventListener('click', function () {
            
        // })
        // boxMidButton.addEventListener('click', function () {

        // })
        // boxButtonButton.addEventListener('click', function () {
           
        // })
        helicopterMove.addEventListener('click', function () {

            window.addEventListener('click', OnMouseClick);
        })
        helicopterStop.addEventListener('click', function () {

            window.removeEventListener('click', OnMouseClick)
        })

        // textureButton.addEventListener('click', function () {
        //     if (!a) {
        //         textureDiv.style.display = 'block'
        //         a = true
        //     }
        //     else {
        //         textureDiv.style.display = 'none'
        //         a = false
        //     }
        // })
    }
    else if (!v) {
        Starttext.style.display = 'none'
    }
}
function textShowStop(v, clickPosition) {

    const Stoptext = document.getElementById('Stoptext')
    const closeButton = document.getElementById('close1');
    const stopButton = document.getElementById('stop');
    if (v) {
        Stoptext.style.display = 'block'
        Stoptext.style.left = clickPosition.x + 'px';
        Stoptext.style.top = clickPosition.y - 80 + 'px';
        stopButton.addEventListener('click', function () {
            IsCarMoving(false, 10)
        })
        closeButton.addEventListener('click', function () {
            Stoptext.style.display = 'none'
        })
    }
    // else if (!v) {
    //     Stoptext.style.display = 'none'
    // }
}
const IsCarMoving = (val, speed) => {
    if (val) {
        clearInterval(moving);
        moving = setInterval(startCarAnimation, speed)
    } else {
        clearInterval(moving);
    }
}


let hotel = false
let Gwdl = false
let School = false

//全局事件监听函数
window.addEventListener('click', function () {
    window.addEventListener('click', MouseClick);
})
//--------------------------------------------- 添加绿框-----------------------------------------//
function addGreenOutline(object) {
    if (lastClickedObject) {
        removeGreenOutline();
    }
    lastClickedObject = object;
    object.forEach((item, index) => {
        if (item.geometry) {
            const edgesGeometry = new THREE.EdgesGeometry(item.geometry);
            const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
            const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

            item.add(edges);
        }
    })
}
//---------------------------------------------------------------------------------------------//
// 定义一个用于移除绿色线框的函数
function removeGreenOutline() {
    lastClickedObject.forEach((item, index) => {
        if (item.geometry) {
            // 删除线框对象
            item.remove(item.children[item.children.length - 1]);
        }
    });
}

// 鼠标点击显示文字
window.addEventListener('click', MouseClick);
function MouseClick(event) {
    // 将鼠标点击的屏幕坐标转换为场景中的标准化设备坐标（NDC）
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 创建一个射线投射器
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // 计算射线和建筑模型的交点
    const intersectsHotel = raycaster.intersectObject(grouphotel, true);
    const intersectsGwdl = raycaster.intersectObject(groupGwdl, true);
    const intersectsSchool = raycaster.intersectObject(groupSchool, true);
    const intersectsText = raycaster.intersectObject(grouptext, true);

    if (intersectsHotel.length > 0) {
        const child = grouphotel.children[0].children;
        // console.log(child)
        addGreenOutline(child);
        // 获取点击的屏幕坐标位置
        const clickPosition = {
            x: event.clientX,
            y: event.clientY
        };
        // 更新文字位置
        textShowStart(v, clickPosition);
    }
    else if (intersectsGwdl.length > 0) {
        const child = groupGwdl.children[0].children;
        // console.log(child)
        addGreenOutline(child);
        // 获取点击的屏幕坐标位置
        const clickPosition = {
            x: event.clientX,
            y: event.clientY
        };
        // 更新文字位置
        textShowStart(v, clickPosition);
    }
    else if (intersectsSchool.length > 0) {
        const child = groupSchool.children[0].children[0].children
        // console.log(child)
        addGreenOutline(child);
        // 获取点击的屏幕坐标位置
        const clickPosition = {
            x: event.clientX,
            y: event.clientY
        };
        // 更新文字位置
        textShowStart(v, clickPosition);
    }
    else if (intersectsText.length > 0) {
        // const child = groupSchool.children[0].children[0].children
        // console.log(child)
        // addGreenOutline(child);
        // 获取点击的屏幕坐标位置
        const clickPosition = {
            x: event.clientX,
            y: event.clientY
        };
        // 更新文字位置
        textShowStart(v, clickPosition);
    }
    else {
        if (lastClickedObject) {
            removeGreenOutline();
            lastClickedObject = null;
        }
        textShowStart(!v)
    }
}
/////////////////////////停止牌///////////////////////////////
// window.addEventListener('click', mouseclick);
// function mouseclick(event) {
//     // 将鼠标点击的屏幕坐标转换为场景中的标准化设备坐标（NDC）
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     // 创建一个射线投射器
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera);

//     // 计算射线和建筑模型的交点
//     const intersectsText = raycaster.intersectObject(textTagtoStop, true);
//     if (intersectsText.length > 0) {
//         // 获取点击的屏幕坐标位置
//         const clickPosition = {
//             x: event.clientX,
//             y: event.clientY
//         };
//         // 更新文字位置
//         textShowStop(v, clickPosition);
//     }
//     else {
//         textShowStop(!v)
//     }
// }



// 广告牌点击跳转网页
window.addEventListener('click', mouseClick);
function mouseClick(event) {
    // 将鼠标点击的屏幕坐标转换为场景中的标准化设备坐标（NDC）
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 创建一个射线投射器
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // 计算射线和建筑模型的交点
    const intersectsText = raycaster.intersectObject(videoPlane, true);
    if (intersectsText.length > 0) {
        window.open('https://www.bilibili.com', '_blank');
    }

}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//========================================== 飞机移动========================================//
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// function planeMove() {

//         window.addEventListener('click', OnMouseClick);

// }

function OnMouseClick(event) {
    // 将鼠标点击的屏幕坐标转换为场景中的标准化设备坐标（NDC）
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 使用射线投射器检测鼠标点击位置是否与飞机模型相交
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(plane, true);

    if (intersects.length > 0) {
        let Timer = 100;
        let CurrentX = groupUH1B.position.x
        let CurrentY = groupUH1B.position.z
        let offsetX = intersects[0].point.x - CurrentX
        let offsetY = intersects[0].point.z - CurrentY

        let ToXByOriginPosition = intersects[0].point.x - 0
        let ToYByOriginPosition = intersects[0].point.z - 0


        angle = Math.atan(offsetX / offsetY) * (180 / Math.PI)
        angle = (angle / 180) * Math.PI

        if (groupUH1B.position.x == 0) {
            groupUH1B.rotation.y = angle
        } else {

            angle = (Math.PI / 2) - angle + ((Math.atan(offsetY / offsetX) * (180 / Math.PI)) / 180) * Math.PI
            groupUH1B.rotation.y = angle
        }
        let riseX = offsetX / Timer;
        let riseY = offsetY / Timer;
        for (let i = 0; i < 100; i++) {
            ((i) => {

                setTimeout(() => {
                    groupUH1B.position.x += Math.ceil(riseX)
                    groupUH1B.position.z += Math.ceil(riseY)
                }, 10 * i)
            })(i)
        }
    }
}
function render() {
    rander.render(Scene, camera)

    updateLabelOrientationofStart()
    updateLabelOrientationofStop()
    requestAnimationFrame(render)
}
render()

