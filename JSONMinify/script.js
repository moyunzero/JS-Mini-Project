// 获取输入和输出的 textarea 元素
const JSONBefore = document.getElementById("JSONBefore");
const JSONAfter = document.getElementById("JSONAfter");

/**
 * 校验输入的 JSON 字符串是否合法
 * @returns {boolean|undefined} 如果合法返回 true，否则在输出框显示错误信息
 */
function ValidateJSON() {
    try {
        // 如果输入为空，提示用户输入
        if (JSONBefore.value.length == 0) {
            JSONAfter.value = "请输入 JSON";
            return;
        }
        // 尝试解析 JSON，如果失败会抛出异常
        JSON.parse(JSONBefore.value);
        JSONAfter.value = "有效JSON";
        return true;
    } catch (e) {
        // 捕获解析错误并显示
        JSONAfter.value = e;
    }
}

/**
 * 格式化并美化 JSON 字符串
 * 将输入的 JSON 格式化为带缩进的字符串
 */
function FormatBeautifyJSON() {
    // 先校验 JSON 合法性
    if (ValidateJSON()) {
        // 解析 JSON 并格式化输出（4 个空格缩进）
        let parseJSON = JSON.parse(JSONBefore.value);
        JSONAfter.value = JSON.stringify(parseJSON, null, 4);
    }
}

/**
 * 压缩 JSON 字符串
 * 将输入的 JSON 压缩为一行输出
 */
function MinifyJSON() {
    // 先校验 JSON 合法性
    if (ValidateJSON()) {
        // 解析 JSON 并压缩输出（无空格）
        let parseJSON = JSON.parse(JSONBefore.value);
        JSONAfter.value = JSON.stringify(parseJSON);
    }
}