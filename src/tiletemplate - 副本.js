/**
 *
 * tileTemplate
 *
 * @FileName: tiletemplate.js
 * @Auther: Pandao 
 * @version: 1.0.0 
 * @License: MIT
 * Copyright@2014 all right reserved.
 */

;(function(tileTemplate) {

	// CommonJS/Node.js
	if(typeof require === 'function' && typeof exports === "object" && typeof module === "object") 
	{
		tileTemplate(require, exports, module);
	}	
	// AMD/CMD/Sea.js
	else if(typeof define === "function") 
	{
		define(tileTemplate);
	} 
	else
	{ 
		tileTemplate(function(){}, window['tileTemplate']={}, {}); 
	}

}(function(require, exports, module) {
    
	"use strict"; 
    
    exports.compile = function(){};

	var tileTemplate = {
        
        settings : {
            cached   : true
        }, 
        
        set : function() {
            
            if(arguments && arguments.length > 1) 
            {     
                this.settings[arguments[0]] = arguments[1];
            }
            else 
            {
                this.settings = _extend(this.settings, arguments[0]);
            } 
            
        },
        
        compile : function(tpl, data, include) {            
            
            data                 = data    || {};
            include              = include || false;
             
            var openTag          = "<%";
            var closeTag         = "%>";
            var regex            = new RegExp(openTag+"=(.*?)"+closeTag, "igm");      // or use eval
            var varCommentRegex  = new RegExp(openTag+"=#(.*?)"+closeTag, "igm");     // variable comment
            var lineCommentRegex = new RegExp("\/\/"+openTag+"?(.*?)"+closeTag+"?", "igm");  // line comment 
            
            tpl = tpl.replace(/(^\s*)|(\s*$)/g, "")                                   // clear spaces
                     .replace(/(\n[\s|\t]*\r*\n)/g, "")                               // clear blank line
                     .replace(varCommentRegex, function($1, $2) { 
                        return "'+'";
                     }).replace(lineCommentRegex, "")
                       .replace(/\/\/(.*)/, function($1, $2) { 
                
                        return openTag+" /* "+$2+" */"+closeTag;
                     }).replace(new RegExp(openTag+" include((.*?)) "+closeTag, "igm"), function($1, $2, $3) {
                
                        //console.log($2, $3); 
                        var id = $2.replace("('", "").replace("')", "").replace("(\"", "").replace("\")", "");
                        return _this.compile($(id).innerHTML, data, true);
                
                     }).replace(regex, function($1, $2) {
                        return "'+"+$2+"+'";
                     }).split("\n");

            for (var i = 0, len = tpl.length; i < len; i++) 
            { 
                if(!include) tpl[i] = "out+='"+tpl[i].replace(/^\s+|\s+$/g,'')+"';";
                else {
                    if(i != 0) tpl[i] = "out+='"+tpl[i].replace(/^\s+|\s+$/g,'')+"';";
                    else tpl[i] = tpl[i].replace(/^\s+|\s+$/g,'')+"';";
                }
                
                tpl[i] = tpl[i].replace("out+='"+openTag, "").replace(closeTag+"';", "").replace("}';", "}"); 
            }

            if(!include) tpl = "var out = '';\n" + tpl.join('') + "\n return out;";
            else tpl = tpl.join('');

            //console.log(tpl); 
                
            var extract = 'function extract(obj, parent) {' +
                          'for (var i in obj) { ' +
                          'parent[i] = obj[i];' +
                          '}'+
                          '}';
            if(!include) {
                try {
                    var fn = new Function('data', extract + 'extract(data, this);' + tpl);

                    return fn;
                } catch(e) {
                    throw e;
                }
            } else {
                return tpl;
            }
        }, 
        
        render : function(id, data) {  
            
            var tpl = (typeof $(id) == "string") ? id : ($(id) == null) ? id : $(id).innerHTML;          
            
            if(this.settings.cached && typeof _caches[id] !== "undefined") // use cache
            {
                return _caches[id];
            }
            else
            {
                var html = this.compile(tpl, data)(data);
                
                if(this.settings.cached) _caches[id] = html;
                
                return html;
            }
        },
        
        tag : function(name, callback) {
            return callback(tpl);
        },
        
        clear : function(id) {
            delete _caches[id]; 
            
            return true;
        }
	};
    
    var $ = function (id) {        
        return (typeof document !== "undefined") ? document.getElementById(id) : id;
    };
    
    var _caches = [], _this = tileTemplate;
    
    var _extend = function(defaults, options) { 
            
        for (var i in defaults) {
            if(typeof options[i] == "undefined") options[i] = defaults[i];
        }

        return options;
    };

	//module.exports = tileTemplate;
    
}));