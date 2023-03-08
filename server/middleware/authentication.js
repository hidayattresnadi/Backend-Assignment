const {decodeToken}=require('../helper/index')
const { User} = require('../models/index')
async function authentication(req, res, next) {
    try {
        let acess_Token = req.headers.acesstoken
        if(!acess_Token){
            throw{name:'Unauthorized'}
        }
        let payload = decodeToken(acess_Token)
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