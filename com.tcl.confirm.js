/**
 * 基于jquery和bootstrap的确认框
 */
(function($){
	function create(){
		$("body").append('<div id="tclConfirmModal" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="tclSmallConfirmLabel" aria-hidden="true">'+
		  '<div class="modal-dialog modal-sm">'+
		    '<div class="modal-content">'+
		    	'<div class="modal-header"><h4 class="modal-title" id="myModalLabel"><i class="fa fa-gavel" aria-hidden="true"></i> 确认</h4></div>'+
		      '<div class="modal-body">...</div>'+
		      '<div class="modal-footer">'+
		        '<button type="button" class="btn btn-default tclConfirmModalCancel" data-dismiss="modal">取消</button>'+
		        '<button type="button" class="btn btn-primary tclConfirmModalOk">确定</button>'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>');
		$("#tclConfirmModal").on("hide.bs.modal",function(e){
			$("#tclConfirmModal .btn").unbind("click");
		});
	}
	$.extend({
		tclConfirm:function(msg,accept,reject){
			if($("#tclConfirmModal").length==0){
				create();
			}
			if(msg){
				msg=msg.replace(/\n/g,'<br/>');
			}
			$("#tclConfirmModal .modal-body").html(msg);
			if(accept){
				$("#tclConfirmModal .tclConfirmModalOk").bind("click",function(){
					$("#tclConfirmModal").modal("hide");
					accept();
				});
			}
			if(reject){
				$("#tclConfirmModal .tclConfirmModalCancel").bind("click",reject);
			}
			
			$("#tclConfirmModal").modal("show");
		}
	});
})(jQuery);