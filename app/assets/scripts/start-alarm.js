document.addEventListener('DOMContentLoaded', function alarmlist() {
    var alarmtimes = JSON.parse(localStorage.getItem("alarmtimeinfo"));
    var alarmlength = alarmtimes.length;

    for (var i = 0; i < alarmlength; i++) {

        var newElement = document.createElement('div');
        var queryurl = "?alarm=";
        newElement.className = "alarm-timings__time-row active-row";
        newElement.innerHTML = '<div class="alarm-timings__time-details"><p class="alarm-timings__alarm-time alarm-hours" id="alarmHours' + i + '"></p><p class="alarm-timings__alarm-time">:</p> <p class="alarm-timings__alarm-time alarm-minutes" id="alarmMinutes' + i + '"></p><span class="alarm-timings__date-text" id="alarmdays' + i + '"></span></div><div class="alarm-timings__icon-wrapper"><a class="icon-settings" id="editalarm' + i + ' "href="edit-alarm.html' + queryurl + i + '"></a> </div><div class="alarm-timings__alarm-toggle"><input id="ios-switch' + i + '" class="ios-switch" type="checkbox" checked><label for="ios-switch' + i + '" class="ios-switch-label"></label></div>';
        document.getElementsByClassName("alarm-timings")[0].appendChild(newElement);
        document.getElementById('alarmHours' + i + '').innerHTML = alarmtimes[i].alarmhours;
        document.getElementById('alarmMinutes' + i + '').innerHTML = alarmtimes[i].alarmminutes;
        document.getElementById('alarmdays' + i + '').innerHTML = alarmtimes[i].daysofalarm;

        $('.ios-switch').change(function() {
            if ($(this).is(":checked")) {
                $(this).closest('.alarm-timings__time-row').addClass('active-row');
                $(this).closest('.alarm-timings__time-row').removeClass('disabled-row');
            } else {
                $(this).closest('.alarm-timings__time-row').addClass('disabled-row');
                $(this).closest('.alarm-timings__time-row').removeClass('active-row');
            }
        });


    }
}, false);

//show time in header
var headerTime = document.getElementById('iphone-header__time');

// display current time
var currentTime = setInterval(function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    headerTime.textContent = (hours) + ":" + (minutes) + "";

}, 1000);



document.addEventListener('DOMContentLoaded', function alarmcheck() {
    var alarmtimes = JSON.parse(localStorage.getItem("alarmtimeinfo"));
    var alarmlength = alarmtimes.length;
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    currenttime = (hours) + ":" + (minutes) + "";

    for (var i = 0; i < alarmlength; i++) {
        var checkhours = document.getElementsByClassName("alarm-hours")[i].innerHTML;
        var checkminutes = document.getElementsByClassName("alarm-minutes")[i].innerHTML;
        var alarmTime = (checkhours) + ":" + (checkminutes);

        //console.log(document.getElementById('iphone-header__time').innerHTML);
    }

    setInterval(function() {
        console.log(currenttime);
        console.log('alarmTime:' + alarmTime);
        if (alarmTime == currenttime && (!$("div").hasClass('disabled-row'))) {
            window.location = "alarm-ring.html";
        }


    }, 1500);
}, false);



document.getElementById('css-switch').onclick = function() {
    document.getElementById('styles-white').href = 'temp/styles/styles-white.css';
};