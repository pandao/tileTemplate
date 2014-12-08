#tileTemplate 

[TOC]

a simple javascript template engine.

一个简单的、高性能的Javascript模板引擎。

需要说明的是，`tileTemplate` 是在借鉴 `artTemplate` 设计原理的基础上设计开发的。在不开启调试的情况下，性能测试高于 `artTemplate`，耗时只有一半，甚至三分之一不到；开启调试则相当。

####主要特性

- 简单小巧，精简后只有4.21K，开启gzip后只有2.1K；
- 原生语法，高性能预编译和渲染模板；
- 支持各种模块化标准（CommonJS/AMD/CMD等）；
- 支持在Node.js环境下运行；
- 支持调试，精确定位并通过控制台输出和显示错误或异常信息；
- 支持所有主流的浏览器（IE6+）；
- 支持include和自定义标签语法；