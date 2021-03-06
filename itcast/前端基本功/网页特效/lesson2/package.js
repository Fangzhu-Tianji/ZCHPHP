
function $(id){
	return document.getElementById(id);
};
function scroll() {
	if (window.pageYOffset != null) {	// IE9+ 与最新浏览器
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	}
	else if (document.compatMode == 'CSS1Compat')	// 声明了DTD
	// 检测是不是怪异的浏览器 -- 就是没有声明<!DOCTYPE html>
	{
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}
	return {
		left: document.body.scrollLeft,
		top: document.body.scrollTop
	}
};