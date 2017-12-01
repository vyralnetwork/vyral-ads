
var waitBeforeRepeatEvent = (function () {
  var time_func = {};

  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
	var d = new Date();
	var t = d.getTime();
	var new_t = d.getTime() + ms;
    if ( ( time_func[uniqueId] && time_func[uniqueId] < t ) || !time_func[uniqueId]) {
		time_func[uniqueId] = new_t;
		callback();
    }
    
  };
})();
jQuery(document).ready(function(){
	Modernizr.on('videoautoplay', function(result) {
	  if (result) {
		// supported
	  } else {
		// not-supported
		TweenMax.set(".video_block",{className:"+=no_video"})
	  }
	});
})
jQuery(document).ready(function(){
	setUpLogoAnimation()
	setUpMessageAnimation()
})




var pcIniDate = new Date();
var offset = pcIniDate.getTimezoneOffset()*60*1000;
//var NYCtimeoffset = -400*60*1000;



var new_NYCtimeoffset = -(5*60)*60*1000; //(5 hours); 
//NYCtimeoffset is defined on the HTML to give an easy way to overwrite the countdown offset.
if(typeof(NYCtimeoffset) != "undefined" && NYCtimeoffset != ""){
	new_NYCtimeoffset = NYCtimeoffset;
}
//Coordinated with GMT Universal, which is 4 hours ahead NYC, so 15h GMT is 11am NYC
//this will be de fallback countdown date in case is not defined on the HTML:
new_countDownDate = "December 1, 2017 15:00:00"; 
//countDownDate is defined on the HTML to give an easy way to overwrite the countdown date.
if(typeof(countDownDate) != "undefined" && countDownDate != ""){
	new_countDownDate = countDownDate;
}
var countdownEndDate = new Date(new_countDownDate);
countdownEndDate.setTime(countdownEndDate.getTime() - offset - new_NYCtimeoffset);
var countdownEndDate_time = countdownEndDate.getTime();

//console.log(countdownEndDate_time)
var countdown_internval;

jQuery(document).ready(function(){
	// Update the count down every 1 second
	printDateCountdown()
	countdown_internval = setInterval(printDateCountdown, 1000);
})
function printDateCountdown(){

		
	  // Get todays date and time
	  var now = new Date();
	  now = now.getTime();

	  // Find the distance between now an the count down date
	  var distance = countdownEndDate_time - now;
	
	  // Time calculations for days, hours, minutes and seconds
	  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	  // Display the result in the element with id="demo"
	  
		if (distance >= 1000) {
			printDateValue(jQuery("#top_value_days"), days)
			printDateValue(jQuery("#top_value_hours"), hours)
			printDateValue(jQuery("#top_value_mins"), minutes)
			printDateValue(jQuery("#top_value_secs"), seconds)
		}

		if(days == 0){
			jQuery(".top_countdown").addClass("less_than_a_day");
		}else{
			jQuery(".top_countdown").removeClass("less_than_a_day");
		}
	  // If the count down is finished, write some text
	  if (distance < 1000) {
		//clearInterval(countdown_internval);
		jQuery(".top_countdown").addClass("less_than_a_day");
		jQuery("#top_value_days").html("00");
		jQuery("#top_value_hours").html("00");
		jQuery("#top_value_mins").html("00");
		jQuery("#top_value_secs").html("00");
		jQuery(".top_countdown").addClass("finished");
		jQuery(".banner_holder_block").addClass("timeout_finished");
		waitBeforeRepeatEvent(function(){
			setBonusValue()
		}, 5000, "setBonusValue");
	  }else{
		  jQuery(".top_countdown").removeClass("finished");
		  jQuery(".banner_holder_block").removeClass("timeout_finished");
	  }
	
}

function printDateValue(_target, _value){
	current_value = _target.attr("current_val");
	if(current_value != _value && typeof _value == 'number' && _value > -1){
		_target.attr("current_val", _value);
		if(parseInt(_value) < 10) _value = "0"+_value
		_target.html(_value)
		TweenMax.killTweensOf(_target);
		TweenMax.set(_target,{scale:.7 });
		TweenMax.to(_target,.5,{scale:1,  ease:Power3.easeOut});
	}else if(typeof _value != 'number' && _value < 0){
		_target.html("0")
	}
}


