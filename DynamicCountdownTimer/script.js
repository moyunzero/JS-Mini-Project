const countValue = document.querySelectorAll(".countValue span");
const days = document.querySelector(".days");
const daysIndex1 = document.querySelector(".days .index1");
// const hours = document.querySelector(".hours");
const hoursIndex1 = document.querySelector(".hours .index1");
const hoursIndex2 = document.querySelector(".hours .index2");
// const minutes = document.querySelector(".minutes");
const minutesIndex1 = document.querySelector(".minutes .index1");
const minutesIndex2 = document.querySelector(".minutes .index2");
// const seconds = document.querySelector(".seconds");
const secondsIndex1 = document.querySelector(".seconds .index1");
const secondsIndex2 = document.querySelector(".seconds .index2");

// 获取用户输入元素
const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");
const secondInput = document.getElementById("second");
const startButton = document.getElementById("startButton");

let deadLineDate; // 将 deadLineDate 移到全局作用域

const seconds = 1000;
const minutes = 60;
const hours = 24;
const oneMinutes = seconds * minutes;
const oneHours = oneMinutes * minutes;
const oneDays = oneHours * hours;

let intervalId;

startButton.addEventListener('click', () => {
  const year = parseInt(yearInput.value);
  const month = parseInt(monthInput.value) - 1; // JavaScript中月份是从0开始的
  const day = parseInt(dayInput.value);
  const hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const second = parseInt(secondInput.value);

  if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second)) {
    alert("请输入所有时间字段！");
    return;
  }

  deadLineDate = new Date(year, month, day, hour, minute, second);

  // 清除之前的倒计时（如果存在）
  if (intervalId) {
    clearInterval(intervalId);
  }
  // 立即执行一次以避免延迟
  countdown(); 
  // 每秒调用 countdown 函数
  intervalId = setInterval(countdown, 1000); 

  // 隐藏输入区域，显示倒计时 (可选)
  // document.querySelector('.input-container').style.display = 'none';
  // document.querySelector('.container').style.display = 'flex'; // 假设倒计时容器默认是flex
  document.querySelector('h1').innerText = "距离截止日期还有";
});

function countdown() {
  if (!deadLineDate) return; // 如果截止日期未设置，则不执行

  let currentDate = new Date();

  let currTime = currentDate.getTime();
  let deadLineTime = deadLineDate.getTime();

  if (currTime >= deadLineTime) {
    console.log("Time is up!");
    clearInterval(intervalId); // 停止倒计时
    // 可以在这里添加更友好的提示，比如更新页面内容
    // days.innerHTML = "00";
    daysIndex1.innerHTML = "0";
    hoursIndex1.innerHTML = "0";
    hoursIndex2.innerHTML = "0";
    minutesIndex1.innerHTML = "0";
    minutesIndex2.innerHTML = "0";
    secondsIndex1.innerHTML = "0";
    secondsIndex2.innerHTML = "0";
    // 你可以添加一个更明显的提示，例如修改一个标题元素
    // document.querySelector('h1').innerText = "倒计时结束！";
    return;
  }

  let timeLeft = deadLineTime - currTime;

  let d = Math.floor(timeLeft / oneDays);
  let h = Math.floor((timeLeft % oneDays) / oneHours);
  let m = Math.floor((timeLeft % oneHours) / oneMinutes);
  let s = Math.floor((timeLeft % oneMinutes) / seconds);

  // 格式化时间，确保两位数显示
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  daysIndex1.innerHTML = formatTime(d);
  hoursIndex1.innerHTML = formatTime(h).toString()[0];
  hoursIndex2.innerHTML = formatTime(h).toString()[1];
  minutesIndex1.innerHTML = formatTime(m).toString()[0];
  minutesIndex2.innerHTML = formatTime(m).toString()[1];
  secondsIndex1.innerHTML = formatTime(s).toString()[0];
  secondsIndex2.innerHTML = formatTime(s).toString()[1];

  // 更新所有 .countValue span 元素 (如果需要统一更新)
  // countValue.forEach(span => {
  //   // 根据 span 的 class 或其他属性来决定更新哪个值
  // });
}