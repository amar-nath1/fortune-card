const Expense=require('../models/expense')
const User=require('../models/user')
const Sequelize=require('sequelize')
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

exports.getAllExpense=(req,res,next)=>{
    Expense.findAll({
        attributes: [
    [Sequelize.literal('user.id'), 'userId'],
    [Sequelize.literal('SUM(expense.amount)'), 'totalAmount'],
    [Sequelize.literal('user.name'), 'name'],
  ],
        include: [{
            model: User, // No 'where' clause here
            required: true,
            attributes: [],
          },],
          group: [Sequelize.literal('user.id')],
          order: [[Sequelize.literal('totalAmount'), 'DESC']],
      })
        .then((result) => {
          res.status(200).json({result:result})
          console.log(result);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
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