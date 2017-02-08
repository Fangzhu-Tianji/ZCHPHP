
// 属性
//
// 方法
function Product(){
  // 名称
  this.name = '';
  // 价格
  this.price = 0;
  // 介绍
  this.jieshao = '';
  // 图片
  this.image = [{small:'',big:''},{small:'',big:''},{small:'',big:''}];
}
Product.prototype = {
  // 绑定产品信息
  bindBase: function(){
    $("#title").html(this.name);
  },
  // 绑定图片信息
  bindDOM: function(){
    var str = '';
    for(var i=0; i<this.image.length; i++){
      str += '<img src="'+ this.image[i].small +'" />'
    }
    return str;
  }
}
