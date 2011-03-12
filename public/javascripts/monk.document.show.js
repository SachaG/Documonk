$().ready(function() {

	//must call TOC after Aloha, else bug!	

	$("#toc-inner").tableOfContents("#content", {
		startLevel: 2
	});
	
	$("#palette").tabs({ 
		//collapsible: true
	});
	$('.edit_document').ajaxForm();
	
    var options = { 
        //target:        '#confirmation',   // target element(s) to be updated with server response 
       	//beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse  // post-submit callback 
 
        // other available options: 
        //url:       url         // override for form's 'action' attribute 
        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true        // clear all form fields after successful submit 
        //resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    }; 

	$(".saveLink").click(function(){
		$("#document_content").val($("#content").html());
		$('.edit_document').ajaxSubmit(options);
		return false;
	});
	
	function showResponse(){
		alert("success!");
	}
});