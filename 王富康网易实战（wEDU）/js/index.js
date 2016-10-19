/*
* 2016 - 7 - 1 index basic function
*/

var isResizeing = false;
var tabChange = true;  //初始化为产品数据
var playMv = document.getElementById('playerMv'); 
//改变窗口大小时执行
window.onresize = function (){

    if(!isResizeing){  

        elAutoWidth(proLi);
        if(window.innerWidth < 1205){
            $('.mv-progress').style.display = 'none';
            $('.controls').style.display = 'none';
            playMv.setAttribute('controls',true);   
        }else{
            $('.mv-progress').style.display = 'block';
            $('.controls').style.display = 'block';
            playMv.removeAttribute('controls');
            if(playMv.paused){
                $('.c-play').style.display = 'block';
            }else{
                $('.c-play').style.display = 'none';
                setInterval(function(){
                    $('.startTime').innerHTML = changTime(playMv.currentTime);
                    var nowscale = playMv.currentTime/playMv.duration;
                    $('.progress-green').style.width = nowscale * 900 + 'px';
                },1000);
            } 
        }

        setTimeout(function(){
            isResizeing = false;
        },500);
    }
    isResizeing = true;

};

//---轮播------/
var oBanner = document.getElementById('J-banner');
var imgLi = oBanner.getElementsByTagName('li');   
var oCorner = document.getElementById('J-corner');
var iCorner = oCorner.getElementsByTagName('i');  //获取所有的角标节点
var timer = null; //设置定时器
var num = 0; //当前图片索引
/*DOM加载完毕后执行*/
window.onload = function(){
    
    //----关闭顶栏----/ 
	closeTopHeader();

    //---轮播图------/
    var imgList = document.getElementById('imglist'); 
    for(var i=0; i<iCorner.length; i++){
        iCorner[i].index = i;
        iCorner[i].onclick = function(){
            for(var i = 0; i<iCorner.length;i++){
                iCorner[i].className = '';          
                startMove(imgLi[i],'opacity',0,12);
                imgLi[i].style.display = 'none';    
            } 
            num = this.index; 
            this.className = 'current';
            imgLi[this.index].style.display = 'block';
            startMove(imgLi[this.index],'opacity',100,12);       
        }
    }
    timer =setInterval('autoplay()',5000);    
    imgList.onmouseover = function(){
        clearInterval(timer);
    };
    imgList.onmouseout = function(){
        timer =setInterval('autoplay()',5000);
    };

    //---关注---/
    var pop = $('.pop-box');
    var uGuanz = $('.u-guanz');
    var uGuanzHover = $('.u-guanz-hover');
      //已有关注缓存
    if(getCookie("followSuc")){
          uGuanz.style.display = 'none';
          uGuanzHover.style.display = 'block';
    }
    var gqx = $('.g-qx');
    gqx.onclick = function(){
        uGuanz.style.display = 'block';
        uGuanzHover.style.display = 'none';
        delCookie("followSuc");
    }; 
    uGuanz.onclick = function(e) {     
        stopEvent(e);          
        if (getCookie("loginSuc")) {//如果存在登录缓存
            var fUrl = 'http://study.163.com/webDev/attention.htm';
            var fres = createCORSRequest('GET',fUrl,null);
            //支持CORS跨域请求
            if(fres){
                fres.onload = function(){
                    if( fres.responseText == 1 ){
                        setCookie("followSuc",true,30);
                        uGuanz.style.display = 'none';
                        uGuanzHover.style.display = 'block';
                    }
                }
                fres.send();
            }   
                          
        }else{//不存在登录缓存
            var pLogin = $('.p-login');
            var error = $('.error');
            pop.style.display = 'block';
            pLogin.style.display = 'block';

            //---表单验证----

            //获取焦点
            formValidateFocus($('#username'), '账号');
            formValidateFocus($('#password'), '密码');
            //失去焦点
            formValidateBlur($('#username'), '用户名不能为空', error);
            formValidateBlur($('#password'), '密码不能为空', error);

            var loginBtn = $('.login-btn');
            var iconClose = $('.icon-close');
            loginBtn.onclick = function () {

                var URL = "http://study.163.com/webDev/login.htm?userName="+hex_md5($('#username').value)+"&password="+hex_md5($('#password').value);
                if($('#username').value !== "studyOnline"){
                    error.style.display = 'block';
                    error.innerText = '用户名不存在';
                    return;
                }else if($('#password').value !== "study.163.com"){
                    error.style.display = 'block';
                    error.innerText = '密码不存在';
                    return;
                }else{
                    error.style.display = 'none';
                    pop.style.display = 'none';
                }
                var lres = createCORSRequest('GET',URL,null);
                if(lres){
                    lres.onload = function(){
                        if(lres.responseText == 1){
                            setCookie('loginSuc', true, 30);
                        }
                    }
                    lres.send();
                }
                

            };
            iconClose.onclick = function () {
                pop.style.display = 'none';
                pLogin.style.display = 'none';
            }

        }
    };

    //视频弹窗
    var pMv = $('.p-mv');
    var timerMv = null;
    var disX = 0,disY = 0;
    $('.play-mv').onclick = function(e){
        
        pop.style.display = 'block';
        pMv.style.display = 'block';
        $('.endTime').innerHTML = changTime(playMv.duration); 
    };
    $('.pMV-close').onclick = function(e){
        pop.style.display = 'none';
        pMv.style.display = 'none';
        $('.c-play').style.display = 'block';
        playMv.pause();
    };
    //播放
    $('.c-play').onclick = function(e){
        //阻止事件冒泡
        stopEvent(e);
        playMv.play();
        this.style.display = 'none';
        $('.startTime').innerHTML = changTime(playMv.currentTime);
        timerMv = setInterval(function(){
            $('.startTime').innerHTML = changTime(playMv.currentTime);
            var nowscale = playMv.currentTime/playMv.duration;
            $('.progress-green').style.width = nowscale * 900 + 'px';
        },1000);
        
    };
    
    //暂停
    $('.paus').onclick = function(e){
        stopEvent(e);   
        playMv.pause();
        $('.c-play').style.display = 'block';
        clearInterval(timerMv);          
    };
    playMv.onprogress =function(e){
        
        $('.progress-buffer').style.width = playMv.buffered;
    };
    //静音
    $('.vol-icon').onclick = function(e){
        if( playMv.muted){

            playMv.volume = 1;
            playMv.muted = false;

        }else{
            playMv.volume = 0;           
            playMv.muted = true;
            
        }
    };
    
    //全屏
    $('.full-screen').onclick = function(){
        
        // playMv.width = window.innerWidth;
        // playMv.height = window.innerHeight;
        

    };
   
    //视频进度条
    $('.progress-green').onmousedown = function(e){
        var _this = this;
        var e = e || window.event;
        disX = e.clientX - _this.offsetWidth;
        document.onmousemove = function(e){
            var e = e || window.event;
            var L = e.clientX - disX;
            if( L<0){
                L = 0;
            }else if(L > $('.mv-progress').offsetWidth){
                L = 900 + 'px' ;
            }
            _this.style.width = L + 'px';
            var scale = L / $('.mv-progress').offsetWidth;
            //当前时间 = 比例*总时间
            playMv.currentTime = scale * playMv.duration;
            //当前的进度条也要变
            $('.startTime').innerHTML = changTime(playMv.currentTime);
            var nowscale = playMv.currentTime/playMv.duration;
            _this.style.width = nowscale * 900 + 'px';
        }
        document.onmouseup = function(e){
           document.onmousemove = null;
        }
        return false;  
    }
   
    //缓冲条  
    // $('.progress-buffer').style.width = playMv.buffered;
   
    //音量进度条
    $('.green-v').onmousedown = function(e){
        var _this = this;
        var e = e || window.event;
        disX = e.clientX - _this.offsetWidth;
        document.onmousemove = function(e){
            var e = e || window.event;
            var L = e.clientX - disX;
            if( L < 0){
                L = 0;
            }else if(L > $('.vol-slider').offsetWidth){
                L = 60 + 'px';
            }
            _this.style.width = L + 'px';
            var vscale = L / $('.vol-slider').offsetWidth;
            playMv.volume = vscale;
        }
        document.onmouseup = function(e){
           document.onmousemove = null;
        }
        return false;

    }

    //窗口小于1205则使用浏览器自带的视频控件
    if(window.innerWidth < 1205){
        $('.mv-progress').style.display = 'none';
        $('.controls').style.display = 'none';
        playMv.setAttribute('controls',true);

    }else{
        $('.mv-progress').style.display = 'block';
        $('.controls').style.display = 'block';
        playMv.removeAttribute('controls');
        if(playMv.paused){
            $('.c-play').style.display = 'block';
        } else{
            $('.c-play').style.display = 'none';
        } 
    }

    

    //------最热排行------/
    var mHotIn = $('.m-hot-in');
    var mHotList = mHotIn.getElementsByTagName('li');
    var hotUrl = "http://study.163.com/webDev/hotcouresByCategory.htm";

    var res = createCORSRequest('GET',hotUrl,null);
    if(res){
        res.onload = function(){
            var data = window.JSON.parse(res.responseText);
            var htmlList = '';
            for(var i=0;i<20;i++){
                var tmp  = data[i];
                htmlList+= '<li class="clearfix">'
                +'<div class="img">'
                +'<img src="'+tmp.smallPhotoUrl+'" alt=""/>'
                +'</div>'
                +'<div class="txt">'
                +'<h3>'+tmp.provider+'</h3>'
                + '<div class="moods-num">'
                +'<em class="num-icon"></em><em>'+tmp.learnerCount+'</em>'
                +'</div>'
                +'</div>'
                +'</li>';

            }
            mHotIn.innerHTML=htmlList;
        }
        res.send();
    } 
             
    // 每5秒滚动一次
    var mTimer =null;
    var mNum = 0;
    var mNum2 = 0;
    mTimer = setInterval(function(){
        
        if(mNum == 0){
            mHotIn.firstChild.style.position = 'static';
            mHotIn.firstChild.style.top = 0;
            mHotIn.style.top = 0;
            mNum2 = 0;
        }
        if(mNum == (mHotList.length/2) - 1){
            mNum = 0;
            mHotIn.firstChild.style.position = 'relative';
            mHotIn.firstChild.style.top = 70*(mHotList.length/2) + 'px';
        }else{
            mNum++;
        }
        mNum2++;
        startMove(mHotIn,'top',-mNum2*70,10);

    },5000);

    mHotIn.onmouseover = function(){
        clearInterval(mTimer);
    }
    mHotIn.onmouseout = function(){
        mTimer = setInterval(function(){
        
            if(mNum == 0){
                mHotIn.firstChild.style.position = 'static';
                mHotIn.firstChild.style.top = 0;
                mHotIn.style.top = 0;
                mNum2 = 0;
            }
            if(mNum == (mHotList.length/2) - 1){
                mNum = 0;
                mHotIn.firstChild.style.position = 'relative';
                mHotIn.firstChild.style.top = 70*(mHotList.length/2) + 'px';
            }else{
                mNum++;
            }
            mNum2++;
            startMove(mHotIn,'top',-mNum2*70,10);

        },5000);
    }


    //-----·分页-----/
    ifWidthPage();
    //产品
    $('#product').onclick = function () {
        tabChange = true;
        this.className = 'current';
        $('#programme').className = '';       
        proLiGet(1,20,10);  

    };
    //编程
    $('#programme').onclick = function () {
        tabChange = false;
        this.className = 'current';
        $('#product').className = '';     
        proLiGet(1,20,20);
    };


        
};
/*DOM end*/

