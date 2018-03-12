var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var d = new Date();
var days = ["SUN ", "MON ", "TUE ", "WED ", "THU ", "FRI ", "SAT "];

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
var currentTime = setInterval(function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    headerTime.textContent = (hours) + ":" + (minutes) + "";
    alarmTime.textContent = (hours) + ":" + (minutes) + "";
}, 1000);



//alarm sound

var sound = new Audio("https://freespecialeffects.co.uk/soundfx/clocks/clock_chime.wav");
sound.loop = true;

function ringAlarm() {
    sound.play();
}
window.onload = ringAlarm;

var updateValuesMinutes = function() {
    $to.prop("value", to);
    localStorage.setItem('StoreMinutes', to);
    //convert string to integer

};

function snooze() {
    let localMinutes = parseInt(localStorage.getItem("StoreMinutes"));
    localStorage.setItem('localMinutes', localMinutes += 5);
    localStorage.setItem('StoreMinutes', localMinutes);


    let localAMinutes = parseInt(localStorage.getItem("newStoreMinutes"));
    localStorage.setItem('localAMinutes', localAMinutes += 5);
    localStorage.setItem('newStoreMinutes', localAMinutes);

    window.location = "index.html";
}
document.getElementById('css-switch').onclick = function() {
    document.getElementById('styles-white').href = 'temp/styles/styles-white.css';
};