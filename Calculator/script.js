// 获取显示结果的元素
const inputValue = document.getElementById("userinput");

// 为所有运算符按钮添加点击事件监听器
const calculate = document.querySelectorAll('.operator').forEach(function(item){
    item.addEventListener('click',function(e){
        // 获取当前显示内容的最后一个字符
        let lastValue = inputValue.innerText.slice(-1);
        
        // 处理等号运算：如果最后一个字符是数字且点击了等号
        if(!isNaN(lastValue) && e.target.innerText === "="){
            inputValue.innerText = eval(inputValue.innerText);
        }
        // 处理AC（清除所有）功能
        else if(e.target.innerText === "AC"){
            inputValue.innerText = "0";
        }
        // 处理DEL（删除）功能
        else if(e.target.innerText === "DEL" ){
            inputValue.innerText = inputValue.innerText.slice(0,-1);
            // 如果删除后为空，显示0
            if(inputValue.innerText == 0){
                inputValue.innerText = "0";
            }
        }
        // 处理其他运算符：只有当最后一个字符是数字时才能添加运算符
        else{
            if(!isNaN(lastValue)){
                inputValue.innerText += e.target.innerText;
            }
        }
    })
})

// 为所有数字按钮添加点击事件监听器
const number = document.querySelectorAll('.number').forEach(function(item){
    item.addEventListener('click',function(e){
        // 如果当前显示为0，则清空显示内容
        if(inputValue.innerText === "0"){
            inputValue.innerText = "";
        }
        // 添加点击的数字到显示内容
        inputValue.innerText += e.target.innerText.trim();
    })
})