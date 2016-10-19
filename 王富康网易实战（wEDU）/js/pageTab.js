
var proBox = document.getElementById('pro-list');
var proLi = proBox.getElementsByTagName('li');
//数据加载
function proLiGet(pageNo,psizeNum,type){
    
    var pHtmlList = '';  //初始化一个HtMl
    var pURL = 'http://study.163.com/webDev/couresByCategory.htm?';
    var res1 = createCORSRequest('GET',pURL,{pageNo:pageNo,psize:psizeNum,type:type});
     if(res1){
        res1.onload = function(){
            var data = window.JSON.parse(res1.responseText); //json格式字符串转化
            for(var i=0;i<data.list.length;i++){
                var pData = data.list[i];
                pHtmlList += '<li>'
                    +'<div class="pro-info-box">'
                    +'<div class="c-img" onclick="disBlock(this)">'
                    +'<img src="'+pData.middlePhotoUrl+'" alt="">'
                    +'</div>'
                    +'<div class="c-txt">'
                    +'<h3><a href="javascript:void(0)">'+pData.provider+'</a></h3>'
                    +'<h4>'+pData.name+'</h4>'
                    +'<div class="c-rqz">'
                    +'<em class="ico"></em><em class="num">'+pData.learnerCount+'</em>'
                    +'</div>'
                    +'<div class="c-price">'
                    +'<em>￥</em><em>'+ (pData.price).toFixed(2)+'</em>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'<div class="pro-info-event-box">'
                    +'<div class="info-top">'
                    +'<div class="c-img" onmouseout="disNone(this)">'
                    +'<img src="'+pData.middlePhotoUrl+'" alt=""/>'
                    +'</div>'
                    +'<div class="info-content">'
                    +'<h3>'+pData.provider+'</h3>'
                    +'<div class="c-rqz">'
                    +'<em class="ico"></em><em class="num">'+pData.learnerCount+'</em>'
                    +'</div>'
                    +'<div class="in-account">'
                    +'<p class="provider">发布者：'+pData.provider+'</p>'
                    +'<p class="categoryName">分类：'+pData.categoryName+'</p>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'<div class="info-bottom">'
                    +'<div class="in-b-box">'
                    +'<P class="description">'+pData.description+'</P>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'</li>';

            }     
            proBox.innerHTML = pHtmlList;                      
            elAutoWidth(proLi);
        }
        res1.send();  
        var aA = $('#paginAtion').getElementsByTagName('a');
        for(var i = 0;i< aA.length;i++){
            if(hasClass(aA[i],'current')){
                // 事件代理
                aA[i].click();
            }
        }
    }

  
}

//动态生成页码
function page(opt){
    
    //dataset方法 IE11以下不兼容 ,这里就使用name做标识
    if(!opt.id) return false;
    var obj = document.getElementById(opt.id);
    var nowNum = opt.nowNum || 1 ;
    var allNum = opt.allNum || 5 ;
    var callback = opt.callback || function(){};

    //上一页
    if(nowNum >= 2){
        var oA = document.createElement('a');
        oA.className = 'icon-page-l';
        oA.style.marginRight = 8 + 'px'; 
        oA.name = nowNum -1;
        oA.innerHTML = '<em></em>';
        obj.appendChild(oA);

    }

    //首页
    if(nowNum >= 4 && allNum >=6){
        var oA = document.createElement('a');
        oA.name = 1;
        oA.innerHTML = '1'+' <span>...</span>';
        obj.appendChild(oA);
    }
    //中间部分页码,总页数小于等于5的情况下
    if(allNum <= 5){
        for(var i=1;i<=allNum;i++){
            var oA = document.createElement('a');
            oA.name = i;
            //如果是当前页，就加上current样式
            if( nowNum == i ){
                
                oA.setAttribute('class','current');
            }else{
                oA.className = '';
            }
            oA.innerHTML = i;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            obj.appendChild(oA);
        }
        //大于5的情况
    }else{
        for(var i=1;i<=5;i++){
            var oA = document.createElement('a');
            //当前页为1或2时
            if(nowNum == 1 || nowNum == 2){
                oA.name = i ;
                if(nowNum == i){
                    oA.setAttribute('class','current');
                    oA.innerHTML = i;
                }else{
                     oA.innerHTML = i;
                     oA.className = '';
                }

            }else if( (allNum - nowNum) == 0 || (allNum - nowNum) == 1){
               
                if((allNum - nowNum) == 0 && i == 5){
                    oA.setAttribute('class','current');
                    oA.innerHTML = allNum - 5 + i;
                }else if((allNum - nowNum) == 1 && i == 4){
                    oA.innerHTML = allNum - 5 + i;
                    oA.setAttribute('class','current');
                }else{
                     oA.innerHTML = allNum - 5 + i;
                     oA.className = ' ';
                }
                oA.name = allNum - 5 +i;
            }else{
                if( i == 3 ){          
                    oA.setAttribute('class','current');
                }else{
                    oA.className = '';
                }
                oA.name = nowNum - 3 + i ;
                oA.innerHTML = nowNum - 3 + i;
            }
                
            obj.appendChild(oA);
        }
    }
    //尾页
    if( allNum - nowNum >=3 && allNum >=6){
        var oA = document.createElement('a');
        oA.name = allNum;
        oA.innerHTML = '<span>...</span> '+allNum;
        obj.appendChild(oA);
    }
    //下一页
    if( allNum - nowNum >=1){
        var oA = document.createElement('a');
        oA.name = nowNum + 1;
        oA.className = 'icon-page-r';
        oA.style.marginLeft = 8 + 'px'; 
        oA.innerHTML = '<em></em>';
        obj.appendChild(oA);
    }
    
    callback(nowNum,allNum);
    //绑定点击事件
    var oA = obj.getElementsByTagName('a');
    for(var i = 0;i< oA.length;i++){
        oA[i].onclick = function(){
            var nowNum =parseInt(this.name);
            obj.innerHTML = '';
            page({
                id:opt.id,
                nowNum :nowNum,
                allNum :allNum,
                callback:callback             
            });
            
            if(window.innerWidth < 1205){
                if(document.body.scrollTop){
                    document.body.scrollTop = 1080;
                }else{
                    document.documentElement.scrollTop = 1080;
                }
            }else{
                if(document.body.scrollTop){
                    document.body.scrollTop = 1180;
                }else{
                    document.documentElement.scrollTop = 1180;
                }
            }
            
        }

    }
    
}

//窗口自适应
function elAutoWidth(el){

    if(window.innerWidth <= 1205 ){

        initPro(proLi,3);
        $('.tab-div').style.height = 1710 + 'px';

    }else{
        initPro(proLi,4);
        $('.tab-div').style.height = 1226 + 'px';
    }
}

function initPro(el,num){
    for(var i=0;i<el.length;i++){
        el.index = i;

        if((i + 1) % num ==0){
            el[i].style.marginRight = 0;
        }else{
            el[i].style.marginRight = '';
        }
    }

}

//浮层卡片
function disBlock(ele) {

    ele.parentNode.style.display = 'none';
    next(ele.parentNode).style.display = 'block';
}
function disNone(ele) {

    prev(ele.parentNode.parentNode).style.display = 'block';
    ele.parentNode.parentNode.style.display = 'none';
}




