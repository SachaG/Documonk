$(document).ready(function(){
	hljs.initHighlightingOnLoad();
	$("#toc-inner").tableOfContents("#content", {
		startLevel: 2
	});
})