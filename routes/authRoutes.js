
const express=require('express')
const uc=require('../controllers/userController')
const mdlAuth=require('../middleware/auth')
const router=express.Router()
router.post('/password/forgotpassword',uc.forgotPassword)
router.post('/user-login',uc.userLogin)
router.post('/add-user',uc.postUser)

exports.routes=router