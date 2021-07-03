const crypto = require('crypto')
const favDataModel = require('./model/fav')

exports.postShare = (req, res, next) => {

    jsonFavs = req.body
   

    if (jsonFavs.favourites != undefined){
        console.log('nice')
    crypto.randomBytes(6, (err, buffer)=>{
        const token = buffer.toString('hex')
        

        const favArray = new favDataModel({
            favs: jsonFavs,
            shareCode: token
        }) 
    
        return favArray.save()

        // .then(result => {

        // })
    
        .catch(err => {
            console.log(err);
        })
    

    })
    }

}