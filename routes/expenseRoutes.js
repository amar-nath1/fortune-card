const express=require('express')
const ec=require('../controllers/expenseController')
const router=express.Router()

router.post('/add-expense',ec.postExpense)
router.get('/all-expense/:id',ec.getExpense)
router.delete('/delete/:id',ec.deleteExpense)



exports.routes=router