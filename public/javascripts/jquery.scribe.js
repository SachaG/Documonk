// http://milan.adamovsky.com/2010/02/how-to-write-advanced-jquery-plugins.html

(function($)
 {
    var config = {};

    var global = {
        selected: '',
        selector: '',
		undoStack: [],
		logStack: []
    };

    var init = $.prototype.init;

    $.prototype.init = function(selector, context)
    {
        var r = init.apply(this, arguments);

        if (selector && selector.selector)
        r.context = selector.context,
        r.selector = selector.selector;

        if (typeof selector == 'string')
        {
            r.context = context || document,
            r.selector = selector;
            global.selector = r.selector;
        }

        global.selected = r;

        return r;
    };

    $.prototype.init.prototype = $.prototype;

    $.fn.scribe = {
        config: function(args)
        {
            setConfig($.extend({
                'default': 'value',
	 			'toolbarCommands' : [
										// [ "className", "commandName", "inputType"]
										["boldLink","Bold"], 
										["italicLink", "Italic"],
										["leftLink", "JustifyLeft"],
										["rightLink", "JustifyRight"],
										["linkLink", "wrapLink"],
										["fontLink", "FontName"],
										["helloLink", "insertHello"],
										["codeLink", "wrapCode"],
										["headerSelect", "wrapHeader","select"],
										["save-button","saveCommand"],
										["hrLink","inserthorizontalrule"],
										["ulLink","insertunorderedlist"],
										["olLink","insertorderedlist"],
										["pLink", "p"],
										["h2Link","h2"],
										["h3Link","h3"],
										["h4Link","h4"],
										["h5Link","h5"],
									]
            },
            args));
			
			// bind updateToolbar to keyup and mouseup events to refresh icon states (active/inactive)
			var editable=$(global.selector);
			editable.keyup(function(){
				editable.scribe.updateToolbar();
				// if user types in text, unbind the custom undo function to use the browser's undo again
				$(document).unbind('keydown', scribeUndo);
			});
			editable.mouseup(function(){
				editable.scribe.updateToolbar();
			});
			
			// loop over the array and bind each commant to the click event of the element with a matching class
			$.each(config.toolbarCommands, function(index, value){
				var className=value[0];
				var commandName=value[1];
				//check if there is a command type, if not use "link" by default
				var inputType=(value.length>=3 ? value[2] : "link")

				console.log("init toolbarCommands: "+commandName);

				switch (inputType){
					case "select":
							$("."+className).change(function(){
								$(this).scribe.doCommand(commandName);
							});
						break;
					default:
						$("."+className).click(function(){
							$(this).scribe.doCommand(commandName);
							return false;
						});
				}
				
			});
			
            return (getConfig());
        },
        startEditing: function()
        {
            var config = getConfig();
			var editable=$(global.selector);
            editable.addClass("editing");
			editable.attr('contentEditable', true);
            return (global.selected);
        },
        stopEditing: function()
        {
            var config = getConfig();
			var editable=$(global.selector);
            editable.removeClass("editing");
			editable.attr('contentEditable', false);
            return (global.selected);
        },
		doCommand: function(command) {
			var config = getConfig();

			switch(command){
				case "saveCommand":
					//?????
					break;
				case "insertHello":
					insertOrWrap("Hello world","");
					break;
				case "wrapCode":
					//insertOrWrap("","code");
					document.execCommand("formatblock", null, "<pre>");
					break;
				case "wrapH3":
					//insertOrWrap("","h3");
					document.execCommand("formatblock",null, "<h3>");
					break;
				case "wrapH4":
					//insertOrWrap("","h4");
					document.execCommand("formatblock", null, "<h4>");
					break;
				case "wrapHeader":
					document.execCommand("formatblock", null, "<"+$(global.selected).val()+">");
					break;
				case "p":
					document.execCommand("formatblock", null, "p");
					break;
				case "h2":
					document.execCommand("formatblock", null, "h2");
					break;
				case "h3":
					document.execCommand("formatblock", null, "h3");
					break;
				case "h4":
					document.execCommand("formatblock", null, "h4");
					break;
				case "h5":
					document.execCommand("formatblock", null, "h5");
					break;
				case "wrapLink":
					//get parent <a> tag closest to current selection
					var closestTag=getClosest("a");
					var initialUrl="http://";
					// if there is a parent <a>, then use its link as the default for the new link
					if(closestTag.length>0){
						initialUrl=closestTag.attr("href");
					}
					var url = window.prompt("Enter an URL:", initialUrl);
					if (url===null) return;
					if (url==="") {
						document.execCommand("unlink", false, null);
					} else {
						document.execCommand("createLink", false, url);
					}
					break;
				default:
					console.log("doCommand: "+command);
		    		document.execCommand(command, false, null); 
			}
			// also update toolbar when command is executed in case of incompatible command (ex: justify right/left)
			$(this).scribe.updateToolbar();			
		},
		updateToolbar: function () { 
			var config = getConfig();
			$.each(config.toolbarCommands, function(index,value){
				var className=value[0];
				var commandName=value[1];
				var state = document.queryCommandState(commandName);
				var button=$("."+className);
				var echoState=state ? "active" : "inactive";
				state ? button.addClass("active") : button.removeClass("active");
			});
		}
    };

    function setConfig(value)
    {
        config = value;
    }

    function getConfig()
    {
        return config;
    }

	function getClosest(tag) {
		var selection = window.getSelection(); 
		var node = selection.anchorNode.parentNode;
		var closestTag = $(node).closest(tag);
		if(closestTag.length>0){
			console.log("Found closest <"+tag+"> at: "+closestTag);
		}else{
			console.log("Did not find any <"+tag+">");
		}
		return closestTag;
	}
	
	function insertOrWrap(myString,myTag){
		//if no tag is supplied, use the span tag by default ; "true" is used to just do nothing
		myTag==""?myTag="span":true;
		var elem = document.createElement(myTag);
		var jElem=$(elem);
		var userSelection = document.getSelection();
		var userSelectionString=String(userSelection);
		var range=getRangeObject(userSelection);
		var elemID = Math.round((new Date()).getTime() / 1000);
		//if no string has been supplied, re-use the current selected text
		if(myString==""){
			//if no text is selected, throw an alert
			if(userSelection==""){
				alert("please select some text first");
				return false;
			}else{
				myString=userSelectionString;
			}
		}
		jElem.addClass('monk-elem monk-id-'+elemID+' monk-'+myTag);
		//fill the element and append delete button
		jElem.html(myString).append('<a class="monk-delete-elem" href="#" title="Delete Element">&#215;</a>');
		range.deleteContents();
		if (isTextNode(range.startContainer)) {
			var refNode = rightPart(range.startContainer, range.startOffset)		
			refNode.parentNode.insertBefore(elem, refNode);
		} else {
			if (range.startOffset==range.startContainer.childNodes.length) {
				refNode.parentNode.appendChild(elem);
			} else {
				var refNode = range.startContainer.childNodes[range.startOffset];
				refNode.parentNode.insertBefore(elem, refNode);
			}
		}
		//activate the delete button
		addElemDelete(jElem);
		
		//push action to undo stack
		pushUndoStack(elemID, userSelectionString);	
	}
		
	function isTextNode(node) {
		return node.nodeType==3;
	}
	
	function rightPart(node, ix) {
	return node.splitText(ix);
	}
	
	function leftPart(node, ix) {
		node.splitText(ix);
		return node;
	}
	
	function addElemDelete(elem){
		elem.find(".monk-delete-elem").click(function(){
			$(this).parent().remove();
		});
	}
	
	function getRangeObject(selectionObject) {
		if (selectionObject.getRangeAt)
			return selectionObject.getRangeAt(0);
		else { // Safari!
			var range = document.createRange();
			range.setStart(selectionObject.anchorNode,selectionObject.anchorOffset);
			range.setEnd(selectionObject.focusNode,selectionObject.focusOffset);
			return range;
		}
	}
	
	function pushUndoStack(elemID, previousContent){
		var latestEvent=new Array();
		latestEvent["elemID"]=elemID;
		latestEvent["previousContent"]=previousContent;
		global.undoStack.push(latestEvent);
		global.logStack.push(latestEvent);
		$(document).bind('keydown', 'ctrl+z', scribeUndo);
		$(document).bind('keydown', 'meta+z', scribeUndo);

	}
	
	function scribeUndo(){	
		var latestEvent=global.undoStack[0];
		$(".monk-id-"+latestEvent["elemID"]).replaceWith(latestEvent["previousContent"]);
		global.undoStack.pop();
		$(document).unbind('keydown', scribeUndo);
		return false;		
	}
})(jQuery);