var autoplay = function(){
    num++;
    if(num > iCorner.length -1){
        num = 0;
    }
    for(var i = 0; i<iCorner.length;i++){
        iCorner[i].className = '';          
        startMove(imgLi[i],'opacity',0,3);
        imgLi[i].style.display = 'none';    

    }  
    iCorner[num].className = 'current';
    imgLi[num].style.display = 'block';
    startMove(imgLi[num],'opacity',100,15);

}

var changTime = function(iNum){
        iNum = parseInt( Number(iNum) );
        var iH = toZero( Math.floor(iNum / 3600) ); //年
        var iM = toZero( Math.floor(iNum % 3600 / 60) ); //月
        var iS = toZero( Math.floor(iNum % 60) ); //日
        return iH + ':' + iM + ':' + iS;    
};
    
var toZero = function(num){
    num = Number(num);
    if(num <= 9){
        return '0' + num;
    }else{
        return '' + num;
    }
    return num;

};

function  ifWidthPage(){
   
    var pURL,countLi;
    pURL = 'http://study.163.com/webDev/couresByCategory.htm?';   
    var res = createCORSRequest('GET',pURL,{pageNo:1,psize:20,type:10});
    if(res){
        res.onload = function(){
            var data = window.JSON.parse(res.responseText); //json格式转化         
            countLi = Math.ceil(Number(data.totalCount)/20); //总页码
            page({
                id:'paginAtion',
                nowNum :1, //当前页
                allNum :countLi, //总页码
                callback:function(nowNum,allNum){
                    if(tabChange){
                        proLiGet(nowNum,20,10);  
                    }else{
                        proLiGet(nowNum,20,20);  
                    }              
                }
                               
            });
         }      
        res.send();
    } 
    
} 

function formValidateFocus(element,txt){
    element.onfocus = function(){
        if(this.value === txt){
            this.value = '';
        }
    }
}

function formValidateBlur(element,txt,errorElem){
    element.onblur = function(){
        if(!this.value){
            errorElem.style.display = 'block';
            errorElem.innerText = txt;
        }else{
            errorElem.style.display = 'none';
        }
    }   
}

function closeTopHeader(){
    var jrIcon = document.getElementById("j-r-icon");
    var jhc = document.getElementById("j-h-content");
    var isShow =  getCookie("isTips");
    if(isShow) jhc.style.display = "none";
    jrIcon.onclick = function(){
        jhc.style.display = "none";
        //设置顶栏缓存
        setCookie("isTips","true",30);
    }
}


