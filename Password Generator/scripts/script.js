'use strict'
const chars = {
    upper:"ABCDEFGHIJKLMNOPRSTUVYZWQ",
    lower:"abcdefghijklmnoprstuvyzwq",
    number : "0123456789",
    symbols: "!^+%&/?*-_<>#$=."
}

let slider = document.getElementsByClassName('slider')[0];
let passLenth = document.getElementById('passLength');
let powers = document.getElementsByClassName('power')

function sliderChangeInput() {
    passLenth.textContent = slider.value
}

function generatePassword() {
    let passwordLength = getPasswordLength();
    let boxes = document.getElementsByClassName('settings')[0].children
    let newCharList = ""
    let newPassword = ""
    for (let i = 0; i<boxes.length ; i++) {
        if (boxes[i].children[0].checked) {
            newCharList += chars[boxes[i].children[0].id];
        }
    }
    if (newCharList.length > 0) {
        for (let i = 0; i<passwordLength ; i++) {
            let random = Math.floor(Math.random() * newCharList.length)
            newPassword += newCharList[random]
        }
        document.getElementById('password').textContent = newPassword;
    }
    updatePassSecurity(newPassword)

}

function getPasswordLength() {
    return slider.value;
}

function updatePassSecurity(password) {
    for(let i = 0; i<powers.length ; i++) {
        powers[i].childNodes[0].style.fill = '';
    }
    let level = -1
    if(password.length > 7) level+=1;
    if(chars['lower'].split('').some(substring=>password.includes(substring))) level+=1;
    if(chars['upper'].split('').some(substring=>password.includes(substring))) level+=1;
    if(chars['symbols'].split('').some(substring=>password.includes(substring))) level+=1;
    if(chars['number'].split('').some(substring=>password.includes(substring))) level+=1;
    let color = level == 1 ? 'darkred' : level == 2 ? 'orangered' : level == 3 ? 'lightgreen' : level == 4 ? 'green' : 'none'
    
    for(let i = 0; i<level ; i++) {
        powers[i].childNodes[0].style.fill = color;
    }
}


function copyPassword() {
    var pass = document.getElementById('password').textContent
    if(pass !== '? ? ? ? ? ?') {
        navigator.clipboard.writeText(pass);
    }else {
        alert("Şifre oluşturulmamış!")
    }
}



sliderChangeInput()