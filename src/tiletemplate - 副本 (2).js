/**
 *
 * tileTemplate
 *
 * @FileName: tiletemplate.js
 * @Auther: Pandao 
 * @version: 0.1.0
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
    
    var _this = exports;
    
    var $ = function (id) {        
        return (typeof document !== "undefined") ? document.getElementById(id) : id;
    };
    
    var _caches = [], _tags = [];
    
    var _extend = function(defaults, options) { 
            
        for (var i in defaults) {
            if(typeof options[i] == "undefined") options[i] = defaults[i];
        }

        return options;
    };
    
    if(typeof ''.trim !== "function") {  
        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    }
    
    var isNodeEnv = function() {
        return (typeof require === 'function' && typeof exports === "object" && typeof module === "object");
    };
    
    var _xssFilter = function(tpl, openTag, closeTag) {  
        
        tpl = tpl.replace(/\s*<\s*iframe\s*(.*)\s*>\s*<\s*\/iframe\s*>\s*/igm, "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*alert\s*\(\s*(.*)\s*\)\s*;?\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*confirm\s*\(\s*(.*)\s*\)\s*;?\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*prompt\s*\(\s*(.*)\s*\)\s*;?\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*window\s*(.|;)\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*document\s*(.|;)\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*createElement\s*\(\s*(.*)\s*\)\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*(\\$|jQuery)\s*(.*)\s*\(\s*(.*)\s*\)\s*(.*)"+closeTag, "igm"), "");
        tpl = tpl.replace(new RegExp(openTag + "\s*(.*)\s*eval\(\s*(.*)\s*\)\s*(.*)"+closeTag, "igm"), "");
        
        return tpl.trim();
    };
    
    exports.version = "0.1.0";
    
    exports.escape = function(html) {
        return html.replace(/\</igm, "&lt;").replace(/\>/igm, "&gt;").replace(/\"/igm, "&quot;").replace(/\'/igm, "&apos;"); 
    };
    
    exports.unescape = function(html) {
        return html.replace(/\&lt;/igm, "<").replace(/\&gt;/igm, ">").replace(/\&quot;/igm, "\"").replace(/\&apos;/igm, "'");  
    };
        
    exports.settings = {
        debug : false,
        cached   : true,
        openTag  : "<%",
        closeTag : "%>"
    };
        
    exports.set = function() {
            
        if(arguments && arguments.length > 1) 
        {     
            _this.settings[arguments[0]] = arguments[1];
        }
        else 
        {
            _this.settings = _extend(_this.settings, arguments[0]);
        } 

    };
        
    exports.compile = function(tpl, data, options) {            
            
        data                 = data    || {};
        options              = options || {};
        
        var defaults = {
            include: false, 
            name : ""
        };
        
        options = _extend(defaults, options);
        
        console.log(options);
        
        var include          = options.include;
        var openTag          = _this.settings.openTag;
        var closeTag         = _this.settings.closeTag;
        var regex            = new RegExp(openTag+"=(.*?)"+closeTag, "igm");      // or use eval
        var varCommentRegex  = new RegExp(openTag+"=#(.*?)"+closeTag, "igm");     // variable comment
        var lineCommentRegex = new RegExp("\/\/"+openTag+"?(.*?)"+closeTag+"?", "igm");  // line comment 

        tpl = tpl//.replace(/(\n[\s|\r|\t]*\t*\r*\n)/g, "\n")                       // clear blank line
                 .replace(/(^\s*)|(\s*$)/g, "")                                   // clear spaces
                 .replace(varCommentRegex, function($1, $2) { 
                    return "'+'";
                 }).replace(lineCommentRegex, "")
                 .replace(new RegExp(openTag+" include((.*?)) "+closeTag, "igm"), function($1, $2, $3) {

                    //console.log($2, $3); 
                    var id = $2.replace("('", "").replace("')", "").replace("(\"", "").replace("\")", ""); 
                    var includeContent = (typeof $(id) == "string") ? id : ($(id) == null) ? id : $(id).value || $(id).innerHTML;
            
                    return _this.compile(includeContent, data, {include: true, name: id})(data);

                 }).replace(regex, function($1, $2) {
                    return "'+"+$2+"+'";
                 }).split("\n");
        
        if(_this.settings.debug) 
        {
            for (var i = 0, len = tpl.length; i < len; i++)
            {  
                //console.log(typeof tpl[i]);
                tpl[i] = tpl[i].toString().replace(/(^\s*)|(\s*$)/g, "");
                tpl[i] += "_&_"+openTag+" _line="+(i+1)+"; "+closeTag+"_&_";
            }

            tpl = tpl.join('').split("_&_");
        }
        //console.log("_this.lastId=>", _this.lastId, tpl);  

        for (var i = 0, len = tpl.length; i < len; i++)
        {  
            tpl[i] = tpl[i].trim();
            
            tpl[i] = _xssFilter(tpl[i], openTag, closeTag);
            
            //console.log(tpl[i]);
            
            //if(!include) {
                tpl[i] = "out+='"+tpl[i]+"';";
            //} else {
                //tpl[i] = (i != 0) ? "out+='"+tpl[i]+"';" : tpl[i]+"';";
            //}
            
            tpl[i] = tpl[i].replace(/\s*tag:(\w+):?([\u4e00-\u9fa5]+|\w+|\d+)?\s*/gm, function($1, $2, $3) { // /\s*tag:(\w+):?(\w+|\d+|[\u4e00-\u9fa5]+)?\s*/gm
                //console.log($1, $2, $3);

                var str = (typeof $3 == "undefined") ? _tags[$2]() : _tags[$2]($3.toString());

                return "'" + str.toString() + "'";

            });

            tpl[i] = tpl[i].replace("out+='"+openTag, "").replace(closeTag+"';", "").replace("}';", "}");
            tpl[i] = tpl[i].replace(/^out\+\=\'\/\/(.*?)\'\;$/, function($1, $2, $3){return "/* "+$2+" */";}).replace("'';';", "'';");
            //tpl += "$line="+(i+1)+";";
        }
        
        var debug = "try {" + tpl.join('') + "\n return out; } catch(e) { e.line=_line; console.error('[tileTemplate]\\n\\n\\n[type]\\nRender error\\n\\nmessage: '+e.message+'\\nline: '+(e.line+1)); }";

        //tpl = (!include) ? "var out = '', _line=0;\n " + ( (_this.settings.debug) ? debug : tpl.join('') + "\n return out;" ) : tpl.join('');
        tpl = "var out = '', _line=0;\n " + ( (_this.settings.debug) ? debug : tpl.join('') + "\n return out;" );

        console.log(tpl); 

        var extract = 'function extract(obj, parent) {' +
                      'for (var i in obj) { ' +
                      'parent[i] = obj[i];' +
                      '}'+
                      '}';
        
        //if(!include) {
            var fn = new Function('data', extract + 'extract(data, this);' + tpl);
            //console.log(fn); 

            return fn;
        //} else {
            //return tpl;
        //}
    };
        
    exports.render = function(id, data) {  
            
        var tpl = (typeof $(id) == "string") ? id : ($(id) == null) ? id : $(id).value || $(id).innerHTML;         
        
        //console.log("typeof tpl=>", typeof tpl, tpl);

        if(_this.settings.cached && typeof _caches[id] !== "undefined") // use cache
        {
            return _caches[id];
        }
        else
        {
            var html = _this.compile(tpl, data, {name: id})(data);
            
            if(_this.settings.cached) _caches[id] = html;

            return html;
        }
    };
        
    exports.tag = function(name, callback) {
        _tags[name] = callback;
    };
        
    exports.clear = function(id) {
        delete _caches[id]; 

        return true;
	}; 
    
}));