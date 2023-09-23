const express=require('express')
require('dotenv').config();

const db=require('./util/database')
const ur=require('./routes/authRoutes')
const er=require('./routes/expenseRoutes')
const pr=require('./routes/premiumRoutes')
const Expense=require('./models/expense')
const User=require('./models/user')
const Order=require('./models/order')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
app.use(ur.routes)
app.use(er.routes)
app.use(pr.routes)
User.hasMany(Expense)
Expense.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
db.sync().then(()=>{
    app.listen(4000,()=>{
        console.log('listening to 4000')
    })
}).catch((err)=>{
    console.log(err)
})