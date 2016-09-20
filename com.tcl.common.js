/*
 * 通用处理方法
 * 依赖
 * 2016-9-18 李林禄
*/

/*
 * 根据URL获取参数，兼容HASH
 * q地址栏参数，val如果没有对应参数返回的默认值，url 指定的地址链接-如果没有传入则取当前地址
*/
function urlParam (q, val, url) {
  url =!url? document.location + '':'';
  if(val===undefined){
	val="";
  }
  var reg = new RegExp("[?#&](" + q + ")=([^&?#]+)", "i");
  var re = reg.exec(url);
  if (re){
	  return decodeURIComponent(re[2].replace(/[+]/g,' '));
  }
  else {
	  return val;//没找到返回默认值或空串
  }
};
//完美判断是否为网址
function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }else {
        return false;
    }
}
/**
 * 版本比较 VersionCompare
 * @param {String} currVer 当前版本.
 * @param {String} promoteVer 比较版本.
 * @return {Boolean} false 当前版本小于比较版本返回 true.
 *
 * 使用
 * VersionCompare("6.3","5.2.5"); // false.
 * VersionCompare("6.1", "6.1"); // false.
 * VersionCompare("6.1.5", "6.2"); // true.
 */
function versionCompare(currVer, promoteVer) {
    currVer = currVer || "0.0.0";
    promoteVer = promoteVer || "0.0.0";
    if (currVer == promoteVer) return false;
    var currVerArr = currVer.split(".");
    var promoteVerArr = promoteVer.split(".");
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
        var proVal = ~~promoteVerArr[i],
            curVal = ~~currVerArr[i];
        if (proVal < curVal) {
            return false;
        } else if (proVal > curVal) {
            return true;
        }
    }
    return false;
};


(function(){
	//判断是否移动设备
	navigator.isMobile=function(){
		if (typeof this._isMobile === 'boolean'){
			return this._isMobile;
		}
		
		var screenWidth = window.screen.width/window.devicePixelRatio;
		var isMobileScreenSize = screenWidth < 600;
		
		this._isMobile = isMobileScreenSize && navigator.isTouchScreen() && navigator.isMobileUserAgent();
		
		return this._isMobile;
	}

	//判断是否移动设备访问
	navigator.isMobileUserAgent=function(){
		return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
	}
	//判断是否苹果移动设备访问
	navigator.isAppleMobile=function(){
		return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
	}
	//判断是否安卓移动设备访问
	navigator.isAndroid=function(){
		return (/android/i.test(navigator.userAgent.toLowerCase()));
	}
	//判断是否Touch屏幕
	navigator.isTouchScreen=function(){
		return (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);
	}
})();


//TODO:判断是否为有效数值
function isNumber(v){
	return true;
}
/**
 * 金额大写转换函数
 * 输入要转换的金额，必须为数值型
*/
function upperMoney(tranvalue) {
	if(isNumber==false){
		throw new Error('upperMoney参数需为有效数值');
	}
	//拆分整数与小数
	var source = (''+tranvalue).split(".");
	var dw2 = new Array("", "万", "亿"); //大单位
	var dw1 = new Array("拾", "佰", "仟"); //小单位
	var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
	var num = source[0];
	var dig = source[1];
    try {
        var i = 1;
        //转换整数部分
        var k1 = 0; //计小单位
        var k2 = 0; //计大单位
        var sum = 0;
        var str = "";
        var len = source[0].length; //整数的长度
        for (i = 1; i <= len; i++) {
              var n = source[0].charAt(len - i); //取得某个位数上的数字
              var bn = 0;
              if (len - i - 1 >= 0) {
                bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
              }
              sum = sum + Number(n);
              if (sum != 0) {
                str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
                if (n == '0') sum = 0;
              }
              if (len - i - 1 >= 0) { //在数字范围内
                if (k1 != 3) { //加小单位
                      if (bn != 0) {
                        str = dw1[k1].concat(str);
                      }
                      k1++;
                } else { //不加小单位，加大单位
                      k1 = 0;
                      var temp = str.charAt(0);
                      if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
                      str = str.substr(1, str.length - 1);
                      str = dw2[k2].concat(str);
                      sum = 0;
                }
              }
              if (k1 == 3){ //小单位到千则大单位进一
                k2++;
              }
        }
        //转换小数部分
        var strdig = "";
		var hasDig=dig!=undefined && dig != "";
        if (hasDig) {
			  var n = dig.charAt(0);
			  if (n != 0) {
				strdig += dw[Number(n)] + "角"; //加数字
			  }
			  var n = dig.charAt(1);
			  if (n != 0) {
				strdig += dw[Number(n)] + "分"; //加数字
			  }
			  str+="元"+ strdig;
        }else{
			str += "元整" ;
		}
    } catch(e) {
        return "0元";
    }
    return str;
}
 /**
    *格式化数字，格式化金额： 
    参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * var num=formatMoney(1234567.089, 2, ".", ",");//1,234,567.09
*/
function formatMoney(number, decimals, dec_point, thousands_sep) {
   
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };
 
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }
 
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

//设置cookie值
function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}
//获取cookie值
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}

//确认是否键盘有效输入值
function checkKey(iKey){
    if(iKey == 32 || iKey == 229){return true;}/*空格和异常*/
    if(iKey>47 && iKey < 58){return true;}/*数字*/
    if(iKey>64 && iKey < 91){return true;}/*字母*/
    if(iKey>95 && iKey < 108){return true;}/*数字键盘1*/
    if(iKey>108 && iKey < 112){return true;}/*数字键盘2*/
    if(iKey>185 && iKey < 193){return true;}/*符号1*/
    if(iKey>218 && iKey < 223){return true;}/*符号2*/
    return false;
}

//判断是否为数字类型
function isDigit(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}


//////////////////////////////////////
//下面是生成UUID随机数的方法
//三个方法都绑定到了Math对象上
//////////////////////////////////////
/*
 * 产生一个UUID

 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
	// Private array of chars to use
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

	Math.uuid = function (len, radix) {
		var chars = CHARS, uuid = [], i;
		radix = radix || chars.length;

		if (len) {
		  // Compact form
		  for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		} else {
		  // rfc4122, version 4 form
		  var r;

		  // rfc4122 requires these characters
		  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		  uuid[14] = '4';

		  // Fill in random data.  At i==19 set the high bits of clock sequence as
		  // per rfc4122, sec. 4.1.5
		  for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
			  r = 0 | Math.random()*16;
			  uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		  }
		}

		return uuid.join('');
	};

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
	// Generate four random hex digits.
	function S4() {
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	// Generate a pseudo-GUID by concatenating random hexadecimal.
	Math.guid=function() {
	   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};
	
	//随机数时间戳
	Math.uniqueId=function(){
		var a=Math.random,b=parseInt;
		return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
	}
})();


