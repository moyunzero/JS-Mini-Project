// 获取DOM元素
const validatorText = document.getElementById('validatorText'); // 密码输入框
const showHide = document.getElementById('showHide'); // 显示/隐藏密码按钮
const passwordCheck = document.querySelectorAll('.password-check img'); // 所有校验规则的图标

// 密码显示/隐藏切换功能
showHide.addEventListener('click', (e) => {
    // 切换输入框类型
    validatorText.type = validatorText.type === 'password' ? 'text' : 'password';
    // 切换显示/隐藏图标
    e.target.setAttribute(
        "src",
        e.target.src.includes("hide.png")?"images/show-eye.png":"images/hide.png"
    )
});

// 定义密码校验规则
const combinations = [
    {
        name: 'length',
        regex: /.{8,}/, // 至少8个字符
        valid: false
    },
    {
        name: 'uppercase',
        regex: /[A-Z]/, // 至少1个大写字母
        valid: false
    }, 
    {
        name: 'lowercase',
        regex: /[a-z]/, // 至少1个小写字母
        valid: false
    }, 
    {
        name: 'number',
        regex: /[0-9]/, // 至少1个数字
        valid: false
    }, 
    {
        name: 'special',
        regex: /[^a-zA-Z0-9]/, // 至少1个特殊字符
        valid: false
    }]

// 监听密码输入事件
validatorText.addEventListener('keyup', (e) => {
    // 遍历所有校验规则
    combinations.forEach((item) => {
        // 检查当前输入是否符合规则
        const IsValid = item.regex.test(e.target.value);
        // 获取对应的校验图标
        let checkItem = passwordCheck[combinations.indexOf(item)];
        
        if (IsValid) {
            // 符合规则：显示绿色对勾
            checkItem.setAttribute('src', 'images/check.png');
            checkItem.parentElement.style.color = 'green';
            item.valid = true;
        } else {
            // 不符合规则：显示红色叉号
            checkItem.setAttribute('src', 'images/close.png');
            checkItem.parentElement.style.color = 'red';
            item.valid = false;
        }
    });
});