var User = require('../models/user')


module.exports = {
    get: async (req, res) => {
        let users = await User.find({}).limit(100)
        console.log(users)
        res.render('index',{users:users})
    },
    put: (req, res) => {
        User.update({facebookId:req.params.userId},req.body,(err,result)=>{
            if(err)
                return res.send({message:"error",description:err})
            res.send({message:'success'})
        })
    },
}
