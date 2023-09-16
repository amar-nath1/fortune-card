const express=require('express')
const db=require('./util/database')
const ur=require('./routes/authRoutes')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
app.use(ur.routes)

db.sync().then(()=>{
    app.listen(4000,()=>{
        console.log('listening to 4000')
    })
}).catch((err)=>{
    console.log(err)
})