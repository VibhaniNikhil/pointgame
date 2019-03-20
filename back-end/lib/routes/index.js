var UserRoute = require('../user/userRoute');

module.exports = function (app) {
	app.use('/pointGame/api', UserRoute);
}

