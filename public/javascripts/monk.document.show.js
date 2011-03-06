GENTICS.Aloha.settings = {
	logLevels: {'error': true, 'warn': true, 'info': true, 'debug': true},
	errorhandling : false,
	//ribbon: true,	
	/*"i18n": {
		// let the system detect the users language
		//"acceptLanguage": '<?=$_SERVER['HTTP_ACCEPT_LANGUAGE']?>'
		"acceptLanguage": 'de-de,de;q=0.8,it;q=0.6,en-us;q=0.7,en;q=0.2'
	},*/
	"plugins": {
	 	"com.gentics.aloha.plugins.Link": {
		  	// all links that match the targetregex will get set the target
 			// e.g. ^(?!.*aloha-editor.com).* matches all href except aloha-editor.com
		  	targetregex : '^(?!.*aloha-editor.com).*',
		  	// this target is set when either targetregex matches or not set
		    // e.g. _blank opens all links in new window
		  	target : '_blank',
		  	// the same for css class as for target
		  	cssclassregex : '^(?!.*aloha-editor.com).*',
		  	cssclass : 'external'
		},
	 	"com.gentics.aloha.plugins.Table": {
			config: ['table']
		}
  	}
};

$().ready(function() {
	$('#document_content').aloha();

	$(".ajax_edit").click(function(){
		$('#content').aloha();
		return false;
	});
	var content = "";
	// iterate all dom elements which have been made aloha editable
	jQuery.each(GENTICS.Aloha.editables,function (index, editable) {
		// and get their clean and valid html5 content, and remember it to fake saving 
		content = content + "Editable ID: " + editable.getId() +"\nHTML code: " + editable.getContents() + "\n\n";
	});
	// this fakes the saving of the content to your backend.
	// TODO implement this to save the edited aloha content into your backend
	//	alert(this.i18n('saveMessage')+"\n\n"+content);

	//must call TOC after Aloha, else bug!	
	hljs.initHighlightingOnLoad();
	$("#toc-inner").tableOfContents("#content", {
		startLevel: 2
	});
});