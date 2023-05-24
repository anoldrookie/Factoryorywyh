function textShow(v) {
    const text = document.getElementById('Ptext')
    console.log(text);
    if (v) {
        text.style.display = 'block'
    }
    else if (!v) {
        text.style.display = ''
    }
}
// textShow()
const AlertText = () => {
    const div = document.querySelector('div')
    alert(`${div.innerText}`)
}

window.onload = function () {
    for (let i = 1; i <= 5; i++) {
        // setInterval(function (i) {
        //     console.log(i);
        // },1000*i)
        (() => {
            setTimeout(function () {
                console.log(i);
            }, 1000 * i)
        })()
    }
    // setTimeout(fun/tion(){

    // },1000*1)
    // setTimeout(function(){

    // },1000*2)
    // setTimeout(function(){

    // },1000*3)
    // setTimeout(function(){

    // },1000*4)
    // setTimeout(function(){

    // },1000*5)
}
const a = 3; // 直角边a的长度
const b = 4; // 相邻直角边b的长度
const angle = Math.atan(b / a) * (180 / Math.PI); // 计算角度，将弧度转换为度数
console.log('aaaaaaaaaaaaaaaaaaaaaaaa', angle * (Math.PI / 180)); 