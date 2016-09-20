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

/**
* 日期处理工具类
*/
/*
var date = new Date(); 
document.write("penngo test DateUtil.js=====================" + date + "<br/>");
document.write("date========================================" + date + "<br/>");
document.write("isLeapYear==================================" + DateUtil.isLeapYear(date) + "<br/>");
document.write("dateToStr===================================" + DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss', date) + "<br/>");
document.write("dateAdd('d', 2, date)=======================" + DateUtil.dateToStr('yyyy-MM-dd HH:mm:ss', DateUtil.dateAdd('d', 2, date)) + "<br/>");

var date2 = DateUtil.dateAdd('s', 3, date);
document.write("dateDiff('s', date, date2)==================" + DateUtil.dateDiff('s', date, date2) + "<br/>");
document.write("strToDate('2013-01-16 00:27:23')============" + DateUtil.strToDate('2013-01-16 00:27:23') + "<br/>");
document.write("strFormatToDate=============================" + DateUtil.strFormatToDate('yyyy-MM-dd HH:mm:ss', '2013-01-16 00:27:23') + "<br/>");
document.write("dateToLong==================================" + DateUtil.dateToLong(date) + "<br/>");
document.write("longToDate==================================" + DateUtil.longToDate(DateUtil.dateToLong(date)) + "<br/>");
document.write("isDate('2013-01-16 00:27:23', 'yyyy-MM-dd HH:mm:ss')=" + DateUtil.isDate('2013-01-16', 'yyyy-MM-dd') + "<br/>");

document.write("datePart====================================" + DateUtil.datePart('m', date) + "<br/>");
document.write("maxDayOfDate================================" + DateUtil.maxDayOfDate(date) + "<br/>");

===========penngo test DateUtil.js==========
date========================================Wed Jan 16 2013 01:14:23 GMT+0800 (中国标准时间)
isLeapYear==================================false
dateToStr===================================2013-01-16 01:14:23
dateAdd('d', 2, date)=======================2013-01-18 01:14:23
dateDiff('s', date, date2)==================3
strToDate('2013-01-16 00:27:23')============Wed Jan 16 2013 00:27:23 GMT+0800 (中国标准时间)
strFormatToDate=============================Wed Jan 16 2013 00:27:23 GMT+0800 (中国标准时间)
dateToLong==================================1358270063903
longToDate==================================Wed Jan 16 2013 01:14:23 GMT+0800 (中国标准时间)
isDate('2013-01-16 00:27:23', 'yyyy-MM-dd HH:mm:ss')=true
datePart====================================14
maxDayOfDate================================31
*/
var DateUtil = function(){

    /**
     * 判断闰年
     * @param date Date日期对象
     * @return boolean true 或false
     */
    this.isLeapYear = function(date){
        return (0==date.getYear()%4&&((date.getYear()%100!=0)||(date.getYear()%400==0))); 
    }
    
    /**
     * 日期对象转换为指定格式的字符串
     * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
     * @param date Date日期对象, 如果缺省，则为当前时间
     *
     * YYYY/yyyy/YY/yy 表示年份  
     * MM/M 月份  
     * W/w 星期  
     * dd/DD/d/D 日期  
     * hh/HH/h/H 时间  
     * mm/m 分钟  
     * ss/SS/s/S 秒  
     * @return string 指定格式的时间字符串
     */
    this.dateToStr = function(formatStr, date){
        formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
        date = arguments[1] || new Date();
        var str = formatStr;   
        var Week = ['日','一','二','三','四','五','六'];  
        str=str.replace(/yyyy|YYYY/,date.getFullYear());   
        str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
        str=str.replace(/MM/,date.getMonth()>9?(date.getMonth() + 1):'0' + (date.getMonth() + 1));   
        str=str.replace(/M/g,date.getMonth());   
        str=str.replace(/w|W/g,Week[date.getDay()]);   
      
        str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
        str=str.replace(/d|D/g,date.getDate());   
      
        str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
        str=str.replace(/h|H/g,date.getHours());   
        str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
        str=str.replace(/m/g,date.getMinutes());   
      
        str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
        str=str.replace(/s|S/g,date.getSeconds());   
      
        return str;   
    }

    
    /**
    * 日期计算  
    * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
    * @param num int
    * @param date Date 日期对象
    * @return Date 返回日期对象
    */
    this.dateAdd = function(strInterval, num, date){
        date =  arguments[2] || new Date();
        switch (strInterval) { 
            case 's' :return new Date(date.getTime() + (1000 * num));  
            case 'n' :return new Date(date.getTime() + (60000 * num));  
            case 'h' :return new Date(date.getTime() + (3600000 * num));  
            case 'd' :return new Date(date.getTime() + (86400000 * num));  
            case 'w' :return new Date(date.getTime() + ((86400000 * 7) * num));  
            case 'm' :return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());  
            case 'y' :return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());  
        }  
    }  
    
    /**
    * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
    * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
    * @param dtStart Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
    * @param dtEnd Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒 
    */
    this.dateDiff = function(strInterval, dtStart, dtEnd) {   
        switch (strInterval) {   
            case 's' :return parseInt((dtEnd - dtStart) / 1000);  
            case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
            case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
            case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
            case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
            case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
            case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
        }  
    }

    /**
    * 字符串转换为日期对象
    * @param date Date 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
    */
    this.strToDate = function(dateStr){
        var data = dateStr;  
        var reCat = /(\d{1,4})/gm;   
        var t = data.match(reCat);
        t[1] = t[1] - 1;
        eval('var d = new Date('+t.join(',')+');');
        return d;
    }

    /**
    * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
    * 
    */
    this.strFormatToDate = function(formatStr, dateStr){
        var year = 0;
        var start = -1;
        var len = dateStr.length;
        if((start = formatStr.indexOf('yyyy')) > -1 && start < len){
            year = dateStr.substr(start, 4);
        }
        var month = 0;
        if((start = formatStr.indexOf('MM')) > -1  && start < len){
            month = parseInt(dateStr.substr(start, 2)) - 1;
        }
        var day = 0;
        if((start = formatStr.indexOf('dd')) > -1 && start < len){
            day = parseInt(dateStr.substr(start, 2));
        }
        var hour = 0;
        if( ((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len){
            hour = parseInt(dateStr.substr(start, 2));
        }
        var minute = 0;
        if((start = formatStr.indexOf('mm')) > -1  && start < len){
            minute = dateStr.substr(start, 2);
        }
        var second = 0;
        if((start = formatStr.indexOf('ss')) > -1  && start < len){
            second = dateStr.substr(start, 2);
        }
        return new Date(year, month, day, hour, minute, second);
    }


    /**
    * 日期对象转换为毫秒数
    */
    this.dateToLong = function(date){
        return date.getTime();
    }

    /**
    * 毫秒转换为日期对象
    * @param dateVal number 日期的毫秒数 
    */
    this.longToDate = function(dateVal){
        return new Date(dateVal);
    }

    /**
    * 判断字符串是否为日期格式
    * @param str string 字符串
    * @param formatStr string 日期格式， 如下 yyyy-MM-dd
    */
    this.isDate = function(str, formatStr){
        if (formatStr == null){
            formatStr = "yyyyMMdd";    
        }
        var yIndex = formatStr.indexOf("yyyy");     
        if(yIndex==-1){
            return false;
        }
        var year = str.substring(yIndex,yIndex+4);     
        var mIndex = formatStr.indexOf("MM");     
        if(mIndex==-1){
            return false;
        }
        var month = str.substring(mIndex,mIndex+2);     
        var dIndex = formatStr.indexOf("dd");     
        if(dIndex==-1){
            return false;
        }
        var day = str.substring(dIndex,dIndex+2);     
        if(!isNumber(year)||year>"2100" || year< "1900"){
            return false;
        }
        if(!isNumber(month)||month>"12" || month< "01"){
            return false;
        }
        if(day>getMaxDay(year,month) || day< "01"){
            return false;
        }
        return true;   
    }
    
    this.getMaxDay = function(year,month) {     
        if(month==4||month==6||month==9||month==11)     
            return "30";     
        if(month==2)     
            if(year%4==0&&year%100!=0 || year%400==0)     
                return "29";     
            else     
                return "28";     
        return "31";     
    }     
    /**
    *    变量是否为数字
    */
    this.isNumber = function(str)
    {
        var regExp = /^\d+$/g;
        return regExp.test(str);
    }
    
    /**
    * 把日期分割成数组 [年、月、日、时、分、秒]
    */
    this.toArray = function(myDate)  
    {   
        myDate = arguments[0] || new Date();
        var myArray = Array();  
        myArray[0] = myDate.getFullYear();  
        myArray[1] = myDate.getMonth();  
        myArray[2] = myDate.getDate();  
        myArray[3] = myDate.getHours();  
        myArray[4] = myDate.getMinutes();  
        myArray[5] = myDate.getSeconds();  
        return myArray;  
    }  
    
    /**
    * 取得日期数据信息  
    * 参数 interval 表示数据类型  
    * y 年 M月 d日 w星期 ww周 h时 n分 s秒  
    */
    this.datePart = function(interval, myDate)  
    {   
        myDate = arguments[1] || new Date();
        var partStr='';  
        var Week = ['日','一','二','三','四','五','六'];  
        switch (interval)  
        {   
            case 'y' :partStr = myDate.getFullYear();break;  
            case 'M' :partStr = myDate.getMonth()+1;break;  
            case 'd' :partStr = myDate.getDate();break;  
            case 'w' :partStr = Week[myDate.getDay()];break;  
            case 'ww' :partStr = myDate.WeekNumOfYear();break;  
            case 'h' :partStr = myDate.getHours();break;  
            case 'm' :partStr = myDate.getMinutes();break;  
            case 's' :partStr = myDate.getSeconds();break;  
        }  
        return partStr;  
    }  
    
    /**
    * 取得当前日期所在月的最大天数  
    */
    this.maxDayOfDate = function(date)  
    {   
        date = arguments[0] || new Date();
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        var time = date.getTime() - 24 * 60 * 60 * 1000;
        var newDate = new Date(time);
        return newDate.getDate();
    }
    
    return this;
}();
