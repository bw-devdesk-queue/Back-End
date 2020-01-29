const userModels = require('./../models/userModels');
const adminModels = require('./../models/adminModels');
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
const  checkIfAdminExist = () => {
    return async (req, res, next) =>{
        const admin = await adminModels.fetchAdminBy(req.body.email)
        if(!admin){
            next()
        }else{
           return res.status(403).json({
                message: `Admin with email of ${req.body.email} exist already in the db, try a new email`,
                admin

            })
        }
    }
}
module.exports = {
    checkIfUserExist,
    checkIfAdminExist
}