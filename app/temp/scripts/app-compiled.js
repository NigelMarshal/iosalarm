!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){var o=JSON.parse(localStorage.getItem("formValues"))||{},r=$("#new-alarm__days-selector-wrapper :checkbox");r.on("change",function(){r.each(function(){o[this.id]=this.checked}),localStorage.setItem("formValues",JSON.stringify(o))}),$.each(o,function(e,t){$("#"+e).prop("checked",t)});var n,a,l=$(".new-alarm__hours-slider"),i=$(".new-alarm__minutes-slider"),u=$("#alarmHours"),s=$("#alarmMinutes");l.ionRangeSlider({type:"single",min:1,max:23,step:1,grid_snap:!0,grid_num:10,hide_min_max:!0,hide_from_to:!0,onChange:function(e){a=e.from,function(){u.prop("value",a),localStorage.setItem("StoreHours",a);let e=localStorage.getItem("StoreHours");console.log(e)}()}}),a=0,s.prop("value",0),localStorage.getItem("StoreHours")&&(u.prop("value",localStorage.getItem("StoreHours")),n=u.prop),hours=l.data("ionRangeSlider"),i.ionRangeSlider({type:"single",min:1,max:59,step:1,grid_snap:!0,grid_num:10,hide_min_max:!0,hide_from_to:!0,onChange:function(e){n=e.from,function(){s.prop("value",n),localStorage.setItem("StoreMinutes",n);let e=localStorage.getItem("StoreMinutes");console.log(e)}()}}),a=0,s.prop("value",0),localStorage.getItem("StoreMinutes")&&(s.prop("value",localStorage.getItem("StoreMinutes")),a=s.prop),minutes=i.data("ionRangeSlider");var c=new Audio("https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav");c.loop=!0;var p=document.getElementById("iphone-header__time");setInterval(function(){var e=new Date,t=e.getHours(),o=e.getMinutes();p.textContent=t+":"+o},1e3)}]);