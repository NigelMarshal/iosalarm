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
    single,
    min = 0,
    max = 1000,
    to,
    from;



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
    min: 1,
    max: 23,
    step: 1,
    grid_snap: true,
    grid_num: 10,
    hide_min_max: true,
    hide_from_to: true,

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
    min: 1,
    max: 59,
    step: 1,

    grid_snap: true,
    grid_num: 10,
    hide_min_max: true,
    hide_from_to: true,

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

//alarm sound

var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav");
sound.loop = true;


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


    //when alarmtime is equal to currenttime then play a sound
    var headerTime = document.getElementById('iphone-header__time');

    /*function to calcutate the current time 
    then compare it to the alarmtime and play a sound when they are equal
    */

    setInterval(function() {

        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        var currentTime = headerTime.textContent = (hours) + ":" + (minutes) + "";

        if (alarmTime == currentTime) {
            window.location = "alarm-ring.html";
            sound.play();
        }

    }, 1000);

}

function alarmClear() {
    document.getElementById('alarmHours').disabled = false;
    document.getElementById('alarmMinutes').disabled = false;
    sound.pause();
}