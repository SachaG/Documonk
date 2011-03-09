/**
 * editableText plugin that uses contentEditable property (FF2 is not supported)
 * Project page - http://github.com/valums/editableText
 * Copyright (c) 2009 Andris Valums, http://valums.com
 * Licensed under the MIT license (http://valums.com/mit-license/)
 */
(function(){
    /**
     * The dollar sign could be overwritten globally,
     * but jQuery should always stay accesible
     */
    var $ = jQuery;
	/**
     * Extending jQuery namespace, we
     * could add public methods here
     */
	$.customEditor = {};
    $.customEditor.defaults = {		 
		/**
		 * Pass true to enable line breaks.
		 * Useful with divs that contain paragraphs.
		 */
		newlinesEnabled : false,
		/**
		 * Event that is triggered when editable text is changed
		 */
		changeEvent : 'change'
	};
	
	var methods = {
    	init : init,
	    startEditing : startEditing,
	    stopEditing : stopEditing
  	};	

	 $.fn.customEditor = function( method ) {
	   // Method calling logic
	   if ( methods[method] ) {
	     return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	   } else if ( typeof method === 'object' || ! method ) {
	     return methods.init.apply( this, arguments );
	   } else {
	     $.error( 'Method ' +  method + ' does not exist on jQuery.customEditor' );
	   }    
	 };
	
	function init(editable){
		var options = $.extend({}, $.customEditor.defaults, options);

		return this.each(function(){
		// Add jQuery methods to the element
		var editable = $(this);

		/**
		* Save value to restore if user presses cancel
		*/
		var prevValue = editable.html();
		alert("init");
		});	
	}

	function startEditing(editable){   
		console.log($(this)) 
		alert("startEditing");           
		addClass("editing");
		editable.attr('contentEditable', true);
	}

	function stopEditing(editable){
		console.log(editable) 
		alert("stopEditing");   
		removeClass("editing");
		editable.attr('contentEditable', false);
	}
})();