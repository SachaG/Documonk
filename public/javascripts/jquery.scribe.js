// http://milan.adamovsky.com/2010/02/how-to-write-advanced-jquery-plugins.html
(function($)
 {
    var config = {};

    var global = {
        selected: '',
        selector: ''
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
										// [ "className", "commandName"]
										["boldButton","Bold"], 
										["italicButton", "Italic"],
										["leftButton", "JustifyLeft"],
										["rightButton", "JustifyRight"],
										["linkButton", "linkCommand"],
										["fontSelector", "FontName"]
									]
            },
            args));
			
			// bind updateToolbar to keyup and mouseup events to refresh icon states (active/inactive)
			var editable=$(global.selector);
			editable.keyup(function(){
				editable.scribe.updateToolbar()
			});
			editable.mouseup(function(){
				editable.scribe.updateToolbar()
			});
			
			// loop over the array and bind each commant to the click event of the element with a matching class
			$.each(config.toolbarCommands, function(index, value){
				var className=value[0];
				var commandName=value[1];
				console.log("init toolbarCommands: "+commandName);
				$("."+className).click(function(){
					$(this).scribe.doCommand(commandName);
					return false;
				});
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
				case "linkCommand":
					//get parent <a> tag closest to current selection
					var closestTag=$(this).scribe.getClosest("a");
					var initialUrl="http://";
					// if there is a parent <a>, then use its link as the default for the new link
					if(closestTag.length>0){
						initialUrl=closestTag.attr("href");
					}
					var url = window.prompt("Enter an URL:", initialUrl);
					if (url===null) return;
					if (url==="") {
						document.execCommand("unlink", false, null); //(5)
					} else {
						document.execCommand("createLink", false, url); //(6)
					}
					break;
				case "fontName":
					//var value=document.queryCommandValue();
					//editDoc.execCommand(command, false, value); 
				default:
					console.log("doCommand: "+command);
		    		document.execCommand(command, false, null); 
			}
			// also update toolbar when command is executed in case of incompatible command (ex: justify right/left)
			$(this).scribe.updateToolbar()
			
		},
		updateToolbar: function () { 
			var config = getConfig();
			$.each(config.toolbarCommands, function(index,value){
				var className=value[0];
				var commandName=value[1];
				var state = document.queryCommandState(commandName);
				var button=$("."+className);
				var echoState=state ? "active" : "inactive";
				console.log(commandName+" state: "+echoState);
				state ? button.addClass("active") : button.removeClass("active");
			});
		},
		getClosest: function (tag) {
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
    };

    function setConfig(value)
    {
        config = value;
    }

    function getConfig()
    {
        return config;
    }
})(jQuery);