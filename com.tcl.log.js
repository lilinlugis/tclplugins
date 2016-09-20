/*
 * 日志处理方法
 * 依赖 jquery
*/

/*
 * 浏览器控制台日志记录
 * o 需要记录的内容，
 * css 可选的CSS样式
 * 2016-9-18 李林禄
*/
function tcl_console(o,css){
	if(css){
		var v=(typeof o == 'string')?o:JSON.stringify(o);
		console.log("%c"+v,css);
	}else{
		console.log(o);
	}
}

/*
 * 服务器日志记录
 * data需要记录的数据，JSON格式,label标签，为日志打标签是为了日后查询使用
*/
function tcl_log(data,label){
	$.ajax({
		url:"http://m.tclking.com/service/log/save",
		type:"POST",
		data:data
	}).success(function(){
		tcl_console("log sended to server","color:gray;");
	});
}

/*
 * 查询指定的日志
 * label查询标签，callback回调处理方法
*/
function tcl_log_query(label,callback){
	$.ajax({
		url:"http://m.tclking.com/service/log/query",
		jsonp:"callback",
		dataType : "jsonp",
		type:"GET",
		cache:false
	}).success(function(data){
		callback(data);
	});
}