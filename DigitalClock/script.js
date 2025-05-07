const DigitalClock = document.getElementById("DigitalClock");
const DigitalDate = document.getElementById("DigitalDate");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const session = document.getElementById("session"); // AM/PM dropdown
const alarmName = document.getElementById("alarmName");
const setAlarmTime = document.getElementById("setAlarmTime"); // Div to display set alarm info
const setAlarm = document.getElementById("setAlarm"); // Button
const alarmIntervalDisplay = document.getElementById("alarmInterval"); // Display for countdown
const alarmRow = document.getElementById("alarmRow"); // Input row for setting alarm

let alarmTime = ''; // Stores the set alarm time string e.g., "07:30 AM"
let alarmClearInterval = null; // Stores the ID of the countdown interval
// let alarmAudio = new Audio('path/to/your/alarm-sound.mp3'); // Optional: Add an alarm sound
// To enable alarm sound, uncomment the line above and provide the correct path to your audio file.
// Alternatively, create an <audio> element in HTML and get it by ID.
let alarmAudio = null; // Initialize alarmAudio to null if sound is disabled or not yet configured.

window.addEventListener("load", () => {
    showTime(); // Initial call
    setInterval(showTime, 1000); // Start the clock interval ONCE

    for (let i = 1; i <= 12; i++) {
        let option = document.createElement("option");
        option.text = zeroPad(i);
        option.value = zeroPad(i);
        hours.appendChild(option);
    }
    for (let i = 0; i < 60; i++) {
        let option = document.createElement("option");
        option.text = zeroPad(i);
        option.value = zeroPad(i);
        minutes.appendChild(option);
    }
    // You might also want to populate the AM/PM session dropdown if it's not hardcoded in HTML
    // Example:
    // ['AM', 'PM'].forEach(s => {
    //     let option = document.createElement("option");
    //     option.text = s;
    //     option.value = s;
    //     session.appendChild(option);
    // });
});


function showTime() {
    const currentDateTime = new Date();
    DigitalDate.innerHTML = currentDateTime.toLocaleDateString();

    const h24 = currentDateTime.getHours(); // 0-23
    const m = currentDateTime.getMinutes();
    const s = currentDateTime.getSeconds();
    const ses = h24 >= 12 ? 'PM' : 'AM';

    let h12 = h24 % 12;
    h12 = h12 ? h12 : 12; // Convert 0 to 12 for 12 AM/PM

    DigitalClock.innerHTML = zeroPad(h12) + ":" + zeroPad(m) + ":" + zeroPad(s) + " " + ses;
}

setAlarm.addEventListener("click", () => {
    if (setAlarm.innerHTML == "Set Alarm") {
        if (alarmName.value.trim() !== "") {
            alarmTime = hours.value + ":" + minutes.value + " " + session.value;
            setAlarm.innerHTML = "Stop Alarm";
            alarmRow.style.display = "none";
            setAlarm.setAttribute("style", "background: red;");

            setAlarmTime.innerHTML = ""; // Clear previous if any

            let h5 = document.createElement("h5");
            h5.innerText = alarmName.value;
            setAlarmTime.appendChild(h5);

            let p = document.createElement("p");
            p.innerText = "Alarm set for: " + alarmTime; // Corrected typo and added context
            setAlarmTime.appendChild(p);

            // Start the countdown timer
            if (alarmClearInterval) clearInterval(alarmClearInterval); // Clear any existing interval
            getTimeDiff(); // Call once immediately to show countdown
            alarmClearInterval = setInterval(getTimeDiff, 1000);

            alarmName.setAttribute("style", ""); // Clear error style if any
        } else {
            alarmName.focus();
            alarmName.setAttribute("style", "border-bottom: 1px solid red;");
        }
    } else { // "Stop Alarm" was clicked
        stopAlarm();
    }
});

function stopAlarm() {
    setAlarm.innerHTML = "Set Alarm";
    alarmRow.style.display = "flex"; // Or 'block', depending on your layout
    setAlarm.setAttribute("style", "background: #78c1f3;"); // Or your default color
    setAlarmTime.innerText = "";
    // alarmName.value = ""; // Optionally clear the alarm name
    alarmIntervalDisplay.innerText = "";
    if (alarmClearInterval) {
        clearInterval(alarmClearInterval);
        alarmClearInterval = null;
    }
    alarmTime = '';
    if (alarmAudio) {
        alarmAudio.pause(); // Stop sound if playing
        alarmAudio.currentTime = 0; // Rewind sound
    }
}


function getTimeDiff() {
    if (!alarmTime) return; // No alarm set

    const now = new Date();

    const [timePart, period] = alarmTime.split(' '); // e.g., ["07:30", "AM"]
    const [alarmHourStr, alarmMinuteStr] = timePart.split(':'); // e.g., ["07", "30"]

    let alarmHour24 = parseInt(alarmHourStr);
    const alarmMinute = parseInt(alarmMinuteStr);

    if (period.toUpperCase() === 'PM' && alarmHour24 < 12) {
        alarmHour24 += 12;
    } else if (period.toUpperCase() === 'AM' && alarmHour24 === 12) { // 12 AM is 00 hours
        alarmHour24 = 0;
    }

    let targetAlarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHour24, alarmMinute, 0, 0);

    // If alarm time for today has already passed, set it for tomorrow
    if (targetAlarmDate < now) {
        targetAlarmDate.setDate(targetAlarmDate.getDate() + 1);
    }

    let timeDiffMs = targetAlarmDate - now; // Difference in milliseconds

    if (timeDiffMs <= 0) {
        alarmIntervalDisplay.innerHTML = "00:00:00";
        // TRIGER THE ALARM!
        if (alarmAudio) {
            alarmAudio.play().catch(e => console.error("Error playing sound:", e)); // Play sound
        }
        alert(`ALARM! Time for: ${alarmName.value}`);
        
        stopAlarm(); // Reset UI and clear interval
        return; // Exit
    }

    let msec = timeDiffMs;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    // msec -= ss * 1000; // Not really needed for display

    alarmIntervalDisplay.innerHTML = zeroPad(hh) + ":" + zeroPad(mm) + ":" + zeroPad(ss);
}

function zeroPad(d) {
    return String(d).padStart(2, '0');
}