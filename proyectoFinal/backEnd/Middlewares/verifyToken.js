const jwt = require('jsonwebtoken');
//authorization: Bearer <token>
function verifyToken  (req, res, next)  {
    const bearerHeader = req.headers['authorization']

  if(typeof bearerHeader !== 'undefined') {
    try {
      const bearerToken = bearerHeader.split(' ')[1] 
    const tokendata = jwt.verify(bearerToken, 'secretkey')
    req.userlog = tokendata
    }catch (err) {
      res.status(401).send(err)
    }    
    next()
  }else {
    res.sendStatus(403)
  }
}

module.exports = verifyToken;