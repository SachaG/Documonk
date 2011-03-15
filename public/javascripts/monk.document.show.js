$().ready(function() {

	//must call TOC after Aloha, else bug!	

	$("#toc-inner").tableOfContents("#content", {
		startLevel: 	2
	});
	
	$("#palette .contents").tabs({ 
		disabled: 		[2,3]
	});
	
	$("#palette .minmax").click(function(){
		var button=$(this);
		if(button.hasClass("minimize")){
				button.removeClass("minimize").addClass("maximize");
				$("#palette").removeClass("maximized").addClass("minimized");	
		}else{
				button.removeClass("maximize").addClass("minimize");
				$("#palette").removeClass("minimized").addClass("maximized");	
		}
	});
	
	$("#edit-switch").click(function(){
		var editSwitch=$(this);
		var pTabs=$('#palette .contents');
		$("#palette").toggleClass("editing");
		$("#palette").toggleClass("not-editing");
		$("#content").toggleClass("editing");
		$("#content").toggleClass("not-editing");
		if(editSwitch.hasClass("inactive-switch")){
				$("#edit-switch").removeClass("inactive-switch").addClass("active-switch");
				$('#content').scribe.startEditing();
				pTabs.tabs("option","disabled",[]);
		}else{
				$("#edit-switch").removeClass("active-switch").addClass("inactive-switch");
				$('#content').scribe.stopEditing();
				$('#palette .contents').tabs("option","disabled",[2,3]);
				var selectedTabs=pTabs.tabs( "option" , selected);
				if(selectedTabs==3 || selectedTabs==4){
					$('#palette .contents').tabs( "select" , 0 );
				}
		}		
	});
	//$("#edit-switch").buttonset();
	
	$('.edit_document').ajaxForm();
	
    var options = { 
        //target:        '#confirmation',   // target element(s) to be updated with server response 
       	beforeSubmit:  	beforeCall,  // pre-submit callback 
        success:       	successCall,  // post-submit callback 
 		error: 			errorCall 
        // other available options: 
        //url:       url         // override for form's 'action' attribute 
        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true        // clear all form fields after successful submit 
        //resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    }; 

	$(".save-button").click(function(){
		$("#document_content").val($("#content").html());
		$('.edit_document').ajaxSubmit(options);
		return false;
	});
	function beforeCall(){
		$(".save").addClass("saving");
		$(".error-indicator").hide();
	}
	function successCall(){
		$(".save").removeClass("saving");
		$(".success-indicator").show().fadeOut("slow");
	}
	function errorCall(){
		$(".save").removeClass("saving");
		$(".error-indicator").show();
	}
});