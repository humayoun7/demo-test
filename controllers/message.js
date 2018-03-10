var Message = require('../models/message');
const fetch = require('node-fetch');

module.exports = {
    get: function (req, res) {
        // Message.find({}).populate('user', '-pwd').exec(function (err, result) {
        //     res.send(result);
        // })
        let body = {
        }
        var myHeaders = new fetch.Headers({
            'Content-Type': 'application/json',
             'Accept': 'application/json',
        });
        
        var options = {
            method: 'get',
            headers: myHeaders,
            //body: JSON.stringify(body),
        };
        fetch('https://api.github.com/users/github', options)
            .then(response => response.json())
            .then(response => res.render('index',{data:response}) )
            .catch(err => console.error('error:', err))

        //res.render('index')
    },
    post: function (req, res) {
        console.log(req.body, req.user);
        
        req.body.user = req.user;
        
        // var message = new Message(req.body);

        // message.save();

        // res.status(200);
    }
}