function alarmReset() {
    localStorage.removeItem('StoreHours');
    localStorage.removeItem('StoreMinutes');
    localStorage.removeItem('MinsEndPosition');
    localStorage.removeItem('HoursEndPosition');
    location.reload();
    alert("Values have been reset. Please reselect hours and minutes!");


}

//function for persistent checkbox     
var formValues = JSON.parse(localStorage.getItem('formValues')) || {};
var $checkboxes = $("#new-alarm__days-selector-wrapper :checkbox");

function updateStorage() {
    $checkboxes.each(function() {
        formValues[this.id] = this.checked;
    });

    localStorage.setItem("formValues", JSON.stringify(formValues));
}

$checkboxes.on("change", function() {
    updateStorage();
});

// On page load
$.each(formValues, function(key, value) {
    $("#" + key).prop('checked', value);
});


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
    localStorage.setItem('StoreHours', from);
    let localHours = localStorage.getItem("StoreHours");
    console.log(localHours);


};

var updateValuesMinutes = function() {
    $to.prop("value", to);
    localStorage.setItem('StoreMinutes', to);
    let localMinutes = localStorage.getItem("StoreMinutes");
    console.log(localMinutes);
};


//hours slider config
$hours.ionRangeSlider({
    type: "single",
    min: 00,
    max: 23,
    from: hsp,
    values: [
        "00", "01",
        "02", "03",
        "04", "05",
        "06", "07",
        "08", "09",
        "10", "11",
        "12", "13",
        "14", "15",
        "16", "17",
        "18", "19",
        "20", "21",
        "22", "23"
    ],
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
        updateValuesHours();
    }
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
    values: [
        "00", "01",
        "02", "03",
        "04", "05",
        "06", "07",
        "08", "09",
        "10", "11",
        "12", "13",
        "14", "15",
        "16", "17",
        "18", "19",
        "20", "21",
        "22", "23",
        "24", "25",
        "26", "27",
        "28", "29",
        "30", "31",
        "32", "33",
        "34", "35",
        "36", "37",
        "38", "39",
        "40", "41",
        "42", "43",
        "44", "45",
        "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56",
        "57", "58", "59",
    ],
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
        to = data.from
        updateValuesMinutes();
    }
});


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
            // console.log("wtf");
        }
    }, 1000);

}


function snooze() {
    //           $to.prop("value", to);
    // localStorage.setItem( 'StoreMinutes', to); 
    // let localMinutes = localStorage.getItem("StoreMinutes" + 5); 
    // console.log(localMinutes + 5); 
    localStorage.setItem('StoreMinutes', to);
    //convert string to integer
    var localMinutes = parseInt(localStorage.getItem("StoreMinutes"));
    localStorage.setItem('localMinutes', localMinutes++)
    console.log(localMinutes);
};

document.getElementById('css-switch').onclick = function() {
    document.getElementById('styles-white').href = 'temp/styles/styles-white.css';
};