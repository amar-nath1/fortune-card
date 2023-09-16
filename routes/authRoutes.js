
const express=require('express')
const uc=require('../controllers/userController')
const router=express.Router()

router.post('/user-login',uc.userLogin)
router.post('/add-user',uc.postUser)

exports.routes=router