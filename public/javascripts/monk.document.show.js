$().ready(function() {

	//must call TOC after Aloha, else bug!	

	$("#toc-inner").tableOfContents("#content", {
		startLevel: 2
	});
	
	$("#palette").tabs({ 
		//collapsible: true
	});
});