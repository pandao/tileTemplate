#tileTemplate 

a simple javascript template engine.

一个简单的、高性能的Javascript模板引擎。

> 需要说明的是，`tileTemplate` 是在借鉴 `artTemplate` 设计原理的基础上设计开发的。在不开启调试的情况下，性能测试高于 `artTemplate`，耗时只有一半，甚至三分之一不到；开启调试则相当。

####主要特性

- 简单小巧，精简后只有`4.21K`，开启gzip后只有`2.1K`；
- 原生语法，高性能预编译和渲染模板；
- 安全，过滤和转义危险语句；
- 支持各种模块化标准（`CommonJS` / `AMD` / `CMD` 等）；
- 支持在 `Node.js` 环境下运行；
- 支持调试，精确定位并通过控制台输出和显示错误或异常信息；
- 支持所有主流的浏览器（`IE6+`）；
- 支持 `include` 和自定义标签语法；

####使用方法

编写模板：

	<!-- type可以任意定义 -->
    <script id="test-tpl" type="text/tileTemplate">
        <h1><%=title%></h1>
        <ul> 
            <% for (i = 0, l = list.length; i < l; i ++) { %>
                <li>
					用户: <%=list[i].user%>
					网站：<a href="<%=list[i].site%>"><%=list[i].site%></a>
				</li>
            <% } %>
        </ul>
    </script>

预编译模板：
	
	// 返回一个函数
	var compiler = tileTemplate.compile(document.getElementById('test-tpl').innerHTML);

渲染模板：

    var data = {
        title : "标题XXX",
        list : []
    }; 

    for (var i = 0; i < 10; i ++) {
        data.list.push({
            index: (i+1),
            user: '<strong style="color:red">tileTemplate '+(i+1)+'</strong>',
            site: 'https://github.com/pandao/tileTemplate'
        });	
    };

	// 输出HTML
	// document.getElementById('output').innerHTML  = compiler(data);
    document.getElementById('output3').innerHTML    = tileTemplate.render("test-tpl", data);

####在Node.js使用：

	# tileTemplate.render(文件名, 数据, 编码);

	var tileTemplate = require("../src/tiletemplate.node");

	//默认基本目录
	tileTemplate.config("basePath", __dirname + "/tpl");

	//console.log(tileTemplate.render("Hello <%=str%>", {str:"wolrd!"}));
	
	var html = tileTemplate.render("test.tile.html", data);
	var http = require('http');
	
	http.createServer(function (request, response) {
	    response.writeHead(200, {'Content-Type': 'text/html'});
	    response.end(html);
	}).listen(8888);

	console.log('Server running at http://127.0.0.1:8888/');

####主要语法

`tileTemplate` 目前只支持原生语法。

文本输出：

	<%=变量%>

JS语句：

	<% if (list.length > 0) { %>
	<p>Total: <%=list.length%> </p>
	<% } else { %>
	<p>暂时没有</p>	
	<% } %>

	<%=(list.index>1?'>1':'<1')%>
	...

变量注释：

	<%=#变量%>
	<img src="<%=avatar%>" />

行注释：

	//注释文本
	//<%=(list.index>1?'>1':'<1')%>

嵌套模板（支持多级嵌套）：

	<% include('模板id') %>

自定义标签语句（只能输出字符串）：

	# 定义标签语句
    tileTemplate.tag("em", function(content) {         
        if(content == 12) {
			var img = "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif";
            return '<img src="'+img+'" alt="em'+content+'"/>';
        } else {
            return content.toString();
        }
    });
    
    tileTemplate.tag("time", function() {
        return " time: " + (new Date).getTime();
    }); 

	#使用标签语句
    <%=tag:em:12%>
    <%=tag:em:haha%>
    <%=tag:em:哈哈%>    
    <%=tag:time%>

####下载

- [源码   tiletemplate.js](https://github.com/pandao/tileTemplate/tree/master/src/tiletemplate.js "源码")
- [压缩版 tiletemplate.min.js](https://github.com/pandao/tileTemplate/tree/master/dist/tiletemplate.min.js "压缩版")

####License

The MIT License (MIT)

Copyright (c) 2014 Pandao