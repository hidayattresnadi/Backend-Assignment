const {decodeToken}=require('../helper/index')
const { User} = require('../models/index')
async function authentication(req, res, next) {
    try {
        let acessToken = req.headers['authorization']
        let bearerToken= acessToken.split(" ")
        let userToken=bearerToken[1]
        if(!userToken){
            throw{name:'Unauthorized'}
        }
        let payload = decodeToken(userToken)
        if(!payload){
            throw{name:"Jsonwebtokenerror"}
        }
        let user = await User.findOne({
            where: {
                id: payload.id
            }
        })
        if(!user){
            throw{name:"Unauthorized"}
        }
        req.dataUser={
            id:user.id
        }
        next()      
    } catch (error) {
        next(error)
    }
}


module.exports={authentication}