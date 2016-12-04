# 更新日志

## v1.x

#### v1.6.0

- 优化：改进和修复数据变量作用域引起的问题；
- 更新：不再使用 Grunt.js 构建，改为使用 Gulp.js 构建；
- 新增：`compiler` 方法必须传入参数 `data`，以实现模板预编译；
- 新增：`compiler` 和 `render` 方法新增参数 `isModule`，用于支持预编译输出模板 CMD 模块；
- 更新文档及测试用例；

#### v1.5.0

改进在 `Node.js` 环境下的使用，并对 `Express.js` 进行支持。

- 增加 `expressInit()`方法，用于支持 `Express.js` 时的初始化；
- 增加和修改`Express.js`、`Node.js` 的测试用例，并将所有测试模板文件的扩展名改为 `tile.html`；
- 在 `Node.js` 下，配置项 `basePath` 的默认值改为 `./`；
- 增加配置项 `ext`，默认值为 `tile.html`，在 `Node.js` 下免去填写模板的扩展名；
- 添加源码的文档注释；
- 修改 `README.md` 介绍文档；

#### v1.4.0

主要改进安全转义功能。

- 删除 `escape()` 和 `unescape()` 方法；
- 增加 `htmlEncode()` 和 `htmlDecode()` 方法；
- `xssFilter()` 方法更名为 `filter()`；
- 添加xxs过滤的测试用例；

#### v1.3.0 

- 优化性能；
- 修正一些bug和修改文档；

#### v1.2.0 

- 优化性能；
- 修正一些bug和修改文档；

#### v1.1.1  

修正一些bug和修改文档；

#### v1.1.0

重写include语句的编译方法，以便能在node.js环境下重写；

- 新增 `compileInclude()` 方法；
- 新增 `regex` 属性；
- 重写`node.js`版的 `compileInclude()` 和 `render()` 方法；

#### v1.0.2  

修正一些bug和修改文档；

##### v1.0.1  

修正一些bug和修改文档；

#### v1.0.0  

基本功能完成，1.0版；