(function($) {
	
	$.fn.mcvideo = function(options) {
      	var opts = $.extend({}, $.fn.mcvideo.defaults, options);

   		return this.each(function() {
			var $video = $(this);
			var $controls = $(
				'<div class="mc-video">' + 
					'<a class="mc-play" title="Play/Pause" href="#"><span>Play/Pause</span></a>' +  
					'<p class="mc-time">00:00</p>' +  
					'<div class="mc-timeline">' + 
						'<div class="mc-stream"></div>' + 
						'<div class="mc-progress"></div>' + 
					'</div>' + 
					'<p class="mc-remaining">00:00</p>' +  
					'<div class="mc-volume-bg">' + 
						'<div class="mc-volume"></div>' + 
					'</div>' +  
					'<div class="clear"></div>' +  
				'</div>'
			);
			$video.after($controls);
			$video.removeAttr('controls');
			$controls.hide();
			
			var $playPause = $('div.mc-video a.mc-play');
			var $time = $('div.mc-video p.mc-time');
			var $remaining = $('div.mc-video p.mc-remaining');
			var $timeline = $('div.mc-video div.mc-timeline');
			var $stream = $timeline.children('div.mc-stream');
			var $progress = $timeline.children('div.mc-progress');
			var $volumeBG = $('div.mc-video div.mc-volume-bg');
			var $volume = $volumeBG.children('div.mc-volume');
			
			var seeking = false;
			
			//PLAY/PAUSE CLICK
			$playPause.click(function(e) {
				e.preventDefault();
				$video.attr('paused') ? $video[0].play() : $video[0].pause();
			});
			
			//PLAY/PAUSE
			$video.bind('play', function() {
				$playPause.removeClass();
				$playPause.addClass('mc-pause');
			});
			$video.bind('pause', function() {
				$playPause.removeClass();
				$playPause.addClass('mc-play');
			});
			
			//TIME PROGRESS
			$video.bind('timeupdate', function() {
				var percent = $video.attr('currentTime') / $video.attr('duration');
				var time = Math.floor($video.attr('currentTime'));
				var duration = Math.floor($video.attr('duration'));
				if (!seeking)
					$progress.width(percent * $timeline.width());
				$time.text(formatTime(time));
				$remaining.text(formatTime(duration - time));
			});
			
			//SEEK
			function createSeek() {
				if ($video.attr('readyState')) {
					var duration = $video.attr('duration');
					$timeline.slider({
						value: 0, 
						step: 0.01, 
						orientation: 'horizontal', 
						range: 'min', 
						max: duration, 
						animate: true, 
						slide: function(e, ui) {
							seeking = true;
							var percent = ui.value / $video.attr('duration');
							$progress.width(percent * $timeline.width());
						}, 
						stop: function(e, ui) {
							seeking = false;
							$video.attr('currentTime', ui.value);
						}
					});
					if (opts.hideControls.toUpperCase() != "ALWAYS")
						$controls.show();
				} else {
					setTimeout(createSeek, 150);
				};
			};
			createSeek();
			
			//VOLUME
			//----- Slide -----//
			$volumeBG.slider({
				value: 0, 
				step: 0.2, 
				orientation: 'horizontal', 
				range: 'min', 
				max: 1, 
				animate: true, 
				slide: function(e, ui) {
					$video.attr('muted', false);
					$video.attr('volume', ui.value);
				}
			});
			//----- Change -----//
			$video.bind('volumechange', function() {
				var volume = Math.floor($video.attr('volume') * 100) / 100;
				volume = Math.ceil(volume * 5) + 1;
				$video.attr('muted') ? $volume.width(4.8) : $volume.width(volume * 4.8);
			});
			$video.attr('volume', 0.8);
			
			//HIDE CONTROLS
			if (opts.hideControls.toUpperCase() == "HOVER") {
				$video.parent().mouseover(function() {
					$controls.stop(true, true);
					$controls.animate({
						opacity: 1
					});
				});
				$video.parent().mouseout(function() {
					$controls.delay(opts.hideDelay * 1000).animate({
						opacity: 0
					}, 300);
				});
			};
		
			//FORMAT TIME
			function formatTime(seconds) {
				var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
				var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
				return m + ":" + s;
			};
    	});
  	};

	$.fn.mcvideo.defaults = {
		hideControls		: "NEVER", 
		hideDelay			: 3
	};

})(jQuery);