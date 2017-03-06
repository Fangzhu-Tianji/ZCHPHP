// 用来创建一个http服务器
var http = require('http');
// 创建一个服务
var server = http.createServer(function(request, response){
	console.log(request.url);
	console.log(request.Cookie);
	// 处理请求和响应
	response.writeHead(200, {
		'Content-Type': 'text/html', // 告诉客户端我给你的是html
		'key1': 'value1'
	});
	// 往响应体中放数据（只能是字符串）
	response.write('<h1>Hello World</h1>');
	response.end();
});
// 启动服务
server.listen(8888, function(error){
	console.log("启动成功，端口号是8888" );
})