$(document).ready(function() {
	$('video#html-video').mcvideo({
		hideControls: "hover"
	});
	
	$('#header ul').hide();
	
	$('h2 a').click(function(e) {
		e.preventDefault();
		$(this).parent().next('ul').slideToggle(500);
	});
	
	$('ul.video-list a').click(function(e) {
		e.preventDefault();
		var offset = $($(this).attr('href')).parent().offset().top;
	    $('html, body').animate({scrollTop: offset}, 600);
	});
	
	$('a.top').click(function(e) {
		e.preventDefault();
	     $('html, body').animate({scrollTop: '0px'}, 600);
	});
	
	//VIDEO 01
	var vars01 = {
		videoURL:"../video/oneill.mp4"
	};
	embedVideo(vars01, "video-01");
	
	//VIDEO 02
	var vars02 = {
		videoURL:"../video/oneill.mp4", 
		posterURL:"images/poster.jpg", 
		hideControls:"hover", 
		hideDelay:"3", 
		videoScale:"zoom"
	};
	embedVideo(vars02, "video-02");
	
	//VIDEO 03
	var vars03 = {
		videoURL:"../video/oneill.mp4", 
		videoScale:"zoom", 
		buttonColor:"0xFFFFFF", 
		controlBarColor:"0x5C9A58", 
		timelineColor:"0x000000"
	};
	embedVideo(vars03, "video-03");
	
	//VIDEO 04
	var vars04 = {
		videoURL:"../video/oneill.mp4", 
		hideControls:"always", 
		videoScale:"zoom"
	};
	embedVideo(vars04, "video-04");
	
	
	function embedVideo(vars, id) {
		var params = { 
			allowFullScreen:"true", 
			base:"", 
			bgcolor:"#000000", 
			menu:"false", 
			wmode:"opaque"
		}
		var attributes = {
			id: id
		}
		swfobject.embedSWF("flash/video-player.swf", id, "640", "380", "10.0.0", "", vars, params, attributes);
	};
});