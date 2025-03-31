// 获取DOM元素
const inputs = document.querySelectorAll("input"); // 获取所有输入框
const button = document.querySelector("button"); // 获取验证按钮
const mobileNumber = document.getElementById("mobileNumber"); // 获取显示手机号的元素
const expire = document.getElementById("expire"); // 获取显示倒计时的元素
const requestBtn = document.getElementById("request"); // 获取重新获取验证码按钮
let otp = ""; // 存储生成的OTP验证码
let expireInterval = null; // 存储倒计时定时器

// 创建一个消息提示函数，替代多处的alert
function showMessage(message, type = 'info') {
    // 如果已存在消息框，先移除
    const existingMsg = document.querySelector('.message-box');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // 创建消息框
    const msgBox = document.createElement('div');
    msgBox.className = `message-box ${type}`;
    msgBox.textContent = message;
    
    // 添加到页面
    document.querySelector('.container').appendChild(msgBox);
    
    // 3秒后自动消失
    setTimeout(() => {
        msgBox.classList.add('fade-out');
        setTimeout(() => msgBox.remove(), 500);
    }, 3000);
}

/**
 * 生成OTP验证码并启动倒计时
 * 生成一个4位数的随机验证码，并设置30秒倒计时
 */
function generateOTP() {
    // 清除之前可能存在的计时器
    if(expireInterval) {
        clearInterval(expireInterval);
    }
    // 生成0-9999范围内的随机数
    const otpNum = Math.floor(Math.random() * 10000);
    // 将数字转为字符串并补齐前导零，确保始终是4位
    otp = otpNum.toString().padStart(4, '0');
    showMessage(`OTP已生成: ${otp}`, 'success');

    inputs[0].focus(); // 聚焦到第一个输入框
    expire.innerText = 30; // 设置倒计时初始值为30秒
    
    // 启动倒计时
    expireInterval = setInterval(() => {
        expire.innerText--; // 每秒减少1
        if (expire.innerText == 0) {
            clearInterval(expireInterval); // 当倒计时到0时停止计时器
            // 倒计时结束时禁用所有输入框
            inputs.forEach(input => input.setAttribute("disabled", true));
            button.setAttribute("disabled", true);
            button.classList.remove("active");
            showMessage("验证码已过期，请重新获取", 'error');
        }
    }, 1000);
}

/**
 * 重置OTP验证状态
 * 清空所有输入框，禁用除第一个以外的所有输入框，停止倒计时，禁用验证按钮
 */
function resetOTP() {
    inputs.forEach((input, i) => {
        input.value = ""; // 清空所有输入框的值
        // 修复逻辑：第一个输入框启用，其他禁用
        if(i == 0) {
            input.removeAttribute("disabled"); // 启用第一个输入框
        } 
        if(i!=0) {
            input.setAttribute("disabled", true); // 禁用其他输入框
        }
    });
    clearInterval(expireInterval); // 停止倒计时
    expire.innerText = 0; // 将倒计时显示设为0
    button.setAttribute("disabled", true); // 禁用验证按钮
    button.classList.remove("active"); // 移除按钮的激活样式
}

/**
 * 为每个输入框添加键盘事件监听
 * 处理输入框之间的焦点切换、退格键处理和验证按钮状态更新
 */
inputs.forEach((input, index) => {
    // 限制每个输入框只能输入一个数字
    input.addEventListener("input", (e) => {
        if(input.value.length > 1) {
            input.value = input.value.slice(0,1);
        }
    });
    
    input.addEventListener("keyup", (e) => {
        const currentInput = input; // 当前输入框
        const nextInput = input.nextElementSibling; // 下一个输入框
        const prevInput = input.previousElementSibling; // 上一个输入框

        // 当前输入框有值时，启用并聚焦到下一个输入框
        if(nextInput && nextInput.hasAttribute("disabled") && currentInput.value.length > 0) 
            {
                nextInput.removeAttribute("disabled"); // 启用下一个输入框
                nextInput.focus(); // 聚焦到下一个输入框
            }
        
        // 处理退格键：禁用当前及后续输入框，聚焦到前一个输入框
        if(e.key === "Backspace") {
            inputs.forEach((input, index1) => {
                if(index <= index1 && prevInput) {
                    input.setAttribute("disabled", true); // 禁用当前及后续输入框
                    prevInput.focus(); // 聚焦到前一个输入框
                    prevInput.value = ""; // 清空前一个输入框的值
                }
            })
        }
        
        // 检查是否所有输入框都已填写，更新验证按钮状态
        if(!inputs[3].disabled && inputs[3].value !== ""){
            inputs[3].blur(); // 取消最后一个输入框的焦点
            button.removeAttribute("disabled"); // 启用验证按钮
            button.classList.add("active"); // 添加按钮激活样式
        }else{
            button.classList.remove("active"); // 移除按钮激活样式
        }
       
        // 自动提交当最后一个输入框填写完成
        if(!inputs[3].disabled && inputs[3].value !== "" && e.key !== "Backspace"){
            button.click(); // 自动触发验证
        }
    })
})

