// http://milan.adamovsky.com/2010/09/jquery-plugin-pattern-20.html
(function($)
  {
   $.fn.extend({ 
                _plugin: null, 
                jQueryInit: jQuery.fn.init 
               });
    
   $.fn.extend({
                init: function( selector, context ) 
                       {
                        return jQuery.fn._plugin = new jQuery.fn.jQueryInit(selector, context);
                       }
               });
    
   function CustomEditorClass(args)
    {
     
     var _config;
     
     this.version = '1.0';
    
     this.show = _(showMessage);
     
     initConfig(args);

     function getConfig()
      {
       return _config;
      }

     function setConfig(args)
      {
       _config = args;
      }

     function initConfig(args)
      { 
       setConfig($.extend({
                           chainable : true,
                           className : 'CustomEditorClass'
                          }, args));
       return (this);
      }

     function showMessage(args)
      {  
       var myDiv = $(this);
           
       var config = getConfig();

       alert('My Plugin is ' + config.className);
              
       return (this);
      }
   

     function _ (fn) 
      {
       return function (args)
               {
                return this.prototype.rc(function () 
                                          { 
                                           fn.call(this, args) 
                                          }); 
               }
      }
      
     this.rc = function (args)
      {
       if (typeof args == 'function')
        {
         return $.fn._plugin.each(args);
        }
       else
        {
         initConfig(args);
         
         return getConfig().chainable
                 ? $.fn._plugin
                 : $.fn.createBox;
        }
      };
       
     
   	  }

     var _p = new CustomEditorClass({});
     
     $.fn.customEditor = _p.rc;
     $.extend($.fn.customEditor.prototype,_p);
     $.extend($.fn.customEditor,_p);
     
})(jQuery);
