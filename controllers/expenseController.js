const Expense=require('../models/expense')
const User=require('../models/user')
const Sequelize=require('sequelize')
const sequelize = require('../util/database')
exports.postExpense=async(req,res,next)=>{
const t=await sequelize.transaction()
try{
   const addedExpense= await Expense.create({
        amount:req.body.amount,
        description:req.body.description,
        expenseType:req.body.expenseType,
        userId:req.userId.userId
    },{transaction:t})
       
        
        const user=await User.findOne({where:{id:req.userId.userId}})
        if (!user) {
            return res.status(404).json({message:'User not found'});
          }
          console.log(user.totalAmount+req.body.amount,'useeere')
     await User.update({totalAmount:user.totalAmount+req.body.amount},{
            where:{
                id:req.userId.userId
    
            },
            transaction:t
        })
            await t.commit()
            res.status(200).json({addedExpense:addedExpense})
        
}
catch(err){
await t.rollback()
}


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
    User.findAll({
        attributes:[
            [Sequelize.literal('user.id'), 'userId'],
            [Sequelize.literal('user.totalAmount'), 'totalAmount'],
            [Sequelize.literal('user.name'), 'name'],
        ],
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

exports.deleteExpense=async (req,res,next)=>{
    const t=await sequelize.transaction()

    try{
                  
          const exp=await Expense.findOne({where:{id:req.params.id}})
          

      const delExp=  await Expense.destroy({
            where:{
                id:req.params.id
            },
            transaction:t

        })
        const user=await User.findOne({where:{id:req.userId.userId}})
        if (!user) {
            return res.status(404).json({message:'User not found'});
          }
                
     await User.update({totalAmount:user.totalAmount-exp.amount},{
            where:{
                id:req.userId.userId
    
            },
            transaction:t
        })
            await t.commit()
           
            res.status(200).json({success:true})
    }

    catch(err){
        await t.rollback()

    }



}