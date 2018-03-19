var urlreset = document.referrer;
var alldays = {
    "Su": true,
    "Mo": true,
    "Tu": true,
    "We": true,
    "Th": true,
    "Fr": true,
    "Sa": true
};

function resetonload() {
    if (urlreset.endsWith("index.html") || ("/app/") ) {
        localStorage.setItem('StoreHours', 00);
        localStorage.setItem('StoreMinutes', 00);
        localStorage.setItem('MinsEndPosition', 00);
        localStorage.setItem('HoursEndPosition', 00);
        localStorage.setItem("formValues", JSON.stringify(alldays));
        location.reload();
    } else {
        console.log("Please enter values")
    }
}
resetonload();

//values to be put in the array

var storedhours,
    storedminutes,
    storedhoursposition,
    storedminutesposition,
    storedactivedays;

function alarmReset() {
    localStorage.setItem('StoreHours', 00);
    localStorage.setItem('StoreMinutes', 00);
    localStorage.setItem('MinsEndPosition', 00);
    localStorage.setItem('HoursEndPosition', 00);
    localStorage.setItem("formValues", JSON.stringify(alldays));
    location.reload();
}

//storage for values from slider
var $hours = $(".new-alarm__hours-slider"),
    $minutes = $(".new-alarm__minutes-slider"),
    $from = $("#alarmHours"),
    $to = $("#alarmMinutes"),
    $hev = $("hoursEndValue"),
    $mev = $("minutesEndValue"),
    hoursSliderPos = localStorage.getItem("HoursEndPosition"),
    hsp = hoursSliderPos,
    minsSliderPos = localStorage.getItem("MinsEndPosition"),
    msp = minsSliderPos;


//function to store slider position for hours

(function() {
    from = 0;
    $hev.prop("value", 0);
    if (localStorage.getItem("HoursEndPosition")) {
        $hev.prop("value", localStorage.getItem("HoursEndPosition"));
        from = $hev.prop;
    }
})();

var HoursEndPosition = function() {
    $hev.prop("value", finishHoursValue);
    localStorage.setItem('HoursEndPosition', finishHoursValue);
};


//function to store slider position for minutes

(function() {
    from = 0;
    $mev.prop("value", 0);
    if (localStorage.getItem("MinsEndPosition")) {
        $mev.prop("value", localStorage.getItem("MinsEndPosition"));
        from = $mev.prop;
    }
})();

var MinsEndPosition = function() {
    $mev.prop("value", finishMinutesValue);
    localStorage.setItem('MinsEndPosition', finishMinutesValue);
};


var updateValuesHours = function() {
    $from.prop("value", from);
    // storedhours = from;
    localStorage.setItem('StoreHours', from);
};

let localHours = localStorage.getItem("StoreHours");
console.log(localHours);

var updateValuesMinutes = function() {
    $to.prop("value", to);
    // storedminutes = to;
    localStorage.setItem('StoreMinutes', to);
};
let localMinutes = localStorage.getItem("StoreMinutes");
console.log(localMinutes);



//hours slider config
$hours.ionRangeSlider({
    type: "single",
    min: 00,
    max: 23,
    from: hsp,
    step: 1,
    grid_snap: true,
    grid_num: 10,
    hide_min_max: true,
    hide_from_to: true,
    onFinish: function(data) {
        finishHoursValue = data.from
        HoursEndPosition();
    },
    onChange: function(data) {
        from = data.from;
        hsp = data.from;
        updateValuesHours();
        // getHoursValues();
    },
});


(function() {
    from = 0;
    $to.prop("value", 0);
    if (localStorage.getItem("StoreHours")) {
        $from.prop("value", localStorage.getItem("StoreHours"));
        to = $from.prop;
    }
})();

hours = $hours.data("ionRangeSlider");


//minutes slider config
$minutes.ionRangeSlider({
    type: "single",
    min: 00,
    max: 59,
    from: msp,
    step: 1,
    grid_snap: true,
    grid_num: 10,
    hide_min_max: true,
    hide_from_to: true,
    onFinish: function(data) {
        finishMinutesValue = data.from
        MinsEndPosition();
    },
    onChange: function(data) {
        to = data.from;
        msp = data.from;
        updateValuesMinutes();
        // getMinutesValues();
    }
});

/* Get the checkboxes values based on the class attached to each check box */
// $("#buttonClass").click(function() {
//     getValueUsingClass();
// });
var days;

function getcheckboxvalue() {
    /* declare an checkbox array */
    var chkArray = [];

    /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
    $(".check:checked").each(function() {
        chkArray.push($(this).val());
    });

    /* we join the array separated by the comma */
    var selected;
    selected = chkArray.join(',');

    if (selected.length > 0) {
        days = chkArray;
        console.log(days);
    } else {
        // alert("Please choose a day"); 
        var alldays = {
            "Su": true,
            "Mo": true,
            "Tu": true,
            "We": true,
            "Th": true,
            "Fr": true,
            "Sa": true
        };
        localStorage.setItem("formValues", JSON.stringify(alldays));
    }
}

(function() {
    from = 0;
    $to.prop("value", 0);
    if (localStorage.getItem("StoreMinutes")) {
        $to.prop("value", localStorage.getItem("StoreMinutes"));
        from = $to.prop;
    }
})();

minutes = $minutes.data("ionRangeSlider");


//show time in header
var headerTime = document.getElementById('iphone-header__time');

// display current time
var currentTime = setInterval(function() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    headerTime.textContent = (hours) + ":" + (minutes) + "";
}, 1000);




function alarmSet() {
    getvalues();
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

        if (alarmTime == currentTime) {
            window.location = "alarm-ring.html";
        } else if (alarmTime == "null:null") {
            console.log("Cannot leave time as zero");
        } else {
            window.location = "index.html";
        }
    }, 1000);

}


function snooze() {
    localStorage.setItem('StoreMinutes', to);
    var localMinutes = parseInt(localStorage.getItem("StoreMinutes"));
    localStorage.setItem('localMinutes', localMinutes++)
    console.log(localMinutes);
};

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
    localStorage.setItem('alarmday', output);
}
let daysactive = localStorage.getItem("alarmday");


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




var alarmtimes = JSON.parse(localStorage.getItem('alarmtimeinfo')) || [];

document.getElementById("getallvalues").onclick = function getvalues() {

    getcheckboxvalue();

    alarmtimes.push({
        alarmhours: hsp,
        alarmminutes: msp,
        hourssliderposition: hsp,
        minutessliderposition: msp,
        active: true,
        daysofalarm: days
    });
    localStorage.setItem("alarmtimeinfo", JSON.stringify(alarmtimes));
    alert("Alarm time has been added!");
}