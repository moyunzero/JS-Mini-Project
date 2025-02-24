const ageValue = document.getElementById('ageValue');
const calculateAge = document.getElementById('calculateAge');
const currentAge = document.getElementById('currentAge');
const DOB = document.getElementById('DOB');

const today = new Date();
const second = 1000;
const minutes = 60;
const hours = 24;
const week = 7;

let maxDate = today.toISOString().split('T')[0];
ageValue.max = maxDate;


calculateAge.addEventListener('click', function(){
    if(!ageValue.value) {
        alert('请输入出生日期');
        return;
    }

    if(ageValue.value === maxDate){
        alert('请输入有效日期');
    }

    let oneDay = hours * minutes * minutes * second;
    let oneHour = minutes * minutes * second;
    let oneMinute = minutes * second;

    if(ageValue.value !== ''){
        let birthDate = new Date(ageValue.value);
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        
        // 如果当前月份小于出生月份，需要从年份借一年
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // 计算天数
        let days = today.getDate() - birthDate.getDate();
        if (days < 0) {
            // 获取上个月的最后一天
            let lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
            months--;
            if (months < 0) {
                years--;
                months += 12;
            }
        }

        currentAge.innerHTML = `你的年龄是 ${years} 年 ${months} 月 ${days} 天`;

        DOB.innerHTML = `${birthDate.toLocaleDateString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`;
    }
});