

// This is subtitle editor for people who want to build up personal use srt from video.
// open index.html with browser.

// Want to build something that old computer can use,
// nodeJS is heavy for old computers.

// REF: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/round
// REF: https://bobbyhadz.com/blog/javascript-set-select-element-value

// Init value
var starttime = [];
var endtime = [];
var subs = [];

var select = document.getElementById('select_id');
select.value = '0';
//========================================

// 閉包含數
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
//========================================


// --------------------------------

const btn_b = document.getElementById('btn_b');

btn_b.addEventListener('click', function handleClick() {
	var option = select.options[select.selectedIndex];
	if (parseInt(option.value) === 0){
		select.value = '0';
	}
  	else{
		select.value = String(parseInt(option.value)-1);
  	}
	var option = select.options[select.selectedIndex];
	console.log(option.value)
});

const btn_f = document.getElementById('btn_f');

btn_f.addEventListener('click', function handleClick() {
	var option = select.options[select.selectedIndex];
	if (parseInt(option.value) === 3){
		select.value = '3';
	}
  	else{
		select.value = String(parseInt(option.value)+1);
  	}
	var option = select.options[select.selectedIndex];
	console.log(option.value)
});


function update() {
	var select = document.getElementById('select_id');
	var option = select.options[select.selectedIndex];
	console.log(option.value)
}
update();

// key Board listener
//========================================
let greetings = document.querySelector('p');
document.querySelector('input').addEventListener("keyup", captureInput);
function captureInput(e){
    greetings.innerText = (` ${e.target.value} `);
}
//========================================


// start & stop sub
//========================================
function startThisSub() {
	var video= document.getElementById("myvideo");
	console.log(Math.floor10(video.currentTime, -2));
	console.log('startThisSub');
	starttime.push(video.currentTime);
}

function endThisSub() {
	var video= document.getElementById("myvideo");
	console.log(Math.floor10(video.currentTime, -2));
	console.log('endThisSub');
	endtime.push(video.currentTime);
	subs.push(greetings.innerText);
	console.log(starttime, endtime, subs);
}
//========================================