/** Bonus Values Countdown **/

var _pcIniDate = new Date();
var _offset = _pcIniDate.getTimezoneOffset()*60*1000;

function getDateDistance(_sent_date){
	//Coordinated with GMT Universal, with NYC variation calculated
	var _countdownEndDate = new Date(_sent_date);
	_countdownEndDate.setTime(_countdownEndDate.getTime() - _offset - new_NYCtimeoffset);
	var _countdownEndDate_time = _countdownEndDate.getTime();
	
	
	var _now = new Date();
	_now = _now.getTime();
	
	var _distance = _countdownEndDate_time - _now;
	
	return _distance;
}
function getBonusValue(){
	new_bonus_value = bonus_default_value;
	new_date_limit = "";
	if(bonus_values.length > 0)
		new_date_limit = bonus_values[0][0];
	for(b=0;b<bonus_values.length;b++){
		if(getDateDistance(bonus_values[b][0]) < 1000){
			new_bonus_value = bonus_values[b][1];
			if(b+1 <= bonus_values.length-1){
				new_date_limit = bonus_values[b+1][0];
			}
		}
	}
	return [new_bonus_value,new_date_limit];
}

function setBonusValue(){
	_getBonusValue = getBonusValue()
	if(_getBonusValue[1] != ""){
		//console.log(_getBonusValue[1])
		setNewCountdownLimit(_getBonusValue[1]);
	}
	jQuery(".bonus_value").html(_getBonusValue[0]);
	
	checkBannerDateStage()
}

function setNewCountdownLimit(date_str){
	var _new_countdown_limit = new Date(date_str);
	_new_countdown_limit.setTime(_new_countdown_limit.getTime() - _offset - new_NYCtimeoffset);
	//console.log(countdownEndDate_time)
	countdownEndDate_time = _new_countdown_limit.getTime();
	
}

var new_banner_stage_2_date = "December 2, 2017 11:00:00";
//NYCtimeoffset is defined on the HTML to give an easy way to overwrite the countdown offset.
if(typeof(banner_stage_2_date) != "undefined" && banner_stage_2_date != ""){
	new_banner_stage_2_date = banner_stage_2_date;
}
function checkBannerDateStage(){
	if(!jQuery(".banner_holder_block").hasClass("stage_2")){
		if(getDateDistance(new_banner_stage_2_date) < 1000 ){
			jQuery(".banner_holder_block").addClass("stage_2")
		}
	}
}

var bonus_internval;

jQuery(document).ready(function(){
	// Update the bonus every 30 second
	setBonusValue()
	bonus_internval = setInterval(setBonusValue, 30000);
})




