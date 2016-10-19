// 兼容良好的ByClassName
function getElementsByClassName(element,names){
	if(element.getElementsByClassName){
		return element.getElementsByClassName(names);
	}else{
		var elements = document.getElementsByTagName('*');
		var result = [];
		var element,
			  classNameStr,
			  flag;
		for(i = 0 ; element = elements[i];i++){
			classNameStr = '' +element.className+ '';
			flag = true;
			for(j=0 ,name;name = name[j];j++){
				if(classNameStr,indexOf(''+name+'') == -1){
					flag = false;
					break;
				}
			}
			if(flag){
				return result.push();
			}
		}
		return result;
	}
}
//元素选择器,可能不支持低版本浏览器
function $(arguments){
  var element = arguments;
	if(document.querySelector){   
      return document.querySelector(element);
  } else{
      return document.querySelectorAll(element);
  }
}

//事件监听
function addEvent(element, event, handler){
    if(element.addEventListener){
        return element.addEventListener(event,handler,!1);
    }
    else {
        return element.attachEvent('on' + event, handler);
    }
}

//阻止事件冒泡
function stopEvent(e){
        var e = e || window.event;
        if(e.stopPropagation){
            return e.stopPropagation();   
        } 
        e.cancelBubble = true; //兼容IE低版本
}

function fadeout (ele) {
    var stepLength = 1/50;
    if (!parseFloat(ele.style.opacity)) {
        ele.style.opacity = 1;
    }
    function step () {
        if (parseFloat(ele.style.opacity)-stepLength > 0) {
            ele.style.opacity = parseFloat(ele.style.opacity)-stepLength;
        } else {
            ele.style.opacity = 0;
            clearInterval(setIntervalId);
        }
    }
    var setIntervalId = setInterval(step, 20);
}

// 判断obj是否有此class
  function hasClass(obj,cls){  //class位于单词边界
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
   }
   //给 obj添加class
  function addClass(obj,cls){ 
    if(!this.hasClass(obj,cls)){ 
       obj.className += ' '+cls; 
    }
  }

  //移除obj对应的class
  function removeClass(obj,cls){ 
    if(hasClass(obj,cls)){ 
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
         obj.className = obj.className.replace(reg,' ');
    }
  }

  //过渡动画
  function startMove(obj,styleName,iTarget,num){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
                var now = 0;  
            if(styleName=='opacity'){
              now = Math.round((parseFloat(getStyle(obj,styleName))*100));
            }
            else{
              now = parseInt(getStyle(obj,styleName));
            }
            var speed = (iTarget-now)/num;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            if(now == iTarget){
              clearInterval(obj.timer);
            }
            else{

              if(styleName=='opacity'){
                obj.style.opacity = (now+speed)/100;
                obj.style.filter = 'alpha(opacity='+(now+speed)+')'
              }
              else{

                  obj.style[styleName] = now+speed+'px';
              }
          }

        },50);
    }
  

  function getStyle(obj,name){
  if(obj.currentStyle){
    return obj.currentStyle[name];
  }
  else{
    return getComputedStyle(obj,false)[name];
  }
}

function getByClass(oParent,name){
  var aClass = oParent.getElementsByTagName('*');
  var arlt = [];
  for(var i=0; i<aClass.length; i++)
  {
    if(aClass[i].className==name){
      arlt.push(aClass[i]);
    }
  }
  return arlt;
}

//设置缓存
function setCookie(c_name, value, expiredays){

    var exdate=new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());

}
 
//获取缓存
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return (arr[2]);
    else return null;
}
//删除缓存
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

 //数据通信
 
//跨域CORS方法
function createCORSRequest(method,url,options){
    var URL = url + serialize(options);     //url+查询参数序列号结果
    var xhr = new XMLHttpRequest(); //创建XHR对象 
    // CORS兼容IE8,9 
    if ("withCredentials" in xhr){  
      // 此时即支持CORS的情况  
      // 检查XMLHttpRequest对象是否有“withCredentials”属性  
      // “withCredentials”仅存在于XMLHTTPRequest2对象里  
      xhr.open(method,URL, true);  
   
    }else if (typeof XDomainRequest != "undefined"){   
      // 否则检查是否支持XDomainRequest，IE8和IE9支持  
      // XDomainRequest仅存在于IE中，是IE用于支持CORS请求的方式  
      xhr = new XDomainRequest();  
      xhr.open(method,URL);  
   
    }else{   
    // 否则，浏览器不支持CORS  
      xhr = null;  
   
    } 
    return xhr;

}
// 请求参数序列化，把对象转换为例如'name1=value1&name2=value2'的格式
function serialize(data) {
    if (!data) {return '';}
    var pairs = [];
    for(var name in data){
        if (!data.hasOwnProperty(name)) {continue;}     //判断对象自身是否有name属性
        if (typeof data[name] === 'function') {continue;}   //如果对象的值是一个函数，忽略
        var value = data[name].toString();
        //把字符串作为URI 组件进行编码。将转义用于分隔 URI 各个部分的标点符号
        name = encodeURIComponent(name);    
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}
  
function inserAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement,nextSibling);
    }
}

//判断对象是否存在,为兼容低版本浏览器方法
//找上一级兄弟
function next(node){
    if(node.nextElementSibling){
        return node.nextElementSibling;
    }else{
        return node.nextSibling;
    }
}
//找下一级兄弟
function prev(node){
    if(node.previousElementSibling){
        return node.previousElementSibling;
    }else{
        return node.previousSibling;
    }
}



  







