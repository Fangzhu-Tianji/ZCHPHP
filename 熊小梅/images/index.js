$(function(){
	//插入视频
	var $video = $('#video');
	$video.on('click',function(){
		$(this).find('img').fadeOut(500).end().html('<embed width="980" height="578" align="middle" type="application/x-shockwave-flash" src="http://static.video.qq.com/TPout.swf?vid=n014110cmul&amp;auto=0" quality="high" allowscriptaccess="always">');

	})


	var $whylearn = $('#whylearn');
	$whylearn.find('li').each(function(index, el) {
		$(el).on('mouseover',function(){
			var This = $(this)
			setTimeout(function(){
				This.addClass('current').siblings().removeClass('current');
				$whylearn.find('.whylearn-ad').find('img').eq(index).css('z-index',2).stop().fadeTo('show',1).siblings().stop().css('z-index',1).fadeTo('slow',0);
			},300)
		})
	});

	var $learnhui = $('#learnhui-hd');
	var $learnhuiOff = true;
	$learnhui.find('li').hover(function(){
		$(this).toggleClass('current');
	})
	// 课程
	var $course = $('#course');
	function course(obj){
		var aLi = obj.find('li')
		aLi.hover(function() {
			$(this).find('.mask').stop().animate({top:0},500);
		}, function() {
			$(this).find('.mask').stop().animate({top:168},500);
		});
	}
	course($course)
	//就业方向
	var $jobdir=$('#jobdir-hd');
	var $jobdirOff = true;
		function jobdir(){
			$jobdir.find('.bg').animate({
				top: 0,
				opacity: 1},
				600, function() {
				$jobdir.find('.left1').animate({
					width: 386},
					400, function() {
					$jobdir.find('.left1').find('img').animate({
					opacity: 1,left:0},
					400)
				});
				$jobdir.find('.right2').delay(300).animate({
					width: 400},
					450, function() {
					$jobdir.find('.right2').find('img').animate({
					opacity: 1,right:0},
					400)
				});
				$jobdir.find('.left3').delay(600).animate({
					width: 381},
					500, function() {
					$jobdir.find('.left3').find('img').animate({
					opacity: 1,left:0},
					400)
				});
				$jobdir.find('.right4').delay(900).animate({
					width: 390},
					550, function() {
					$jobdir.find('.right4').find('img').animate({
					opacity: 1,right:0},
					400)
				});
			});
		}
	//学员作品展示
	var $slidepic = $('#slidepic');
	slidepic()
	function slidepic(){
		var aLi = $slidepic.find('li');
		var timer = null;
		var off = true;
		var pos = [
			{
				width:564,
				height:330,
				left:34,
				top:0,
				opacity:0,
				z:0
			},
			{
				width:564,
				height:330,
				left:34,
				top:0,
				opacity:0,
				z:1
			},
			{
				width:564,
				height:330,
				left:34,
				top:0,
				opacity:0,
				z:2
			},
			{
				width:564,
				height:330,
				left:34,
				top:79,
				opacity:0.8,
				z:3
			},
			{
				width:800,
				height:500,
				left:200,
				top:0,
				opacity:1,
				z:4
			},
			{
				width:564,
				height:330,
				left:605,
				top:79,
				opacity:0.8,
				z:3
			},
			{
				width:564,
				height:330,
				left:605,
				top:0,
				opacity:0,
				z:2
			},
			{
				width:564,
				height:330,
				left:34,
				top:0,
				opacity:0,
				z:1
			},
			{
				width:564,
				height:330,
				left:34,
				top:0,
				opacity:0,
				z:0
			}
		]
		$.each(pos, function(i, val) {
			aLi.eq(i).css('zIndex',pos[i].z).stop().animate(pos[i],500);
		});
		$slidepic.find('.prev').on('click',function(){
			if(off){
				off = false;
				fnMove(true)	
			}
		})
		$slidepic.find('.next').on('click',function(){
			if(off){
				off = false;
				fnMove(false)	
			}
		})
		function fnMove(b) {
			if(b){
				pos.push(pos.shift())
			}else{
				pos.unshift(pos.pop())
			}
			$.each(pos, function(i, val) {
				aLi.eq(i).css('zIndex',pos[i].z).stop().animate(pos[i],500,function(){
					off = true;
				});
			});
		}
		timer = setInterval(function(){
			fnMove(true)
		},5000)
		$slidepic.hover(function(){
			clearInterval(timer)
			$(this).find('.toggle').fadeIn();
		},function(){
			clearInterval(timer)
			timer = setInterval(function(){
				fnMove(true)
			},5000)
			$(this).find('.toggle').fadeOut();
		})
	}
	// 选择武汉
	var $wuhan = $('#wuhan')
	var $wuhanOff = true;
	function wuhan() {
		var aDiv = $wuhan.find('.box');
		var posOdd = [
			{
				left:-47,
				top:-121,
			},
			{
				left:234,
				top:307,
			},
			{
				left:658,
				top:-121,
			},
			{
				left:515,
				top:307,
			},
			{
				left:939,
				top:-121,
			},
			{
				left:1077,
				top:307,
			},
			{
				left:1358,
				top:-121,
			},
			{
				left:658,
				top:449,
			}
		]
		var posNew = [
			{
				left:234,
				top:22,
				opacity:1
			},
			{
				left:377,
				top:165,
				opacity:1
			},
			{
				left:515,
				top:22,
				opacity:1
			},
			{
				left:658,
				top:165,
				opacity:1
			},
			{
				left:796,
				top:22,
				opacity:1
			},
			{
				left:939,
				top:165,
				opacity:1
			},
			{
				left:1077,
				top:22,
				opacity:0.2
			},
			{
				left:234,
				top:307,
				opacity:0.2
			}
		]
		$.each(posOdd, function(i, val) {
			aDiv.eq(i).css(posOdd[i]);
		});
		$.each(posNew, function(i, val) {
			aDiv.eq(i).stop().animate(posNew[i],1000);
		});
		setTimeout(function(){
			aDiv.addClass('current')
		},1000)
		aDiv.hover(function() {
			$(this).find('span').stop().fadeIn(500).siblings().stop().fadeOut(500);
		}, function() {
			$(this).find('span').stop().fadeOut(500).siblings().stop().fadeIn(500);
		});
	}
	// 学员展示
	(function (){
		var $learnhui = $('#learnhui');
		var oUl = $learnhui.find('ul');
		play()
		function play(){
		    oUl.css('top', '0');
			oUl.animate({top: -40},500,function(){
				for(var i=0;i<1;i++){
	                oUl.find("li:first").appendTo(oUl);
	            }
				oUl.css('top', 0);
			});
		}
		timer = setInterval(play, 5000)
		$learnhui.hover(function() {
			clearInterval(timer)
		}, function() {
			clearInterval(timer)
			timer = setInterval(play, 5000)
		});
	})();
	// 传智博客
	var $wenti = $('#wenti-bd');
	var $wentiOff = true;
	function wenti(){
		var img = [264,283,290,246,221,283,258]
		var oUl = $wenti.find('ul');
		var aLi = $wenti.find('li');
		aLi.height(0);
		oUl.height(0).animate({
			height: 403},
			100, function() {
				aLi.each(function(i, el) {
				$(el).animate({
					height: 403},
					200*i, function() {
					$(this).find('img').height(0)
					var index = $(this).index()
					$(this).find('img').animate({
						height:img[index],
						opacity:1
					},100)
				});
			});
		});
	}
	$(window).on('scroll',function(){
		var wt = $(window).scrollTop()
		if(wt > $jobdir.offset().top - 400){
			if($jobdirOff){
				jobdir()
			}
			$jobdirOff = false;
		}
		if(wt > $learnhui.offset().top -200){
			if($learnhuiOff){
				$learnhui.find('li').addClass('current');
			}
			$learnhuiOff = false;			
		}
		if(wt > $wuhan.offset().top -170){
			if($wuhanOff){
				wuhan()
			}
			$wuhanOff = false;
		}
		if(wt > $wenti.offset().top -200){
			if($wentiOff){
				wenti()
			}
			$wentiOff = false;
		}
	})
});