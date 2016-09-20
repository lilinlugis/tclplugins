<h3>简介</h3>
<p>本套代码是整理收集加上自己开发扩展的前端快速开发库，基于jQuery和Bootstrap面向企业信息系统提供前端基础功能支持，包括一些常用工具、扩展方法、UI组件等。</p>
1、引入jquery
2、引入bootstrap
3、引入responsivegrid
4、调用
<h3>responsivegrid</h3>
<h4>//使用样例：</h4>
<pre>
	$(function(){
		$("#myTable").responsivegrid({
			pageSize:20,//每页大小
			pagination:true,//显示分页
			url:"../log/weblog/list",//接口地址，接口必须返回{total:?,rows:[]}格式,分页参数page,limit
			pagerWrap:".panel-footer",//分页器容易，可不指定
			parms:{},//查询参数
			loadSuccess:function(){
				console.log($("#myTable").responsivegrid('getRow',0));//数据初次加载成功的事件
			}
		});
	});

	<div class="wordbreakall">
		<table id="myTable" class="table table-hover table-striped table-bordered" data-rowrender="rowrender">
			<thead>
				<tr class="primary text-center">
					<th data-field="level" data-align="center" data-width="7" class="hidden-xs">类型</th>
					<th data-field="time" data-align="center" data-formatter="dateformatter" data-width="15">时间</th>
					<th data-field="logmsg" data-width="45">日志内容</th>
					<th data-field="operator" data-width="33" class="hidden-xs">客户端</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>

</pre>