// 用来创建一个http服务器
var http = require('http');
// 创建一个服务
var server = http.createServer(function(request, response){
  var requestUrl = request.url;
	console.log(requestUrl);
  switch(requestUrl){
    case '/signin':
      signin(request, response);
      break;
    case '/post':
      post(request, response);
      break;
    default:
      response.writeHead(404,{});
      response.end();
      break;
  }

});
// 启动服务
server.listen(8888, function(error){
	console.log("启动成功，端口号是8888" );
});

function signin(request, response){
  console.log('请求登陆页面');
  response.end();
}
function post(request, response){
  console.log('表单提交');
  response.end();
}
