var User = require('../models/user')


module.exports = {
    get: async (req, res) => {
        let users = await User.find({}).limit(100)
        console.log(users)
        res.render('index',{users:users})
    },
}
