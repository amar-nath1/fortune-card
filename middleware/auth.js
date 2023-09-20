const jwt=require('jsonwebtoken')

exports.authenticate=(req,res,next)=>{
try {
    const token=req.header('authorization')
    
    const userId=jwt.verify(token,'sharpenerexpensetrackerproject')
    
    req.userId=userId
    next()
} catch (error) {
    return res.status(401).json({success:false})
}
}