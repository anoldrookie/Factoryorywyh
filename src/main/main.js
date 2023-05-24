import * as THREE from '../../node_modules/three/build/three.module.js'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from '../../node_modules/dat.gui/build/dat.gui.module.js'
import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from '../../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js'
const cssRenderer = new CSS3DRenderer();
console.log('dddddddddddddddddddddddd', cssRenderer);
const log = (e) => {
    return console.log(e)
}
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
//创建场景和相机
const Scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000)

// 创建一个面
const geometry = new THREE.PlaneGeometry(10000, 10000);
const geometryVideo = new THREE.PlaneGeometry(138, 60);
const video = document.getElementById('video');
const textureLoader = new THREE.TextureLoader()
const textureVido = new THREE.VideoTexture(video);
const texture = textureLoader.load('image/glass.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
const materialVideo = new THREE.MeshBasicMaterial({ map: textureVido, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
const videoPlane = new THREE.Mesh(geometryVideo, materialVideo);
videoPlane.position.set(0, 154, -90)
plane.rotation.x = Math.PI / 2
Scene.add(plane);
console.log(plane);
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
const skyColor = 0xffff; // 天空颜色，这里使用了浅蓝色
Scene.background = new THREE.Color(skyColor);

// 设置相机位置并添加进场景
camera.position.set(900, 100, 200)
Scene.add(camera)

// 添加光源
const light = new THREE.AmbientLight(0xffffff, 1.1)
light.position.set(0, 100, 0)
Scene.add(light)





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
window.addEventListener('dblclick', () => {
    rander.domElement.requestFullscreen()
})

// 声明组对象
const group1 = new THREE.Group()
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
const groupUH1B = new THREE.Group()
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
contexttoStart.fillText('点我开始让汽车跑', 250, 130)
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
contexttoStop.fillText('点我停止让汽车跑', 250, 130);
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
// 声明GLTFLoader对象
const loader = new FBXLoader()
const GLTFloader = new GLTFLoader()
console.log(loader);
//加载模型

// loader.load('model/school.FBX',function(fbx){
//     // model.add(fbx)
//     group1.add(fbx)
//     fbx.scale.set(0.1,0.1,0.1)
//     fbx.position.set(50,0,0)
//     fbx.frustumCulled = false

//     console.log('fbx',fbx);
// })
loader.load('model/school.FBX', function (fbx) {
    // model.add(fbx)
    group1.add(fbx)
    fbx.scale.set(0.3, 0.3, 0.3)
    fbx.position.set(-500, 30, 0)
    fbx.frustumCulled = false

})


loader.load('model/gwdl.FBX', function (fbx) {
    // model.add(fbx)
    groupGwdl.add(fbx)
    fbx.scale.set(0.1, 0.1, 0.1)
    fbx.position.set(500, 1, 5)
    fbx.rotation.y = -Math.PI / 2
    fbx.frustumCulled = false

})

loader.load('model/hotel.FBX', function (fbx) {
    // model.add(fbx)
    grouphotel.add(fbx)
    fbx.scale.set(0.05, 0.05, 0.05)
    fbx.position.set(0, -0.1, 500)
    fbx.frustumCulled = false

})
// loader.load('model/writingbuilding.FBX', function (fbx) {
//     // model.add(fbx)
//     group1.add(fbx)
//     fbx.scale.set(0.1, 0.1, 0.1)
//     fbx.position.set(0, -0.1, -500)
//     fbx.frustumCulled = false

// })
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
loader.load('model/guanggaopai.FBX', function (fbx) {
    // model.add(fbx)
    groupGGP.add(fbx)
    fbx.scale.set(1, 1, 1)
    fbx.position.set(0, 0, -100)
    fbx.rotation.y = Math.PI / 2
    fbx.frustumCulled = false
    // const targetFace = groupGGP.children[0].children[0].geometry
    // console.log('fffffffffffffffffffffff',targetFace.faceVertexUvs);
    // targetFace.faceVertexUvs[0][4] = [
    //     new THREE.Vector2(0, 1),
    //     new THREE.Vector2(0, 0),
    //     new THREE.Vector2(1, 0)
    //   ];
    // const materialGGP = new THREE.MeshPhongMaterial({ map: textureVido });
    // const mesh = new THREE.Mesh(targetFace, materialGGP);

    // 将网格对象添加到场景中
    //   Scene.add(mesh);
    // groupGGP.children[0].children[0].material = materialGGP
})
groupGGP.add(videoPlane)
group1.position.set(0, 0, 0)
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
    // model.add(fbx)
    console.log('gltf', gltf);
    group6.add(gltf.scene)
    gltf.scene.scale.set(4, 4, 4)
})
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
group4.position.set(-78, 2, 350)
group3.position.set(80, 2, 0)
group2.position.set(0, 2, 0)
groupTree.position.set(0, 0, -20)
group6.position.set(340, 0.5, 0)
groupBTR.position.set(240, 0.5, -50)
group5.position.set(0, 0.5, 5)


group5.add(group2, group3, group4)

// group6.rotation.y=Math.PI
Scene.add(group1, group5, group6, groupGwdl, grouphotel, groupTree, groupGGP, groupUH1B)
// group6.rotation.y+=Math.PI/4
let tag = true



// 烟雾效果
// 创建粒子材质
const particleMaterial = new THREE.PointsMaterial({
    color: 0x888888,
    size: 5,
    map: texture, // 粒子贴图
    blending: THREE.AdditiveBlending,
    transparent: true
});

function render() {
    rander.render(Scene, camera)

    updateLabelOrientationofStart()
    updateLabelOrientationofStop()
    requestAnimationFrame(render)
}
render()
// 保存定时器的变量
let moving = null

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
// // 鼠标点击建筑让汽车运动
// window.addEventListener('click', onMouseClick);
// function onMouseClick(event) {
//     // 将鼠标点击的屏幕坐标转换为场景中的标准化设备坐标（NDC）
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     // 创建一个射线投射器
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera);

