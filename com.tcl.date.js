/*
 * 日期处理方法
 * 依赖 
*/

/**
 * 时间日期格式转换
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
 */
Date.prototype.format = function(fmt){
	if(!fmt){
		fmt="yyyy-MM-dd hh:mm:ss";
	}
	var o = {
		"M+" : this.getMonth()+1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth()+3)/3),
		"S"  : this.getMilliseconds()
	};
	if(/(y+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
}


/**
 * 时间个性化输出功能
 
 * 如果传入的时间小于当前时间：
 * 1、< 60s, 显示为“刚刚”
 * 2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
 * 3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
 * 4、>= 1day && < 2 day, 显示日期“昨天 XX:XX”
 * 5、>= 2day && < 3 day, 显示日期“前天 XX:XX”
 * 6、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
 
 * 如果传入的时间大于当前时间，类似
 
 * 一般用于当前时间跟某个时间作对比
 
 * 举例：new Date(1474167729952).pretyDiff(1474067629952);
*/
Date.prototype.pretyDiff=function(d){
	if(!(d instanceof Date)){
		try{
			d=new Date(d);
		}catch(e){
			return "参数错误";
		}		
	}
	if(isNaN(d.getTime())){
		return "参数错误";
	}
	var inTimePassed=false;//假设传入的是一个未来时间
	if(this.getTime()>=d.getTime()){
		inTimePassed=true;//传入的是一个过去的时间
	}
	
	var diffTime=Math.abs(this.getTime()-d.getTime());//时间差
	
	if(this.getFullYear()!=d.getFullYear()){
        return d.getFullYear() +'年'+ (d.getMonth()+1) +'月'+ d.getDate() +'日 '+ d.getHours() +':'+ d.getMinutes();
    }else{
		var oneMinite=60000;//一分钟
		var oneHour=60*oneMinite;//一小时
		var oneDay=24*oneHour;//一天
		if(diffTime<60000){
			return inTimePassed?"刚刚":"一会儿";
		}else if(diffTime<oneHour){
			var diffMinites=parseInt(diffTime/oneMinite);
			return inTimePassed?diffMinites+"分钟前":diffMinites+"分钟后";
		}else{
			//前后三天内：今天 XX:XX，昨天 XX:XX，前天 XX:XX；明天 XX:XX，后天 XX:XX
			//超过三天的：“XX月XX日 XX:XX”
			if(this.getMonth()==d.getMonth() && this.getDate()== d.getDate()){
				//今天的
				return "今天"+d.getHours()+":"+d.getMinutes();
			}else if(diffTime<oneDay){
				return (inTimePassed?"昨天":"明天")+d.getHours()+":"+d.getMinutes();
			}else if(diffTime<2*oneDay){
				return (inTimePassed?"前天":"后天")+d.getHours()+":"+d.getMinutes();
			}else{
				return (d.getMonth()+1) +'月'+ d.getDate() +'日 '+ d.getHours() +':'+ d.getMinutes();
			}
		}
	}
}

