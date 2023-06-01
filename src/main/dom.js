// import {BoxBottonButton} from '../main/main.js'
const texture = document.getElementById('texture')


let flag_bg_texture_box = true
function TogglePanel(){
    if(flag_bg_texture_box){
        texture.style.display='block'
        flag_bg_texture_box = false
    }else{
        texture.style.display='none'
        flag_bg_texture_box= true
    }
}

// console.log(BoxBottonButton)
// BoxBottonButton()