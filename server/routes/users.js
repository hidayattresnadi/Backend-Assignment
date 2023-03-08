const express = require('express')
const UserController = require('../controller/usercontroller')
const { authentication } = require('../middleware/authentication')
const router = express.Router()

router.get('/userlist',authentication,UserController.getUserList)


module.exports=router