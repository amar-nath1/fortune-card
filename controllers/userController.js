const bcrypt=require('bcrypt')
const User=require('../models/user')
exports.postUser=(req,res,next)=>{
console.log(req.body,'reqbody')
bcrypt.hash(req.body.password,10,(err,hash)=>{
if (err){
    console.error(err)
    return
}

User.create({
    name:req.body.name,
    email:req.body.email,
    password:hash
}).then((postres)=>{
res.status(200).json({'added':postres})
}).catch((err)=>{
    if(err.name==='SequelizeUniqueConstraintError'){
        res.json({'errType':'already exists'})
    }
})

})

}

exports.userLogin=(req,res,next)=>{
        User.findAll({
            where:{
                email:req.body.email
            }
        }).then((foundUser)=>{
                    console.log(foundUser[0]['password'],'fu')
                    if(foundUser.length===0){
                        res.status(200).json({'auth':'nullexistence'})
                    }
                    else{
                        bcrypt.compare(req.body.password,foundUser[0]['password'],(err,result)=>{
                                if (err){
                                    console.error(err)
                                }
                                if (result===true){
                                    res.status(200).json({'auth':true})
                                }
                                else{
                                    res.status(200).json({'auth':false})
                                }
                        })
                    }       
        //  else if(foundUser[0]['password']===req.body.password){
        //         res.status(200).json({'auth':true})
        //     }
        //     else{
        //         res.status(401).json({'auth':false})
        //     }
        // })
    
    }).catch((err)=>{
            res.status(200).json({'auth':'nullexistence'})
        })
}