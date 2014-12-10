####更新日志

#####v1.0.0  

基本功能完成，1.0版；

#####v1.0.1  

修正一些bug和修改文档；

#####v1.0.2  

修正一些bug和修改文档；

#####v1.1.0

重写include语句的编译方法，以便能在node.js环境下重写；

- 新增 `compileInclude()` 方法；
- 新增 `regex` 属性；
- 重写`node.js`版的 `compileInclude()` 和 `render()` 方法；

#####v1.1.1  

修正一些bug和修改文档；

#####v1.2.0 

- 优化性能；
- 修正一些bug和修改文档；

#####v1.3.0 

- 优化性能；
- 修正一些bug和修改文档；

#####v1.4.0

主要改进安全转义功能。

- 删除 `escape()` 和 `unescape()` 方法；
- 增加 `htmlEncode()` 和 `htmlDecode()` 方法；
- `xssFilter()` 方法更名为 `filter()`；
- 添加xxs过滤的测试用例；