
// function loadalarmvalues() {
var alarmtimes = JSON.parse(localStorage.getItem("alarmtimeinfo"));
var currentId = window.location.search;
currentId = currentId.replace("?alarm=", '');
var storedhours = (alarmtimes[currentId].alarmhours);
var storedminutes = (alarmtimes[currentId].alarmminutes);
var storedhoursposition = (alarmtimes[currentId].hourssliderposition);
var storedminutesposition = (alarmtimes[currentId].minutessliderposition);
var storedalarmdays = (alarmtimes[currentId].daysofalarm);
// }
// loadalarmvalues();
//show time in header
var headerTime = document.getElementById('iphone-header__time');

// display current time
var currentTime = setInterval(function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    headerTime.textContent = (hours) + ":" + (minutes) + "";
}, 1000);

//storage for values from slider
var $hours = $(".new-alarm__hours-slider"),
    $minutes = $(".new-alarm__minutes-slider"),
    $newhours = $("#newAlarmHours"),
    $newminutes = $("#newAlarmMinutes"),
    $nhev = $("hoursEndValue"),
    $nmev = $("minutesEndValue");


//function to store slider position for new hours

(function() {
    from = 0;
    $nhev.prop("value", 0);
    if (localStorage.getItem("NewHoursEndPosition")) {
        $nhev.prop("value", localStorage.getItem("NewHoursEndPosition"));
        from = $nhev.prop;
    }
})();

var NewHoursEndPosition = function() {
    $nhev.prop("value", newFinishHoursValue);
    localStorage.setItem('NewHoursEndPosition', newFinishHoursValue);
};


//function to store slider position for new minutes

(function() {
    from = 0;
    $nmev.prop("value", 0);
    if (localStorage.getItem("NewMinsEndPosition")) {
        $nmev.prop("value", localStorage.getItem("NewMinsEndPosition"));
        from = $nmev.prop;
    }
})();

var NewMinsEndPosition = function() {
    $nmev.prop("value", newFinishMinutesValue);
    localStorage.setItem('NewMinsEndPosition', newFinishMinutesValue);
};


var updateValuesHours = function() {
    $newhours.prop("value", from);
    localStorage.setItem('newStoreHours', from);
    let localHours = localStorage.getItem("newStoreHours");
    localStorage.setItem('newhoursalarm', localHours);
};

var updateValuesMinutes = function() {
    $newminutes.prop("value", to);
    localStorage.setItem('newStoreMinutes', to);
    let localMinutes = localStorage.getItem("newStoreMinutes");
    localStorage.setItem('newminutesalarm', localMinutes);
};


//hours slider config
$hours.ionRangeSlider({
    type: "single",
    min: 00,
    max: 23,
    from: storedhoursposition,
    step: 1,
    grid_snap: true,
    grid_num: 10,
    hide_min_max: true,
    hide_from_to: true,
    onFinish: function(data) {
        newFinishHoursValue = data.from
        NewHoursEndPosition();
    },
    onChange: function(data) {
        from = data.from;
        updateValuesHours();
    }
});


(function() {
    from = 0;
    $newminutes.prop("value", 0);
    if (localStorage.getItem("newStoreHours")) {
        $newhours.prop("value", localStorage.getItem("newStoreHours"));
        to = $newhours.prop;
    }
})();

hours = $hours.data("ionRangeSlider");


//minutes slider config
$minutes.ionRangeSlider({
    type: "single",
    min: 00,
    max: 59,
    from: storedminutesposition,
    step: 1,
    grid_snap: true,
    grid_num: 10,
    hide_min_max: true,
    hide_from_to: true,
    onFinish: function(data) {
        newFinishMinutesValue = data.from
        NewMinsEndPosition();
    },

    onChange: function(data) {
        to = data.from
        updateValuesMinutes();
    }
});


(function() {
    from = 0;
    $newminutes.prop("value", 0);
    if (localStorage.getItem("newStoreMinutes")) {
        $newminutes.prop("value", localStorage.getItem("newStoreMinutes"));
        from = $newminutes.prop;
    }
})();

minutes = $minutes.data("ionRangeSlider");





function alarmReset() {
    localStorage.setItem('newStoreHours', 00);
    localStorage.setItem('newStoreMinutes', 00);
    localStorage.removeItem('NewMinsEndPosition');
    localStorage.removeItem('NewHoursEndPosition');
    localStorage.removeItem('formValues');
    location.reload();


}


///checkbox

//function for persistent checkbox     
var formValues = JSON.parse(localStorage.getItem('formValues')) || {};
var $checkboxes = $("#new-alarm__days-selector-wrapper :checkbox");

function outputResult(isWeekday, isWeekend) {

    var output = "Today"
    if (isWeekday && isWeekend) output = "Both";
    else if (isWeekday) output = "Weekday";
    else if (isWeekend) output = "Weekend";
    localStorage.setItem('Alarm2day', output);
}

function checkDay() {

    var isWeekday = false;
    var isWeekend = false;

    $checkboxes.each(function() {
        if (this.checked) {
            if (this.id == "friday" || this.id == "saturday") isWeekend = true;
            else isWeekday = true;
        }
    });

    outputResult(isWeekday, isWeekend);
}

function updateStorage() {

    $checkboxes.each(function() {
        formValues[this.id] = this.checked;
    });

    localStorage.setItem("formValues", JSON.stringify(formValues));

    checkDay();
}

$checkboxes.on("change", function() {
    updateStorage();
});

// On page load
$.each(formValues, function(key, value) {
    $("#" + key).prop('checked', value);
});

function insertcheck() {

    $checkboxes.each(function() {
        storedalarmdays[this.id] = this.checked;
    });

    localStorage.setItem("storeddays", JSON.stringify(storedalarmdays));

}




function checkboxalarm() {

    $checkboxes.each(function() {
        storeddays[this.id] = this.checked;
    });
    localStorage.setItem("storedalarmdays", JSON.stringify(storeddays));

}

$checkboxes.on("change", function() {
    checkboxalarm();
});

// On page load
$.each(storeddays, function(key, value) {
    $("#" + key).prop('checked', value);
});

var resethours = localStorage.getItem("newhoursalarm");
var resetminutes = localStorage.getItem("newminutesalarm");

document.getElementById("getallvalues").onclick = function getvalues() {
    window.location.reload();
    alarmtimes.push({
        alarmhours: resethours,
        alarmminutes: resetminutes,
        hourssliderposition: resethours,
        minutessliderposition: resetminutes,
        active: true,
        daysofalarm: storedalarmdays
    });
    localStorage.setItem("alarmtimeinfo", JSON.stringify(alarmtimes));
    alert("Alarm time has been updated");

    // var storedhours = resethours;
    // alert(storedhours);

}


var storeddays = JSON.parse(localStorage.getItem('storedalarmdays')) || {};
var $checkboxes = $("#new-alarm__days-selector-wrapper :checkbox");

function setinitial() {
    document.getElementById("newAlarmHours").value = storedhours;
    document.getElementById("newAlarmMinutes").value = storedminutes;
}
setinitial();