const bcrypt = require('bcryptjs');
const { Router } = require('express');
const router = Router();
const UserModels = require('./../models/userModels');
const middleware= require('./../middleware/verifyBody')

router.post('/register',   middleware.checkIfUserExist() ,async(req, res, next) => {
    try {
        const {full_name, email, password } = req.body;
        if(!full_name, !email, !password ){
            res.status(400).json({
                error: 'Please Provide full_name, email and password to register',
                full_name,
                email,
                password
            })
        }else{
            const user = await UserModels.addUser({full_name, email, password });
            const allUser = await  UserModels.fetchUsers()
            res.status(201).json({
                message: 'Successfully created a new user',
                user,
            })
        }
    } catch (error) {
        res.status(500).status({
            errMsg: 'Server Error',
            error
        })
    }
   
});

module.exports = router;

