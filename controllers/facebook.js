var FB = require('fb');
var User = require('../models/user')
FB.setAccessToken("EAACEdEose0cBAK2vysl6fanVwUUYrZCH8KGicH4ocIoSt8SaInBpj8ZCc422NEzpAuwiP5mxIdZBR9N7XgrWLZClZBPEFUBy9aBUs8dEvUUdZABnYnOLBgErKq3ZB78pu2BziF9cViomDhfUIfLd0QkdBpuOQ6O8NkkHur7RcVQAt5JfOmZCjwZBoSnIZAnaeq0E0nSAOhzIIg1AZDZD");

// FB.api('oauth/access_token', {
//     client_id: '1969065143411800',
//     client_secret: '7e9b2a4dfc7c2f64863c221c611355ea',
//     grant_type: 'client_credentials'
// }, function (res) {
//     if(!res || res.error) {
//         console.log(!res ? 'error occurred' : res.error);
//         return;
//     }
//     console.log(res)
//     var accessToken = res.access_token;
  
// });

var count=0;
const maxPeopleCount=1000
module.exports = {
getPeopleNames:(req,res)=>{
    count=0
    getNames('me')
    res.send({message:"success"})
}

}

function getNames(id){
    FB.api(id+'/friends?fields=id,name', function (res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    for(let person of res.data){ 
        createAndSaveUser(person)
        if(count<maxPeopleCount){
            getNames(person.id)
        }
    }

  });
}

async function createAndSaveUser (person){
    try{
        const existingUser = await User.findOne({ facebookId: person.id })
        if (!existingUser && count<maxPeopleCount) {   
            let user = new User({facebookId:person.id, name:person.name})
            user.save()
            count++;
            console.log(count);          
        }       
    }
    catch(err){
        console.log(err)
    }
}



