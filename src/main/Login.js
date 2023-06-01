const ima = document.getElementsByClassName('ima')

function clickImage(val) {
    // console.log(val)
    // e.target.style.display = 'inline-block'
    // switch (val) {
    //     case 0:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 1:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 2:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 3:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 4:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 5:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 6:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 7:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 8:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 9:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 10:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 11:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 12:
    //         ima[val].style.display = 'inline-block'
    //         break
    //     case 13:
    //         ima[val].style.display = 'inline-block'
    //         break
    // }
    if (val.style.border == 'none' || val.style.border =='') {
        
        val.style.border = '1px solid yellow'
    }
    else {
        val.style.border = 'none'
    }
    console.log(val.style)


}