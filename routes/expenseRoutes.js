const express=require('express')
const ec=require('../controllers/expenseController')
const mdlAuth=require('../middleware/auth')
const router=express.Router()

router.post('/add-expense',ec.postExpense)
router.get('/all-expense',mdlAuth.authenticate,ec.getExpense)
router.delete('/delete/:id',ec.deleteExpense)

exports.routes=router