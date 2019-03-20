var _ = require("lodash");
var dbConfig = require("./dbConfig");
var expressConfig = require("./expressConfig");
var path = require("path");

var envConfig = {};
var cfg = {};
var enviroment = process.env.PORT  || 4000;

var defaultconfig={
    ip:'localhost',
    port:enviroment,
};

var cfg = _.extend(defaultconfig,envConfig);

module.exports = {
	cfg,
	dbConfig, 
	expressConfig
}