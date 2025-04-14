// 获取DOM元素
const createAccountFrom = document.getElementById("createAccountForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const conformation = document.getElementById("conformation");

// 为表单添加提交事件监听器
createAccountFrom.addEventListener("submit", (e) => {
    e.preventDefault(); // 阻止表单默认提交行为
    validateForm(); // 调用表单验证函数
})

/**
 * 验证整个表单
 * 当所有字段都验证通过时，显示确认信息并隐藏表单
 */
function validateForm() {
    if(checkUsername() && checkEmail() && checkPassword() && checkPassword2()){
       // 创建用户输入数据的预览信息
       let dataPreview = "用户名：" + username.value + "\n" +
                         "邮箱：" + email.value + "\n" +
                         "密码：" + password.value + "\n" +
                         "确认密码：" + password2.value + "\n";
        alert(dataPreview); // 弹窗显示用户输入的数据

        // 隐藏表单，显示确认信息
        createAccountFrom.setAttribute("style", "display: none");
        conformation.setAttribute("style", "display: block");
    }
}

/**
 * 验证用户名
 * 规则：不能为空，必须是3-16位的字母、数字或下划线
 * @returns {boolean} 验证是否通过
 */
function checkUsername() {
    const usernameValue = username.value.trim();
    if(usernameValue === "") {
        setSuccessErrorMessage(username, "Username cannot be blank");
        return false;
    } else {
        let regex = /^[a-zA-Z0-9_]{3,16}$/;
        if(!regex.test(usernameValue)){
            setSuccessErrorMessage(username, "请输入有效的用户名");
            return false;
        } else {
            setSuccessErrorMessage(username, "");
            return true;
        }
    }
}

/**
 * 验证邮箱
 * 规则：不能为空，必须符合邮箱格式
 * @returns {boolean} 验证是否通过
 */
function checkEmail() {
    const emailValue = email.value.trim();
    if (emailValue === "") {
        setSuccessErrorMessage(email, "Email cannot be blank");
        return false;
    } else {
        let regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        if(!regex.test(emailValue)){
            setSuccessErrorMessage(email, "请输入有效的邮箱地址");
            return false;
        } else {
            setSuccessErrorMessage(email, "");
            return true;
        }
    }
}

/**
 * 验证密码
 * 规则：不能为空
 * @returns {boolean} 验证是否通过
 */
function checkPassword() {
    const passwordValue = password.value.trim();
    if (passwordValue === "") {
        setSuccessErrorMessage(password, "Password cannot be blank");
        return false;
    } else {
        setSuccessErrorMessage(password, "");
        return true;
    }
}

/**
 * 验证确认密码
 * 规则：不能为空，必须与密码一致
 * @returns {boolean} 验证是否通过
 */
function checkPassword2() {
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    if (password2Value === "") {
        setSuccessErrorMessage(password2, "Password cannot be blank");
        return false;
    } else if (passwordValue !== password2Value) {
        setSuccessErrorMessage(password2, "Passwords do not match");
        return false;
    } else {
        setSuccessErrorMessage(password2, "");
        return true;
    }
}

/**
 * 设置表单控件的成功或错误状态和消息
 * @param {HTMLElement} input - 输入元素
 * @param {string} message - 错误消息，为空表示验证成功
 */
const setSuccessErrorMessage = (input, message) => {
    const formControl = input.parentElement;
    
    if(message === "") {
        // 验证成功，显示成功图标，清空错误消息
        formControl.querySelector("img").setAttribute("src", "images/check.png");
        formControl.querySelector("small").innerText="";
    } else {
        // 验证失败，显示失败图标，设置错误消息，添加错误样式
        formControl.querySelector("img").setAttribute("src", "images/fail.png");
        formControl.querySelector("small").innerText= message;
        input.classList.add('error'); 
    }
}