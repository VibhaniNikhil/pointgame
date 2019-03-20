'use strict'
var express = require('express');
var bodyparser = require('body-parser');

const data = function(app,env) {
	app.use(bodyparser.json())
	app.use(bodyparser.urlencoded({extended:false,limit:'50mb'}));	
}

module.exports = data;