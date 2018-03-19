var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var d = new Date();
var days = ["SUN ", "MON ", "TUE ", "WED ", "THU ", "FRI ", "SAT "];
var alarmtimes = JSON.parse(localStorage.getItem("alarmtimeinfo"));
var alarmlength = alarmtimes.length;
var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var currenttimealarm = (hours) + ":" + (minutes) + "";

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

today = mm + '/' + dd + '/' + yyyy;
document.getElementById('todayDate').innerHTML = days[d.getDay()] + today;



//show time in header
var headerTime = document.getElementById('iphone-header__time');
var alarmTime = document.getElementById('alarm-ring-time');
// display current time
var currenttimealarm = setInterval(function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    headerTime.textContent = (hours) + ":" + (minutes) + "";
    alarmTime.textContent = (hours) + ":" + (minutes) + "";
    console.log(alarmTime.textContent);
}, 1000);

var alarmtimes = JSON.parse(localStorage.getItem('alarmtimeinfo')) || [];

function snooze() {

    for (var i = 0; i < alarmlength; i++) {
        var checkalarmhours = (alarmtimes[i].alarmhours);
        var checkalarmminutes = (alarmtimes[i].alarmminutes);
        var checkalarmtimes = (checkalarmhours) + ":" + (checkalarmminutes);
    }
    if (checkalarmtimes !== alarmTime.textContent) {
        console.log("Not yet");
    } else {
        let snoozedtime = (checkalarmminutes += 5);
        if (checkalarmminutes > 54) {
            var checkalarmminutes = 0;
            checkalarmhours++;
        }
        alarmtimes.push({
            alarmhours: checkalarmhours,
            alarmminutes: snoozedtime,
            hourssliderposition: checkalarmhours,
            minutessliderposition: checkalarmminutes,
            active: true,
            daysofalarm: days
        });
        localStorage.setItem("alarmtimeinfo", JSON.stringify(alarmtimes));
        window.location = "index.html";
    }

    //console.log(document.getElementById('iphone-header__time').innerHTML);
}




//alarm sound

var sound = new Audio("https://freespecialeffects.co.uk/soundfx/clocks/clock_chime.wav");
sound.loop = true;

function ringAlarm() {
    sound.play();
}
window.onload = ringAlarm;

document.getElementById('css-switch').onclick = function() {
    document.getElementById('styles-white').href = 'temp/styles/styles-white.css';
};