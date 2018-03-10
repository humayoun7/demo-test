var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose');


var auth = require('./controllers/auth')
var message = require('./controllers/message')
var checkAuthenticated = require('./services/checkAuthenticated')
var cors = require('./services/cors')

//Middleware
app.use(bodyParser.json())
app.use(cors)
app.set('view engine','ejs')

//Requests
app.get('/api/message', message.get)

app.post('/api/message', message.post)

app.post('/auth/signup', auth.signup)

app.post('/auth/login', auth.login)

//Connection
mongoose.connect("mongodb://admin:pwd@ds251598.mlab.com:51598/demo-test", function (err, db) {
    if (!err) {
        console.log("we are connected to mongo")
    }
})

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port)
})