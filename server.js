var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose');


var user = require('./controllers/user')
var checkAuthenticated = require('./services/checkAuthenticated')
var cors = require('./services/cors')
var path = require('path');
var facebook = require('./controllers/facebook')


//Middleware
app.use(bodyParser.json())
app.use(cors)
app.set('view engine','ejs')

//public static files
//app.use(express.static(path.join(__dirname, 'public')));

//Requests
app.get('/', user.get)
app.get('/api/users', user.get)
app.put('/api/user/:userId',user.put)

// to add 1000 user names
app.get('/addpeople',facebook.getPeopleNames)






//Connection
mongoose.connect("mongodb://admin:pwd@ds251598.mlab.com:51598/demo-test", function (err, db) {
    if (!err) {
        console.log("we are connected to mongo")
        //run for the first time to get 1000 name
        //facebook.getPeopleNames()
    }
})

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port)
})