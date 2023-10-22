const Sequelize=require('sequelize')
require('dotenv').config()
const sequelize=new Sequelize(process.env.DB_DBNAME,process.env.DB_HOST,process.env.DB_PASSWORD,{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize