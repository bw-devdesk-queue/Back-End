const jwt = require('jsonwebtoken')
module.exports = function (){
    return (req, res, next) => {
        const { authorization } = req.headers;
        const secret = process.env.JWT_SECRETE
        if (authorization) {

          jwt.verify(authorization, secret, (err, decoded) => {
            if (err) {
              return res.status(403).json({
                message:
                  "You are not authorized And should create an account to access dad jokes",
                err
              });
            } else {
                console.log(decoded)
              next();
            }
          });
        } else{
            return res.status(403).json({
                message:
                  "This endpoint is restricted, Please signup.",
              });
        }
    }
}