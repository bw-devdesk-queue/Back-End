const userModels = require('./../models/userModels');
const  checkIfUserExist = () => {
    return async (req, res, next) =>{
        const user = await userModels.fetchUserBy(req.body.email)
        if(!user){
            next()
        }else{
           return res.status(403).json({
                message: `user with email of ${req.body.email} exist already in the db, try a new email`
            })
        }
    }
}
module.exports = {
    checkIfUserExist
}