/*
 *文本/字符串处理公共方法
 * 2016-9-18 李林禄
*/
//替换全部
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
//清除空格
String.prototype.trim = function() {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return this.replace(reExtraSpace, "$1");
}

//清除左空格/右空格
String.prototype.ltrim = function() {
	 return this.replace( /^(\s*|　*)/, ""); 
}
String.prototype.rtrim = function() {
	 return this.replace( /(\s*|　*)$/, ""); 
}

//去除换行
String.prototype.clearBr = function(key) {
	key = key.replace(/<br\/?.+?>/g, "");
	key = key.replace(/[\r\n]/g, "");
	return key;
}
String.prototype.realLength = function() {
	return this.replace(/[^\x00-\xff]/g, "**").length;
};
//判断是否以某个字符串开头
String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0
}
//判断是否以某个字符串结束
String.prototype.endWith = function (s) {
    var d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d);
}
/**
 * 根据跟定长度截取字符串
 * 对英文当成半个字
 */
function subString(str, num) {
	var tempStr = "";
	if(str==null) return ;
	if (str.realLength() < 2 * num + 2) {
		tempStr = str;
	} else {
		for (var i = num; 9 > 1; i++) {
			tempStr = str.substr(0, i);
			if (tempStr.realLength() >= 2 * num) {
				tempStr = tempStr + "...";
				break;
			}
		}
	}
	return tempStr;
}
/**
 * 全角半角转方法
 * iCase: 0全到半，1半到全，其他不转化
 */
String.prototype.full_half=function (tofull){
    if(this.length <= 0 || !(tofull === 0 || tofull == 1)){
        return this;
    }
    var i,oRs=[],iCode;
    if(tofull){/*半->全*/
        for(i=0; i<this.length;i+=1){ 
            iCode = this.charCodeAt(i);
            if(iCode == 32){
                iCode = 12288;                                
            }else if(iCode < 127){
                iCode += 65248;
            }
                oRs.push(String.fromCharCode(iCode)); 
            }                
    }else{/*全->半*/
        for(i=0; i<this.length;i+=1){ 
            iCode = this.charCodeAt(i);
            if(iCode == 12288){
                iCode = 32;
            }else if(iCode > 65280 && iCode < 65375){
                iCode -= 65248;                                
            }
                oRs.push(String.fromCharCode(iCode)); 
         }                
    }                
    return oRs.join("");                
}