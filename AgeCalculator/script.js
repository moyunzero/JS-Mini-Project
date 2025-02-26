// 获取DOM元素
// 输入相关元素
const ageValue = document.getElementById('ageValue');           // 日期输入框
const calculateAge = document.getElementById('calculateAge');   // 计算按钮
const currentAge = document.getElementById('currentAge');      // 当前年龄显示
const DOB = document.getElementById('DOB');                    // 出生日期显示

// 时间统计相关元素
const InYears = document.getElementById('InYears');           // 年份显示
const InMonths = document.getElementById('InMonths');         // 月份显示
const InDays = document.getElementById('InDays');            // 天数显示
const InWeeks = document.getElementById('InWeeks');          // 周数显示
const InHours = document.getElementById('InHours');          // 小时显示
const InMinutes = document.getElementById('InMinutes');      // 分钟显示
const InSeconds = document.getElementById('InSeconds');       // 秒数显示
const nextBirthDaysLeft = document.getElementById('nextBirthDaysLeft');  // 下次生日倒计时

// 获取当前日期
const today = new Date();

// 时间单位常量（毫秒转换）
const second = 1000;                  // 1秒 = 1000毫秒
const minutes = 60;                   // 1分钟 = 60秒
const hours = 24;                     // 1天 = 24小时
const week = 7;                       // 1周 = 7天

// 设置日期输入框的最大值为今天（防止选择未来日期）
let maxDate = today.toISOString().split('T')[0];
ageValue.max = maxDate;

// 添加计算按钮点击事件监听器
calculateAge.addEventListener('click', function(){
    // 验证是否输入日期
    if(!ageValue.value) {
        alert('请输入出生日期');
        return;
    }

    // 验证日期是否为今天（防止计算0岁）
    if(ageValue.value === maxDate){
        alert('请输入有效日期');
    }

    // 计算时间单位（毫秒）
    let oneDay = hours * minutes * minutes * second;      // 一天的毫秒数
    let oneHour = minutes * minutes * second;            // 一小时的毫秒数
    let oneMinute = minutes * second;                    // 一分钟的毫秒数

    // 当输入了有效日期时进行计算
    if(ageValue.value !== ''){
        // 创建出生日期对象
        let birthDate = new Date(ageValue.value);
        
        // 计算年龄（年、月）
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        
        // 计算总月数
        let totalMonths = (years * 12) + months;

        // 处理月份为负数的情况（需要从年份借一年）
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // 计算具体天数
        let days = today.getDate() - birthDate.getDate();
        if (days < 0) {
            // 获取上个月的最后一天
            let lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
            months--;
            // 如果月份变为负数，需要再次调整年份
            if (months < 0) {
                years--;
                months += 12;
            }
        }

        // 更新年龄显示
        currentAge.innerHTML = `你的年龄是 ${years} 年 ${months} 月 ${days} 天`;

        // 更新出生日期显示（使用中文格式）
        DOB.innerHTML = `${birthDate.toLocaleDateString('zh-CN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`;

        // 使用时间戳计算更精确的时间差
        let timeDiff = today.getTime() - birthDate.getTime();
        
        // 计算各个时间单位
        let totalDays = Math.floor(timeDiff / (24 * 60 * 60 * 1000));    // 总天数
        let totalWeeks = Math.floor(totalDays / 7);                       // 总周数
        let totalHours = Math.floor(timeDiff / (60 * 60 * 1000));        // 总小时数
        let totalMinutes = Math.floor(timeDiff / (60 * 1000));           // 总分钟数
        let totalSeconds = Math.floor(timeDiff / 1000);                   // 总秒数

        // 更新时间统计显示
        InDays.innerHTML = totalDays;
        InWeeks.innerHTML = totalWeeks;
        InHours.innerHTML = totalHours;
        InMinutes.innerHTML = totalMinutes;
        InSeconds.innerHTML = totalSeconds;

        // 计算下一个生日还剩多少天
        let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        // 如果今年的生日已过，计算明年的生日
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        let daysToNextBirthday = Math.ceil((nextBirthday - today) / (24 * 60 * 60 * 1000));
        nextBirthDaysLeft.innerHTML = daysToNextBirthday;
    }
});