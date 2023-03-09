const { compareHash, token } = require("../helper")
const { User } = require("../models/index")
class UserController {
    static async register(req, res, next) {
        try {
            let { userName, fullName, password } = req.body
            let newUser = await User.create({ userName, fullName, password })
            let payload = {
                id: newUser.id
            }
            let acessToken = token(payload)
            res.status(200).json({ userName, fullName,acessToken })
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            let { userName, password } = req.body
            if (!userName || !password) {
                throw { name: "Please fill requirement data" }
            }
            let user = await User.findOne({
                where: {
                    userName: userName
                }
            })
            if (!user) {
                throw { name: "invalidCredentials" }
            }
            let comparePassword = compareHash(password, user.password)
            if (!comparePassword) {
                throw { name: "invalidCredentials" }
            }
            let payload = {
                id: user.id
            }
            let acessToken = token(payload)
            res.status(200).json({ userName, acessToken })
        } catch (error) {
            next(error)
        }
    }

    static async getUserList(req, res, next) {
        try {
            let { page } = req.query
            let pagination = {
                attributes: ['userName','fullName'] ,
                limit: 5
            }
            if (!page) {
                pagination.offset = 0
            }
            else {
                pagination.offset = 5 * (page - 1)
            }
            let data = await User.findAll(pagination)
            if (data.length === 0) {
                throw { name: "error not found" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = UserController