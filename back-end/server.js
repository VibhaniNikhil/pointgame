var env = require('dotenv').config();
const config = require('./lib/config');
var cors = require('cors')

config.dbConfig.connectDb(config.cfg, (err) => {
	if (err) {
		console.log(err)
		return;
	}
	const express = require('express')
	const app = express()
	app.use(cors())
	app.locals.rootDir = __dirname;
	config.expressConfig(app, config.cfg.environment);
	if (err) return res.json(err)
	require("./lib/routes")(app);
	
    app.listen(config.cfg.port, () => {
        console.log(`Express server listening on 4000`);
	});

});




