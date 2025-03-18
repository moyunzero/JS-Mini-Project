const passwordInput = document.getElementById("strongPasswordValue"); 
const CopySuccess = document.getElementById("CopySuccess");
const rangeInput = document.getElementById("rangeInput");
const rangeValue = document.getElementById("rangeValue");
const generateButton = document.getElementById("generateButton");
const options = document.querySelectorAll(".options input");

for(let i=0; i<options.length; i++){
    options[i].addEventListener("click",generateStrongPassword);
}

generateButton.addEventListener("click",generateStrongPassword);
rangeInput.addEventListener('input',setPasswordIndicator);
rangeValue.addEventListener('input',setPasswordIndicator);

function setPasswordIndicator(){
    generateStrongPassword();
}

function CopyStrongPassword(){
    if(passwordInput.value.length==0){
        alert("请先生成密码");
        return;
    }else{
        CopySuccess.setAttribute('src','./images/tick.png')
        navigator.clipboard.writeText(passwordInput.value)
        setTimeout(function(){
            CopySuccess.setAttribute('src','./images/copy.png')
        },1000);
    }
    
}

const Characters ={
    Uppercase : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    Lowercase : "abcdefghijklmnopqrstuvwxyz",
    Numbers : "0123456789",
    Symbols : "!@#$%^&*()_+~`|}{[]\:;?><,./-=",
}

function evaluatePasswordStrength(password) {
    let strength = "week";
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(password);

    if (length >= 12 && hasUppercase && hasLowercase && hasNumbers && hasSymbols) {
        strength = "strong";
    } else if (length >= 8 && ((hasUppercase && hasLowercase) || (hasNumbers && hasSymbols))) {
        strength = "medium";
    }

    return strength;
}

function generateStrongPassword(){
    let randomPasswords = "";
    let strongPasswords = "";
    let IsExcludeDuplicate = false;
    options.forEach((option)=>{
        if(option.checked && option.id != "Duplicate"){
            randomPasswords += Characters[option.id];
        }
        if(option.id == "Duplicate" && option.checked){
            IsExcludeDuplicate = true;
        }
    });

    if(randomPasswords.length==0){
        alert("请选择至少一个选项");
        return;
    }else{
        if(IsExcludeDuplicate){
            // 检查是否可以生成无重复密码
            if(randomPasswords.length < rangeInput.value){
                alert("可用字符数量不足，无法生成指定长度的无重复密码！");
                return;
            }
            // 当需要去重时，使用循环直到达到所需长度
            let uniqueChars = new Set();
            while(uniqueChars.size < rangeInput.value){
                uniqueChars.add(randomPasswords.charAt(Math.floor(Math.random()*randomPasswords.length)));
            }
            strongPasswords = Array.from(uniqueChars).join("");
        } else {
            // 不需要去重时保持原来的逻辑
            for(let i=0; i<rangeInput.value; i++){
                strongPasswords += randomPasswords.charAt(Math.floor(Math.random()*randomPasswords.length));
            }
        }
    }
    passwordInput.value = strongPasswords;
    // Evaluate password strength and apply styles
    const strength = evaluatePasswordStrength(strongPasswords);
    passwordInput.parentElement.id = strength; 
}