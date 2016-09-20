/**
 * 常用表格控件封装，基于bootstrap和jquery
 */
(function($){
	function load(options,callback){
		$.ajax({
	        url:options.url+'?page='+options.page+'&limit='+options.pageSize,
	        type:"get",
	        dataType:"json",
	        data:options.param
		}).success(function (data) {
			options.data=data;
			callback(data);
			if(options.loadSuccess){
				options.loadSuccess();
			}
		});
	}
	function pageli(options,$pager,total){
		//计算页码
        options.pageCount=total==0 ? 0 :Math.ceil(total/options.pageSize);
        var startPage=options.page-options.pagerLength/2;
        var endPage=options.page+options.pagerLength/2;
        var offset=0;//移动窗口
        if(startPage<1){
        	offset=1-startPage;
        	startPage+=offset;
            endPage+=offset;
        }
        if(endPage>options.pageCount){
        	offset=options.pageCount-endPage;
        	endPage+=offset;
        	startPage+=offset;
        }
        if(startPage<1){
        	startPage=1;
        }
        
        
    	$lis=$('<div></div>');
    	for(var i=startPage;i<=endPage;i++){
    		var className="pageli hidden-xs "+(i==options.page?" active":"");
    		$lis.append('<li class="'+className+'"><a href="javascript:void(0);">'+i+'</a></li>');
    	}
    	//样式
    	//$lis.find("li[content="+options.page+"]").addClass("active");
    	if(options.page==1 & options.pageCount==1){
    		$pager.find(".first,.previous,.last,.next").addClass("disabled");
    	}else if(options.page==1){
    		$pager.find(".first,.previous").addClass("disabled");
    		$pager.find(".last,.next").removeClass("disabled");
    	}else if(options.page==options.pageCount){
    		$pager.find(".last,.next").addClass("disabled");
    		$pager.find(".first,.previous").removeClass("disabled");
    	}else{
    		$pager.find(".first,.previous,.last,.next").removeClass("disabled");
    	}
    	
    	$lis.children().insertBefore($pager.find('.pagination .next'));
    	//事件
    	$pager.find('ul li.pageli:not(".active")').click(function(e){
    		$.fn.responsivegrid.options.page=parseInt($(this).text());
			loadData();
    	});
    	//脚注
    	if(options.showPageSize){
    		var start=(options.page-1)*options.pageSize;
    		var end=start+options.pageSize;
    		$pager.find(".pager-tip").html('共<span>'+total+'</span>条 当前显示<span>'+start+'</span>-<span>'+end+'</span>条');
    	}
	}
	function loadData(){
		load($.fn.responsivegrid.options,function(data){
			var options=$.fn.responsivegrid.options;
			createRows(options.target,data.rows);
			//修改分页器
	        if(options.pagination){
	        	var $pager=options.pagerWrap ?
	            		$(options.pagerWrap).find("nav") :
	            		$(options.target).next("nav");
	            $pager.find(".pagination li:not(.first,.previous,.next,.last)").remove();
	            
	            //分矾处理
	            pageli(options,$pager,data.total);
	        }
		});
	}
	function createRows(target,rows){
		//清除原有
		$(target).find('tbody').empty();
		//生成表格行
        var $ths=$(target).find("thead tr th:not(.rowIndex)");
        var fields=[];
        for(var i=0;i<$ths.length;i++){
        	var field=$($ths[i]).data().field;
        	var width=$($ths[i]).data().width;
        	var formatter=$($ths[i]).data().formatter;
        	var align=$($ths[i]).data().align||"left";
        	var xshidden=$($ths[i]).hasClass("hidden-xs");
        	fields.push({name:field,width:width||"auto",formatter:formatter,align:align,xshidden:xshidden});
        }
        function widthAdjast(){
        	var percent=$.fn.responsivegrid.options.showIndex?98:100;var sum=0;//除去auto的剩余百分比按比例计算
        	for(var w=0;w<fields.length;w++){
        		if(fields[w].width=="auto"){
        			percent-=100/fields.length;
        		}else{
        			sum+=fields[w].width;
        		}
        	}
        	//重新分配百分比
        	for(var w=0;w<fields.length;w++){
        		if(fields[w].width!="auto"){
        			fields[w].width=(fields[w].width/sum)*percent;
        		}else{
        			fields[w].width=100/fields.length;
        		}
        	}
        }
        widthAdjast();//计算每列的宽度百分比，如果为auto的，则宽度为100/fileds.length
        for(var r=0;r<rows.length;r++){
        	var row=rows[r];
        	var rowcls=null;
        	if($(target).data().rowrender && window[$(target).data().rowrender]){
        		rowcls=window[$(target).data().rowrender](row,r);
        	}
        	var $row=$(rowcls?'<tr class="'+rowcls+'"></tr>':'<tr></tr>');
        	if($.fn.responsivegrid.options.showIndex){
        		//显示行号
        		$row.append('<td class="rowIndex">'+(r+1)+'</td>');
        	}
        	//遍历列
        	for(var i=0;i<fields.length;i++){
        		var val=row[fields[i].name];
        		if(fields[i].formatter && window[fields[i].formatter]){
        			val=window[fields[i].formatter](val,row,i);
        		}
        		$col=$('<td style="width:'+fields[i].width+'%;text-align:'+fields[i].align+'">'+val+'</td>');
        		if(fields[i].xshidden){
        			$col.addClass("hidden-xs");
        		}
        		$row.append($col);
        	}
        	$(target).find('tbody').append($row);
        }
	}
	//创建
	function create(target,options){
		load(options,function(data){
			var rows=data.rows;//数据
			if($.fn.responsivegrid.options.showIndex){
	        	$(target).find("thead tr").prepend('<th class="rowIndex"></th>');
	        }
			createRows(target,rows);
            //分页
            if(options.pagination){
            	var total=data.total||0;//总数
            	//总页数，页大小，当前页，上一页下一页，第一页，最后一页的状态控制。
            	//如果传入的分页组件的容器则使用，否则直接添加到table的下面
            	$pager=$('<nav class="center-xs"></nav>');
            	if(options.showPageSize){
            		//显示页大小修改选择项
            		$pager.append('<div class="pager-size-sel pull-left hidden-xs">每页&nbsp;<select class="w45"><option>10</option><option selected="selected">20</option><option>30</option><option>40</option><option>50</option></select>&nbsp;条&nbsp;&nbsp;</div>');
            	}
            	//TODO：选中传入的pageSize option
            	$pager.append('<ul class="pagination">'+
            			'<li class="first before"><a href="javascript:void(0);" aria-label="FirstPage" title="FirstPage"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a></li>'+
            			'<li class="previous before"><a href="javascript:void(0);" aria-label="PreviousPage" title="PreviousPage"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>'+
            			'<li class="next after"><a href="javascript:void(0);" aria-label="NextPage" title="NextPage"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>'+
            			'<li class="last after"><a href="javascript:void(0);" aria-label="LastPage" title="LastPage"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a></li>'+
            		'</ul>'	
            	);
            	//显示提示信息
            	var start=rows.length>0?1:0;var end=rows.length;
            	$pager.append('<div class="pager-tip pull-right hidden-xs">共<span>'+total+'</span>条 当前显示<span>'+start+'</span>-<span>'+end+'</span>条</div>');
            	
            	//计算页码
	            pageli(options,$pager,data.total);
	            
	            $pager.find('ul li.next,ul li.last,ul li.previous,ul li.first').click(function(e){
	            	if($(this).hasClass("disabled")){
	            		return;
	            	}
        			if($(this).hasClass("next")){
        				$.fn.responsivegrid.options.page++;//下一页
        			}else if($(this).hasClass("last")){
        				$.fn.responsivegrid.options.page=options.pageCount;//最后一页
        			}else if($(this).hasClass("previous")){
        				$.fn.responsivegrid.options.page--;//上一页
        			}else if($(this).hasClass("first")){
        				$.fn.responsivegrid.options.page=1;//第一页
        			}
        			loadData();
	        	});
	            $pager.find(".pager-size-sel select").change(function(e){
	            	options.pageSize=parseInt($(this).val());
	            	loadData();
	            })
            	//插入到文档中
            	if(options.pagerWrap){
            		$(options.pagerWrap).append($pager);
            	}else{
            		$pager.appendAfter(target);
            	}
            }
		});
	}
	function setProperties(target){}
	
	
	$.fn.responsivegrid = function(options, param){
		$.fn.responsivegrid.defaults={showPageSize:true,page:1,pagerLength:6};//默认页大小可设置，默认第1页，页标签为6个
		if (typeof options == 'string'){
			var method = $.fn.responsivegrid.methods[options];
			if (method){
				return method(this, param);
			} else {
				//没有些方法
			}
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'responsivegrid');
			if (state){
				$.extend(state.options, options);
			} else {
				state = $.data(this, 'responsivegrid', {
					options: $.extend({}, $.fn.responsivegrid.defaults, options)
				});
			}
			$.fn.responsivegrid.options=state.options;
			$.fn.responsivegrid.options.param=param ||{};
			$.fn.responsivegrid.options.target=this;
			create(this,$.fn.responsivegrid.options);
		});
	};
	//对外的方法
	$.fn.responsivegrid.methods={
		//获取某一行数据
		getRow:function(target,index){
			if($.fn.responsivegrid.options.data && $.fn.responsivegrid.options.data.rows
					&& index<$.fn.responsivegrid.options.data.rows.length){
				return $.fn.responsivegrid.options.data.rows[index];
			}else{
				return null;
			}
		},
		//查询参数变动-重新发送请求
		query:function(target,parm){
			$.fn.responsivegrid.options.page=1;
			$.extend($.fn.responsivegrid.options.param, parm);//
			loadData();
		}
	};
})(jQuery);

