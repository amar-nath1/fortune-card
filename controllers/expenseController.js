const Expense=require('../models/expense')
exports.postExpense=(req,res,next)=>{

Expense.create({
    amount:req.body.amount,
    description:req.body.description,
    expenseType:req.body.expenseType,
    userId:req.userId.userId
}).then((addedExpense)=>{
    res.status(200).json({addedExpense:addedExpense})
})

}

exports.getExpense=(req,res,next)=>{
    console.log(req.userId,'usereid')
Expense.findAll({
    where:{
        userId:req.userId.userId
    }
}).then((expensesRes)=>{
    res.status(200).json({expenses:expensesRes})
}).catch((err)=>{
    console.log(err)
})


}

exports.deleteExpense=(req,res,next)=>{
Expense.destroy({
    where:{
        id:req.params.id
    }
}).then(()=>{
    res.status(200).json({success:true})
}).catch((err)=>{
    console.log(err)
    res.status(200).json({success:false})
})
}