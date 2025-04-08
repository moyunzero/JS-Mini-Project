// 获取DOM元素
const wordCounter = document.getElementById("wordCounter"); // 文本输入区域
const TotalWords = document.getElementById("TotalWords"); // 字数统计显示元素
const TotalCharWithSpace = document.getElementById("TotalCharWithSpace"); // 带空格字符数显示元素
const TotalCharWithoutSpan = document.getElementById("TotalCharWithoutSpan"); // 不带空格字符数显示元素
const TotalSpecialChar = document.getElementById("TotalSpecialChar"); // 特殊字符数显示元素
const TotalReadTime = document.getElementById("TotalReadTime"); // 阅读时间显示元素

// 为文本输入区域添加键盘事件监听器，实时更新统计结果
wordCounter.addEventListener("keyup", function(e){
    let countValues = e.target.value; // 获取输入的文本内容
    TotalWords.innerHTML = getTotalWords(countValues); // 更新字数统计
    TotalCharWithSpace.innerHTML = getTotalCharWithSpace(countValues); // 更新带空格字符数
    TotalCharWithoutSpan.innerHTML = getTotalCharWithoutSpan(countValues); // 更新不带空格字符数
    TotalSpecialChar.innerHTML = getTotalSpecialChar(countValues); // 更新特殊字符数
    TotalReadTime.innerHTML = getTotalReadTime(countValues); // 更新估计阅读时间
})

/**
 * 统计文本中的总字数（中文字符+英文单词）
 * @param {string} countValues - 输入的文本内容
 * @returns {number} - 总字数
 */
function getTotalWords(countValues){
    // 中文标点符号范围
    const chinesePunctuationRegex = /[\u3000-\u303F\uFF00-\uFFEF]/g;
    
    // 统计中文字符，排除中文标点
    const chineseChars = countValues.match(/[\u4e00-\u9fa5]/g) || []; // 匹配所有中文字符，如果没有则返回空数组
    const chineseCount = chineseChars.length; // 中文字符数量
    
    // 统计英文单词
    // 先移除所有中文字符、中文标点和英文标点，然后按空格分割
    const englishText = countValues
        .replace(/[\u4e00-\u9fa5]/g, '')  // 移除中文字符
        .replace(chinesePunctuationRegex, '')  // 移除中文标点
        .replace(/[^\w\s]/g, '');  // 移除英文标点
        
    let englishWords = englishText.trim().split(/\s+/); // 按空格分割得到单词数组
    let englishCount = 0; // 英文单词计数器
    
    // 遍历单词数组，统计非空单词数量
    for (let i = 0; i < englishWords.length; i++) {
        if (englishWords[i] !== "") {
            englishCount++;
        }
    }
    
    // 返回中文字符数和英文单词数的总和
    return chineseCount + englishCount;
}

/**
 * 统计文本中的总字符数（包括空格）
 * @param {string} countValues - 输入的文本内容
 * @returns {number} - 总字符数（包括空格）
 */
function getTotalCharWithSpace(countValues){
    return countValues.length; // 直接返回字符串长度
}

/**
 * 统计文本中的总字符数（不包括空格）
 * @param {string} countValues - 输入的文本内容
 * @returns {number} - 总字符数（不包括空格）
 */
function getTotalCharWithoutSpan(countValues){
    return countValues.split(" ").join('').length; // 移除所有空格后返回字符串长度
}

/**
 * 统计文本中的特殊字符数量（非字母和数字的字符）
 * @param {string} countValues - 输入的文本内容
 * @returns {number} - 特殊字符数量
 */
function getTotalSpecialChar(countValues){
    return countValues.replace(/[a-zA-Z0-9]/g, '').length; // 移除所有字母和数字后返回字符串长度
}

/**
 * 计算阅读文本所需的估计时间（分钟）
 * @param {string} countValues - 输入的文本内容
 * @returns {number} - 估计阅读时间（分钟）
 */
function getTotalReadTime(countValues){
    let WPM = 200; // 平均阅读速度：每分钟200字
    let totalWords = getTotalWords(countValues); // 获取总字数
    return Math.ceil(totalWords/WPM); // 向上取整计算所需分钟数
}