//     // 计算射线和建筑模型的交点
//     const intersectsStart = raycaster.intersectObject(textTagtoStart, true);
//     const intersectsStop = raycaster.intersectObject(textTagtoStop, true);
//     if (intersectsStart.length > 0) {
//         // toggleCarMovement()

//         // isCarMoving = true
//         IsCarMoving(true, 10)
//     }
//     else if (intersectsStop.length > 0) {
//         // isCarMoving = false
//         IsCarMoving(false, 10)

//     }
// }
// // 开关汽车动画





let v = true
// 显示文字
function textShowStart(v, clickPosition) {
    const Starttext = document.getElementById('Starttext')
    if (v) {
        Starttext.style.display = 'block'
        Starttext.style.left = clickPosition.x + 'px';
        Starttext.style.top = clickPosition.y - 80 + 'px';
        Starttext.addEventListener('click', function () {
            IsCarMoving(true, 10)
        })
    }
    // else if (!v) {
    //     Starttext.style.display = 'none'
    // }
}
function textShowStop(v, clickPosition) {
    const Stoptext = document.getElementById('Stoptext')
    if (v) {
        Stoptext.style.display = 'block'
        Stoptext.style.left = clickPosition.x + 'px';
        Stoptext.style.top = clickPosition.y - 80 + 'px';
        Stoptext.addEventListener('click', function () {
            IsCarMoving(false, 10)
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

// function MouseMove() {
//     const div = document.querySelector('div')
//     div.addEventListener('click', function () {
//         // e.target.style.backgroundColor = 'red'       
//         alert(`${div.innerText}`)
//     })
//     // div.addEventListener('mouseleave', function (e) {
//     //     e.target.style.backgroundColor = 'gray'
//     // })
// }

// MouseMove()
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
    const intersectsText = raycaster.intersectObject(textTagtoStart, true);
    if (intersectsText.length > 0) {
        // 获取点击的屏幕坐标位置
        const clickPosition = {
            x: event.clientX,
            y: event.clientY
        };
        // 更新文字位置
        textShowStart(v, clickPosition);
    }
    else {
        textShowStart(!v)
    }
}

window.addEventListener('click', mouseclick);
function mouseclick(event) {
    // 将鼠标点击的屏幕坐标转换为场景中的标准化设备坐标（NDC）
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 创建一个射线投射器
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // 计算射线和建筑模型的交点
    const intersectsText = raycaster.intersectObject(textTagtoStop, true);
    if (intersectsText.length > 0) {
        // 获取点击的屏幕坐标位置
        const clickPosition = {
            x: event.clientX,
            y: event.clientY
        };
        // 更新文字位置
        textShowStop(v, clickPosition);
    }
    else {
        textShowStop(!v)
    }
}
























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
    // else {
    //     textShow(!v)
    // }
}
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
// 飞机移动
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', OnMouseClick);

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
        log(angle)
        if (groupUH1B.position.x == 0) {
            groupUH1B.rotation.y = angle
        } else {
            log(1111123333)
            angle = (Math.PI / 2) - angle + ((Math.atan(offsetY / offsetX) * (180 / Math.PI)) / 180) * Math.PI
            groupUH1B.rotation.y = angle
        }
        let riseX = offsetX / Timer;
        let riseY = offsetY / Timer;
        for (let i = 0; i < 100; i++) {
            ((i) => {
                log(42423)
                setTimeout(() => {
                    groupUH1B.position.x += Math.ceil(riseX)
                    groupUH1B.position.z += Math.ceil(riseY)
                }, 10 * i)
            })(i)
        }
    }
}

// function animate() {
//     requestAnimationFrame(animate);

//     // 执行其他渲染逻辑
//     renderer.render(scene, camera);
// }