var tl_logo_home = new TimelineMax()
function setUpLogoAnimation(){
	var logo_home = jQuery("#vyral_logo_svg")
	var line_1 = logo_home.find(".logo_svg_linea_1")
	var line_2 = logo_home.find(".logo_svg_linea_2")
	var line_3 = logo_home.find(".logo_svg_linea_3")
	var line_4 = logo_home.find(".logo_svg_linea_4")
	var line_5 = logo_home.find(".logo_svg_linea_5")
	var pieces_white = logo_home.find(".logo_white")
	TweenMax.set([line_1,line_2,line_3,line_4,line_5],{scaleX:1,scaleY:1, clearProps:"transformOrigin"})
	TweenMax.set(pieces_white,{scale:1,transformOrigin:"center center"})
	

	var logo_icon = jQuery(".vyral_icon")
	var countdown = jQuery(".top_countdown")
	var countdown_dateitems = countdown.find(".top_countdown_date_item,.top_countdown_date_item_dots,.time_ended_message")
	TweenMax.set(countdown,{perspective:600})
	TweenMax.set(countdown_dateitems,{transformOrigin:"50% 50% 30"})
	
	top_pieces = logo_home.find("#logo_svg_texto_top .logo_white")
	bottom_pieces = logo_home.find("#logo_svg_texto_bottom .logo_white")
	
		tl_logo_home = new TimelineMax({
			onComplete:function(){
				setUpLogoAnimation()
				//tl_logo_home.play(0)
			}	
		
		});
			
		tl_logo_home.set(line_2,{transformOrigin:"center bottom"})
				.set(line_3,{transformOrigin:"right center"})
				.set(pieces_white,{transformOrigin:"center center"})
				.set(top_pieces,{x:-3})
				
				.set(logo_home,{autoAlpha:1})
				.set(logo_icon,{autoAlpha:0,scale:0})
				
				.set(countdown_dateitems,{autoAlpha:0,rotationX:-90,rotationY:30})
				//.set(bottom_pieces,{x:0})
				.from(line_1,.3,{scaleX:0})
				.from(line_2,.3,{scaleY:0}, "=-.05")
				.from(line_3,.4,{scaleX:0}, "=-.05")
				.from(line_4,.3,{scaleY:0}, "=-.05")
				.from(line_5,.3,{scaleX:0}, "=-.05")

				.staggerFrom(pieces_white,.2,{scale:0, clearProps:"scale"}, .03, "=-.2")
			
				.staggerTo(top_pieces,.3,{x:0, ease:Power3.easeInOut, clearProps:"scale,x"}, .05, "=-.3")
				.set(pieces_white,{transformOrigin:"center center"})

				.set(line_1,{transformOrigin:"right center", delay:1})
				.set(line_2,{transformOrigin:"center top"})
				.set(line_3,{transformOrigin:"left center"})
				.set(line_4,{transformOrigin:"center bottom"})
				.set(line_5,{transformOrigin:"right center"})
				.to(line_1,.2,{scaleX:0})
				.to(line_2,.2,{scaleY:0}, "=-.05")
				.to(line_3,.3,{scaleX:0}, "=-.05")
				.to(line_4,.2,{scaleY:0}, "=-.05")
				.to(line_5,.2,{scaleX:0}, "=-.05")
				.set(pieces_white,{transformOrigin:"center center"})
				.staggerTo(pieces_white,.3,{scale:0, ease:Power3.easeInOut}, .03, "=-.4")
				.to(logo_home,.5,{autoAlpha:0, ease:Power3.easeOut})
				.to(logo_icon,.5,{autoAlpha:1,scale:1, ease:Power3.easeOut}, "-=.5")
				
				.staggerTo(countdown_dateitems,.5,{autoAlpha:1,rotationX:0,rotationY:0, ease:Back.easeOut},.05, "=-.4")
				.set(countdown_dateitems,{delay:6,clearProps:"opacity"})
				
				.staggerTo(countdown_dateitems,.5,{autoAlpha:0,rotationX:90, ease:Power3.easeInOut},.05)
				.to(logo_icon,.5,{autoAlpha:0,scale:0, ease:Power3.easeInOut}, "=-.4")
		

}


var tl_messages = new TimelineMax()
function setUpMessageAnimation(){
	var center_message_1 = jQuery(".center_message_1")
	var center_message_2 = jQuery(".center_message_2")

	

	TweenMax.set(".banner_center_block",{perspective:600})
	TweenMax.set(center_message_1,{transformOrigin:"50% 50% 30"})
	TweenMax.set(center_message_2,{transformOrigin:"50% 50% 30"})

	
		tl_messages = new TimelineMax({
			onComplete:function(){
				tl_messages.play(0)
			}
		});
			
		tl_messages.set(center_message_1,{autoAlpha:0,rotationX:-90})
				.set(center_message_2,{autoAlpha:0,rotationX:-90})


				.to(center_message_1,.8,{autoAlpha:1,rotationX:0, ease:Back.easeOut})
				.to(center_message_1,.5,{delay:3,autoAlpha:0,rotationX:90, ease:Power3.easeInOut})
				
				.to(center_message_2,.8,{autoAlpha:1,rotationX:0, ease:Back.easeOut})
				.to(center_message_2,.5,{delay:2,autoAlpha:0,rotationX:90, ease:Power3.easeInOut})
		

}



