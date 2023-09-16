const Sequelize=require('sequelize')

const sequelize=new Sequelize('etusers','root','Admin@123',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize