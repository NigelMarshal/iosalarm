var url = document.referrer;

function appendContent() {

    // if (url === "http://localhost:3000/create-new-alarm.html") {
            // var n = str.endsWith("universe.");
          if (url.endsWith("new-alarm.html")){
        $(".alarm-timings:last").append('<div class="alarm-timings__time-row"><div class="alarm-timings__time-details"><p class="alarm-timings__alarm-time" id="newAlarmHours"></p><p class="alarm-timings__alarm-time">:</p><p class="alarm-timings__alarm-time" id="newAlarmMinutes"></p><span class="alarm-timings__date-text">Weekday</span></div><div class="alarm-timings__icon-wrapper"><a class="icon-settings" href="set-new-alarm.html"></a></div><div class="alarm-timings__alarm-toggle"><input id="ios-switch-6" class="ios-switch" type="checkbox" checked ><label for="ios-switch-6" class="ios-switch-label"></label></div></div>');
    } else {
        console.log("Please enter values")
    }
}

appendContent();

window.onload = function() {
    var hoursV = localStorage.getItem("StoreHours");
    var hoursV2 = localStorage.getItem("newStoreHours");

    var minutesV = localStorage.getItem("StoreMinutes");
    var minutesV2 = localStorage.getItem("newStoreMinutes");

    document.getElementById("alarmHours").innerHTML = hoursV;
    document.getElementById("alarmMinutes").innerHTML = minutesV;


    document.getElementById("newAlarmHours").innerHTML = hoursV2;
    document.getElementById("newAlarmMinutes").innerHTML = minutesV2;
}

$('.ios-switch').change(function() {
    if ($(this).is(":checked")) {
        $(this).closest('.alarm-timings__time-row').addClass('active-row');
        $(this).closest('.alarm-timings__time-row').removeClass('disabled-row');
    } else {
        $(this).closest('.alarm-timings__time-row').addClass('disabled-row');
        $(this).closest('.alarm-timings__time-row').removeClass('active-row');
    }
});


//show time in header
var headerTime = document.getElementById('iphone-header__time');

// display current time
var currentTime = setInterval(function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    headerTime.textContent = (hours) + ":" + (minutes) + "";
}, 1000);



function alarmSet2() {
    var hr2 = document.getElementById('newAlarmHours');
    var min2 = document.getElementById('newAlarmMinutes');

    var selectedHour2 = localStorage.getItem("newStoreHours");
    var selectedMin2 = localStorage.getItem("newStoreMinutes")

    var alarmTime2 = (selectedHour2) + ":" + (selectedMin2);
    console.log('alarmTime2:' + alarmTime2);
    document.getElementById('newAlarmHours').disabled = true;
    document.getElementById('newAlarmMinutes').disabled = true;

    var headerTime2 = document.getElementById('iphone-header__time');

    /*function to calcutate the current time 
    then compare it to the alarmtime 
    */

    setInterval(function() {

        var date2 = new Date();
        var hours2 = date2.getHours();
        var minutes2 = date2.getMinutes();

        var currentTime2 = headerTime.textContent = (hours2) + ":" + (minutes2) + "";

        if (alarmTime2 == currentTime2) {
            window.location = "alarm-ring.html";
        } else if (alarmTime2 == "null:null") {
            console.log("Cannot leave time as zero");
        } else {
            console.log("Test");
        }

    }, 1000);

}

function alarmSet() {
    var hr = document.getElementById('alarmHours');
    var min = document.getElementById('alarmMinutes');

    var selectedHour = localStorage.getItem("StoreHours");
    var selectedMin = localStorage.getItem("StoreMinutes")

    var alarmTime = (selectedHour) + ":" + (selectedMin);
    console.log('alarmTime:' + alarmTime);
    document.getElementById('alarmHours').disabled = true;
    document.getElementById('alarmMinutes').disabled = true;

    var headerTime = document.getElementById('iphone-header__time');

    /*function to calcutate the current time 
    then compare it to the alarmtime 
    */

    setInterval(function() {

        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        var currentTime = headerTime.textContent = (hours) + ":" + (minutes) + "";

        if (alarmTime == currentTime && (!$("div").hasClass('disabled-row'))) {
            window.location = "alarm-ring.html";
        }

    }, 1000);

}

setInterval(function() {
    document.getElementById("alarmCheck").click();
}, 1000)
setInterval(function() {
    document.getElementById("alarmCheck2").click();
}, 1000)