/**
 * 页面加载完成后执行
 * 提示用户输入手机号码，验证格式并生成OTP验证码
 */
window.addEventListener("load", () => {
    let phone = prompt("请输入您的手机号码"); // 弹出提示框让用户输入手机号
    
    // 验证手机号码格式
    while(phone && !validatePhoneNumber(phone)) {
        showMessage("请输入有效的手机号码", 'error');
        phone = prompt("请输入您的手机号码");
    }
    
    if(phone){
        mobileNumber.innerText = phone; // 显示用户输入的手机号
        generateOTP(); // 生成OTP验证码
    }
})

/**
 * 验证按钮点击事件
 * 收集用户输入的验证码并与生成的OTP进行比对
 */
/**
 * 验证输入是否为有效的4位数字
 */
function validateInputs() {
    for(let input of inputs) {
        if(isNaN(input.value) || input.value === "") {
            return false;
        }
    }
    return true;
}

// 在按钮点击事件中使用
button.addEventListener("click", (e) => {
    if(!validateInputs()) {
        showMessage("请输入有效的4位验证码", 'error');
        return;
    }
    
    let currentOTP = "";
    inputs.forEach((input) => {
        currentOTP += input.value;
    });
    
    if(currentOTP == otp) {
        showMessage("验证成功！", 'success'); // 验证成功提示
        resetOTP(); // 重置OTP验证状态
    } else {
        showMessage("验证失败，请重新输入", 'error'); // 验证失败提示
    }
});

// 移除这段重复的代码，因为已经在generateOTP函数中处理了倒计时
// expireInterval = setInterval(() => {
//     expire.innerText--;
//     if (expire.innerText == 0) {
//         clearInterval(expireInterval);
//         // 倒计时结束时禁用所有输入框
//         inputs.forEach(input => input.setAttribute("disabled", true));
//         button.setAttribute("disabled", true);
//         alert("验证码已过期，请重新获取");
//     }
// }, 1000);

// 重新获取验证码按钮事件
requestBtn.addEventListener("click", function(e) {
    e.preventDefault();
    // 创建自定义确认框
    const existingConfirm = document.querySelector('.confirm-box');
    if (existingConfirm) {
        existingConfirm.remove();
    }
    
    const confirmBox = document.createElement('div');
    confirmBox.className = 'message-box info confirm-box';
    confirmBox.innerHTML = `
        确定要重新获取验证码吗？当前验证码将失效
        <div class="confirm-buttons">
            <button class="confirm-yes">确定</button>
            <button class="confirm-no">取消</button>
        </div>
    `;
    document.querySelector('.container').appendChild(confirmBox);
    
    // 添加按钮事件
    confirmBox.querySelector('.confirm-yes').addEventListener('click', () => {
        confirmBox.remove();
        resetOTP();
        generateOTP();
    });
    
    confirmBox.querySelector('.confirm-no').addEventListener('click', () => {
        confirmBox.remove();
    });
}); 

// 移除HTML中的onclick属性，统一使用addEventListener
document.addEventListener('DOMContentLoaded', function() {
    // 移除HTML中的onclick
    requestBtn.removeAttribute('onclick');
});

// 添加自定义确认框样式
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .confirm-box {
            width: 300px;
            text-align: center;
        }
        .confirm-buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
        }
        .confirm-buttons button {
            margin: 0;
            padding: 5px 15px;
            height: auto;
            width: auto;
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);
});

/**
 * 验证手机号码格式是否正确
 * @param {string} phone - 手机号码
 * @returns {boolean} - 是否为有效的手机号码
 */
function validatePhoneNumber(phone) {
    // 中国大陆手机号码格式验证（简化版）
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}
