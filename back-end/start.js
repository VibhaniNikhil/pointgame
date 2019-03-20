require('babel-register')({
    presets: [ 'env' ],
    "plugins": [
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ]
})

// Import the rest of our application.
module.exports = require('./server.js')