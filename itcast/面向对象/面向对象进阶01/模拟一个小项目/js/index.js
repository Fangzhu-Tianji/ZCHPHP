// 页面逻辑层
$(function(){
// 实例化对象(产品区域)
var product = new Product();
product.name = '这是一个产品的标题';
product.price = 1200;
product.jieshao = '棒棒的，棒棒的，登山一流，服务一流，你好，我好，他也好，太棒了，一口气等上珠穆朗玛峰';
product.image = [
  {
    small: 'http://www.qqpk.cn/Article/UploadFiles/201311/20131119114318513.jpg',
    big: 'http://dynamic-image.yesky.com/600x-/uploadImages/upload/20140826/zbvcfxj2sl4jpg.jpg'
  },
  {
    small: 'http://www.qqpk.cn/Article/UploadFiles/201010/2010101323493651.jpg',
    big: 'http://p.3761.com/pic/73681434156174.jpg'
  },
  {
    small: 'http://www.qqpk.cn/Article/UploadFiles/201311/20131119114318513.jpg',
    big: 'http://dynamic-image.yesky.com/600x-/uploadImages/upload/20140826/zbvcfxj2sl4jpg.jpg'
  }
]

//product.bindDOM();
$(".box-in").html(product.bindDOM());


// 实例化对象(绑定购物车)
var cart = new Cart();
// 绑定基本信息
cart.bindBase();
// 绑定产品列表
cart.bindList();





})
