/**
 * Gulp.js 构建文件
 * 
 * @updateTime 2016-12-04
 */

var fs            = require("fs");
var path          = require('path');
var gulp          = require('gulp');
var rename        = require('gulp-rename');
var gutil         = require('gulp-util');
var notify        = require("gulp-notify");
var uglify        = require('gulp-uglify');
var replace       = require("gulp-replace");
var header        = require('gulp-header');
var includer      = require('gulp-x-includer');
var pkg           = require('./package.json');
var dateFormat    = require('dateformatter').format;

pkg.today         = dateFormat;

var headerComment = ["/*", 
					" * <%= pkg.name %>",
                    " *",
					" * @file        <%= fileName(file) %> ",
					" * @description <%= pkg.description %>",
					" * @version     v<%= pkg.version %>",
					" * @author      <%= pkg.author %>",
					" * {@link       <%= pkg.homepage %>}",
					" * @updateTime  <%= pkg.today('Y-m-d H:i:s') %>",
					" */", 
					"\r\n"].join("\r\n");

var headerCommentInline = "/*! <%= pkg.name %> v<%= pkg.version %> | Copyright (c) <%=pkg.today('Y') %> <%= pkg.author %> | <%= pkg.homepage %> | <%=pkg.today('Y-m-d H:i:s') %> */\n";

gulp.task("build", function() {
    var distPath = "dist/";

    return gulp.src('./src/*.js')
		    .pipe(includer({ debug : true}))
            .pipe(header(headerComment, {pkg : pkg, fileName : function(file) { 
                var name = file.path.split(file.base);
                return name[1].replace("\\", "").replace("/", "");
            }}))
            .pipe(gulp.dest(distPath))
            .pipe(rename({ suffix: ".min" }))
            .pipe(uglify())
            .pipe(gulp.dest(distPath))
            .pipe(header(headerCommentInline, {pkg : pkg, fileName : function(file) {
                var name = file.path.split(file.base + "\\");
                return name[1];
            }}))
            .pipe(gulp.dest(distPath))
            .pipe(notify({ message: "JS task completed!" }));
});

gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['build']);