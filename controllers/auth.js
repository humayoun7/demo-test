var User = require('../models/user')
var jwt = require('jwt-simple')
var moment = require('moment')


module.exports = {
    signup: async (req, res) => {
        try{
            const existingUser = await User.findOne({ email: req.body.email })
            if (!existingUser) {
                let user = new User(req.body)
                user = await user.save()
                res.send({ message: "success", content: { token: createToken(user) } })
            }
            else {
                res.send({ message: "error", description: "Email is already registered" })
            }
        }
        catch(err){
            res.send({message:"error",description:"something went wrong, Please try again later"})
        }
    },
    login: async (req, res) => {
        try{
            const user = await  User.findOne({email:req.body.email})
            if(!user)
                return res.send({ message:"error",description: 'User not found' }) 

            if(user.password==req.body.passowrd){
                res.send({message:"success",content:{token:createToken(user)}})
            }
            else{
                res.send({message:"error",description:"invalid password"})
            }   
        }
        catch(err){
            res.send({message:"error",description:"something went wrong, Please try again later"})
        }    
    }
}

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, 'secret')
}