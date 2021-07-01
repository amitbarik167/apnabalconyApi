const jwt = require('jsonwebtoken');
exports.verifyToken = (req,res,next)=>{

    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let array = req.headers.authorization.split(' ')
    let jwtToken = array[1]
    let authorizationToken = array[2]

    if(jwtToken == null){
        return res.status(401).send('unauthorized request')
    }

    let payload = jwt.verify(jwtToken,authorizationToken);
   if(!payload){
    return res.status(401).send('unauthorized request')
   }
   req.userId = payload.userId
   next()
}