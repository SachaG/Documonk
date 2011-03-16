$().ready(function() {

	//must call TOC after Aloha, else bug!	

	function initTOC(){
		$("#toc-inner").empty();
		$("#toc-inner").tableOfContents("#wysiwyg", {
			startLevel: 	2
		});	
	}
	initTOC();
	$(".toc a").click(initTOC);
	
	$("#palette .contents").tabs({ 
		selected: 		0
		,select: 		function(event, ui) {		
			if(ui.index==3 && $("#wysiwyg").hasClass("not-editing") ){
				switchEditMode();
			}
		}

	});
	
	/*
	$("#login").dialog({
		autoOpen: 	false
		,modal: 	true
		,draggable: false		
	});
	
	$(".login").click(function(){
		$("#login").dialog('open')
		return false;
	});

	$("#logout").dialog({
		autoOpen: 	false
		,modal: 	true
		,draggable: false	
	});
	
	$(".logout").click(function(){
		$("#logout").dialog('open')
		return false;
	});
	*/
	$(".login").fancybox({
		hideOnOverlayClick: 	true
		,padding: 				0
		,overlayOpacity: 		0.7
		,overlayColor: 			"#000000"
		,showCloseButton: 		true
		,href: 					"#login"

	});
		
	$(".logout").fancybox({
		hideOnOverlayClick: 	true
		,padding: 				20
		,overlayOpacity: 		0.7
		,overlayColor: 			"#000000"
		,showCloseButton: 		true
		,href: 					"#logout"
	});
	
	$("#palette .minmax").click(minMax);
	
	function minMax(){
		var button=$(".minmax");
		if(button.hasClass("minimize")){
				button.removeClass("minimize").addClass("maximize");
				$("#palette").removeClass("maximized").addClass("minimized");	
		}else{
				button.removeClass("maximize").addClass("minimize");
				$("#palette").removeClass("minimized").addClass("maximized");	
		}
		return false	
	}

	$(document).bind('keydown', 'meta+e', switchEditMode);
	$(document).bind('keydown', 'ctrl+e', switchEditMode);
	$(document).bind('keydown', 'esc', minMax);	
		
	$("#edit-switch").click(switchEditMode);

	
	function switchEditMode(){
		var editSwitch=$("#edit-switch");
		var pTabs=$('#palette .contents');
		$("#palette, #wysiwyg").toggleClass("editing not-editing");
		if(editSwitch.hasClass("inactive-switch")){
				$("#edit-switch").removeClass("inactive-switch").addClass("active-switch");
				$('#wysiwyg').scribe.startEditing();
				//pTabs.tabs("option","disabled",[]);
				$(document).bind('keydown', 'meta+s', saveDocument);
				$(document).bind('keydown', 'ctrl+s', saveDocument);
				$("h1").addClass("editing").attr('contentEditable', true);
		}else{
				$("#edit-switch").removeClass("active-switch").addClass("inactive-switch");
				$('#wysiwyg').scribe.stopEditing();
				var selectedTab=$(".ui-tabs-selected").index(".navigation>li");
				/*if(selectedTab==3){
					$('#palette .contents').tabs( "select" , 0 );
				}
				pTabs.tabs("option","disabled",[3]);
				*/
				$(document).unbind('keydown', saveDocument);
				if($("#content").hasClass("show-source")){
					switchSource();
				}
				$("h1").removeClass("editing").attr('contentEditable', false);

		}
		return false;		
	}
	
	$("#source-switch").click(switchSource);
	
	function switchSource(){
		var sourceSwitch=$("#source-switch");
		$("#content").toggleClass("show-source show-wysiwyg");
		if(sourceSwitch.hasClass("inactive-switch")){
				sourceSwitch.removeClass("inactive-switch").addClass("active-switch");
				$("#document_content").val($.trim($("#wysiwyg").html()));
		}else{
				sourceSwitch.removeClass("active-switch").addClass("inactive-switch");
				$("#wysiwyg").html($("#document_content").val());
		}
		$('#source textarea').keydown();
		return false;	
	};
	
	$('#source textarea').autoResize({
	    // On resize:
	    onResize : function() {
	        $(this).css({opacity:0.8});
	    },
	    // After resize:
	    animateCallback : function() {
	        $(this).css({opacity:1});
	    },
	    // Quite slow animation:
	    animateDuration : 100,
	    // More extra space:
	    extraSpace : 60,
		limit: 100000000
	});


	
	$('#source form').ajaxForm();
	$('#settings form').ajaxForm();
	
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
		saveDocument();	
		return false;
	});

	$("#settings_submit").click(function(){
		$('#settings form').ajaxSubmit(options);	
		return false;
	});
		
	function saveDocument(){
		if($("#content").hasClass("show-wysiwyg")){
			$("#document_content").val($.trim($("#wysiwyg").html()));
		}
		$("#document_title").val($.trim($("h1").text()));
		$('#source form').ajaxSubmit(options);
		return false;	
	}
	function beforeCall(arr, $form, options){
		//if this is the main content form, then look for the save button in the palette
		$form.is("#source form") ? context=$("#palette") : context=$form;
		$(".save", context).addClass("saving");
		$(".error-indicator", context).hide();
	}
	function successCall(responseText, statusText, xhr, $form){
		//if this is the main content form, then look for the save button in the palette
		$form.is("#source form") ? context=$("#palette") : context=$form;
		$(".save", context).removeClass("saving");
		$(".success-indicator", context).show().fadeOut("slow");
	}
	function errorCall(){
		//if this is the main content form, then look for the save button in the palette
		$form.is("#source form") ? context=$("#palette") : context=$form;
		$(".save", context).removeClass("saving");
		$(".error-indicator", context).show();
	}
});