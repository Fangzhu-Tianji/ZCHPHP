


define("./js/module/switch.js", ["../../css/demo1.css","http://libs.baidu.com/jquery/2.0.0/jquery.min.js"], function (require, exports, modules) {
    // require("http://libs.baidu.com/jquery/2.0.0/jquery.min.js");
    $(function() {
		/*$("li").click(function() {
			$("li").each(function(index,domEle) {
				$(domEle).removeClass("active");
			})
			$(this).addClass("active");
		})
		$(".outtop").click(function() {
			$("html,body").animate({
				scrollTop: 0
			},400)
		});*/
		var common = {
			init: function() {
				common.switch();
				common.out();
			},
			switch: function() {
				$("li").click(function() {
					$("li").each(function(index,domEle) {
						$(domEle).removeClass("active");
					})
					$(this).addClass("active");
				})
			},
			out: function() {
				$(".outtop").click(function() {
					$("html,body").animate({
						scrollTop: 0
					},400)
				});
			}
		}
		common.init();
	});

})