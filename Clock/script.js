const hrHand = document.querySelector(".hour-hand");
const mnHand = document.querySelector(".minute-hand");
const seHand = document.querySelector(".second-hand");
const date = document.querySelector(".date");
const day = document.querySelector(".day");
const session = document.querySelector(".session");
const numberCycle = document.querySelector(".numberCycle");

window.addEventListener("load", () => {
    for(let i =1 ;i<=60;i++){
        let span = document.createElement("span");
        if(i % 5){
            span.setAttribute("class","interval");
        }else{
            span.innerHTML = i / 5;
        }
        span.style.transform = `rotate(${i*6}deg)`;
        numberCycle.appendChild(span);
    }
    showTime();
})

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function showTime(){
    let currentDate = new Date();
    date.textContent = currentDate.getDate() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear();
    day.textContent = days[currentDate.getDay()];
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let sessions = hours >= 12 ? "PM" : "AM";
    session.textContent = sessions;
    hours = hours > 12? hours - 12 : hours;
    hours = hours == 0? 12 : hours;

    // 合并transform，保证指针底部对齐表盘中心
    hrHand.style.transform = `translate(-50%, -100%) rotate(${hours * 30 + minutes * 0.5}deg)`;
    mnHand.style.transform = `translate(-50%, -100%) rotate(${minutes * 6 + seconds * 0.1}deg)`;
    seHand.style.transform = `translate(-50%, -100%) rotate(${seconds * 6}deg)`;

    setTimeout(showTime,1000);
}