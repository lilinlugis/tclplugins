/*
 * 常用的正则表达式
 * 
*/
//正整数
function reg_uNum(){
	return /^[0-9]*[1-9][0-9]*$/;
}
//负整数
function reg_nNum(){
	return /^-[0-9]*[1-9][0-9]*$/;;
}
//正浮点数
function reg_uFloat(){
	return /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
}

//负浮点数
function reg_nFloat(){
	return /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
}
//浮点数
function reg_Float(){
	return /^(-?\d+)(\.\d+)?$/;
}
//email地址
function reg_Email(){
	return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
}
//url地址
function reg_url(){
	return /^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;;
}
//http地址
function reg_http(){
	return ^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$ ;
}
//年/月/日（年-月-日、年.月.日）
function reg_date(){
	return /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
}
//匹配中文字符
function reg_zhText(){
	return /[\u4e00-\u9fa5]/;
}
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
function reg_account(){
	return /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
}

//匹配空白行的正则表达式
function reg_emptyline(){
	return /\n\s*\r/;
}
//匹配中国邮政编码
function reg_postcode(){
	return /[1-9]\d{5}(?!\d)/;
}
//匹配身份证
function reg_idcard(){
	return /\d{15}|\d{18}/;
}
//匹配国内电话号码
function reg_telphone(){
	return /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
}
//匹配IP地址
function reg_ip(){
	return /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
}
//匹配首尾空白字符的正则表达式
function reg_trimspace(){
	return /^\s*|\s*$/;
}
//匹配HTML标记的正则表达式
function reg_html(){
	//return < (\S*?)[^>]*>.*?|< .*? />;
}
//sql 语句
function reg_sql(){
	return /^(select|drop|delete|create|update|insert).*$/;
}

/*
//提取信息中的网络链接
(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的邮件地址
\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 
//提取信息中的图片链接
(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 
//提取信息中的 IP 地址
(\d+)\.(\d+)\.(\d+)\.(\d+)
//取信息中的中国手机号码
(86)*0*13\d{9} 
//提取信息中的中国邮政编码
[1-9]{1}(\d+){5} 
//提取信息中的浮点数（即小数）
(-?\d*)\.?\d+ 
//提取信息中的任何数字
(-?\d*)(\.\d+)?
//电话区号
^0\d{2,3}$
//腾讯 QQ 号
^[1-9]*[1-9][0-9]*$ 
//帐号（字母开头，允许 5-16 字节，允许字母数字下划线）
^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
//中文、英文、数字及下划线
^[\u4e00-\u9fa5_a-zA-Z0-9]+$

*/