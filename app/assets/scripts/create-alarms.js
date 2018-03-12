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
newHoursSliderPos = localStorage.getItem("NewHoursEndPosition"),
    nhsp = newHoursSliderPos,
    newMinsSliderPos = localStorage.getItem("NewMinsEndPosition"),
    nmsp = newMinsSliderPos;


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
    console.log(localHours);
};

var updateValuesMinutes = function() {
    $newminutes.prop("value", to);
    localStorage.setItem('newStoreMinutes', to);
    let localMinutes = localStorage.getItem("newStoreMinutes");
    console.log(localMinutes);
};


//hours slider config
$hours.ionRangeSlider({
    type: "single",
    min: 00,
    max: 23,
    from: nhsp,
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
    from: nmsp,
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




function alarmSet() {
    var hr = document.getElementById('newAlarmHours');
    var min = document.getElementById('newAlarmMinutes');

    var selectedHour = localStorage.getItem("newStoreHours");
    var selectedMin = localStorage.getItem("newStoreMinutes")

    var alarmTime = (selectedHour) + ":" + (selectedMin);
    var headerTime = document.getElementById('iphone-header__time');

    /*function to calcutate the current time 
    then compare it to the alarmtime 
    */

    setInterval(function() {

        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        var currentTime = headerTime.textContent = (hours) + ":" + (minutes) + "";

        if (alarmTime == currentTime) {
            window.location = "alarm-ring.html";
        } else if (alarmTime == "null:null") {
            console.log("Cannot leave time as zero");
        } else {
            window.location = "index.html";
        }

    }, 1000);

}

function alarmReset() {
    localStorage.setItem('newStoreHours', 00);
    localStorage.setItem('newStoreMinutes', 00);
    localStorage.removeItem('NewMinsEndPosition');
    localStorage.removeItem('NewHoursEndPosition');
    localStorage.removeItem('formValues');
    location.reload();


}

document.getElementById('css-switch').onclick = function() {
    document.getElementById('styles-white').href = 'temp/styles/styles-white.css';
};

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

document.getElementById("alarm2day").textContent = localStorage.getItem("Alarm2day");