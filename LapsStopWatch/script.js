/**
 * 圈数计时器 - JavaScript实现
 * 功能：计时、暂停、重置、记录圈数
 */

// 获取DOM元素
const stopwatchDuration = document.getElementById("stopwatchDuration"); // 计时器显示区域
const start = document.getElementById("start");                       // 开始按钮
const stop = document.getElementById("stop");                         // 停止按钮
const reset = document.getElementById("reset");                       // 重置按钮
const lap = document.getElementById("lap");                           // 圈数按钮
const laps = document.getElementById("laps");                         // 圈数记录列表

// 初始化计时器变量
let hrs = 0;          // 小时
let mins = 0;         // 分钟
let sec = 0;          // 秒
let ms = 0;           // 毫秒（实际精度为百分之一秒）
let timeInterval;     // 计时器间隔引用，用于停止计时

// 记录圈数的变量
let lapCount = 0;
// 标记计时器是否正在运行
let isRunning = false;

/**
 * 开始按钮点击事件处理函数
 * 功能：启动计时器，每10毫秒更新一次时间显示
 */
start.onclick = () => {
    // 设置计时器，每10毫秒执行一次
    timeInterval = setInterval(()=>{
        // 增加毫秒计数
        ms++;
        
        // 处理时间进位
        if(ms == 100){ // 100毫秒 = 1秒
            sec++;
            ms = 0;
        }
        if(sec == 60){ // 60秒 = 1分钟
            mins++;
            sec = 0;
        }
        if(mins == 60){ // 60分钟 = 1小时
            hrs++;
            mins = 0;
        }
        
        // 格式化时间显示，确保两位数显示
        let hrsString = hrs;
        let minsString = mins;
        let secString = sec;
        let msString = ms;
        
        // 小于10的数字前面添加0
        if(hrs < 10){
            hrsString = "0" + hrsString;
        }
        if(mins < 10){
            minsString = "0" + minsString;
        }
        if(sec < 10){
            secString = "0" + secString;
        }
        if(ms < 10){
            msString = "0" + msString;
        }
        
        // 更新计时器显示
        stopwatchDuration.innerHTML = `${hrsString}:${minsString}:${secString}:${msString}`;
    },10); // 每10毫秒执行一次
    
    // 设置计时器运行状态
    isRunning = true;
    
    // 更新按钮显示状态
    start.style.display = "none";   // 隐藏开始按钮
    stop.style.display = "block";   // 显示停止按钮
    reset.style.display = "block";  // 显示重置按钮
}

/**
 * 停止按钮点击事件处理函数
 * 功能：暂停计时器
 */
stop.onclick = ()=>{
    // 停止计时器
    clearInterval(timeInterval);
    
    // 更新计时器状态
    isRunning = false;
    
    // 更新按钮显示状态
    stop.style.display = "none";    // 隐藏停止按钮
    start.style.display = "block";  // 显示开始按钮
}

/**
 * 重置按钮点击事件处理函数
 * 功能：重置计时器和圈数记录
 */
reset.onclick = ()=>{
    // 停止计时器
    clearInterval(timeInterval);
    
    // 更新计时器状态
    isRunning = false;
    
    // 重置所有计时值
    hrs = 0;
    mins = 0;
    sec = 0;
    ms = 0;
    
    // 重置圈数计数
    lapCount = 0;
    
    // 更新计时器显示
    stopwatchDuration.innerHTML = "00:00:00:00";
    
    // 清空圈数记录列表
    laps.innerHTML = "";
    
    // 更新按钮显示状态
    stop.style.display = "none";     // 隐藏停止按钮
    reset.style.display = "none";    // 隐藏重置按钮
    start.style.display = "block";   // 显示开始按钮
}

/**
 * 圈数按钮点击事件处理函数
 * 功能：记录当前时间作为一个新的圈数记录
 */
lap.onclick = ()=>{
    // 只有在计时器运行时才记录圈数
    if(isRunning){
        // 增加圈数计数
        lapCount++;
        
        // 创建新的圈数记录项
        const lapItem = document.createElement("li");
        
        // 创建圈数标签
        const lapLabel = document.createElement("span");
        lapLabel.textContent = `圈 ${lapCount}`; // 显示圈数
        lapLabel.className = "lap-number";       // 应用样式
        
        // 创建时间标签
        const lapTime = document.createElement("span");
        lapTime.textContent = stopwatchDuration.innerHTML; // 显示当前时间
        lapTime.className = "lap-time";                   // 应用样式
        
        // 将标签添加到列表项
        lapItem.appendChild(lapLabel);
        lapItem.appendChild(lapTime);
        
        // 将新记录添加到列表的顶部
        laps.insertBefore(lapItem, laps.firstChild);
    }
}