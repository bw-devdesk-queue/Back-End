const bcrypt = require('bcryptjs');
const { Router } = require('express');
const router = Router();
const adminModels = require('./../models/adminModels');
const middleware= require('./../middleware/verifyBody')

router.post('/register',   middleware.checkIfAdminExist() ,async(req, res, next) => {
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
            const admin = await adminModels.addAdmin({full_name, email, password });
            res.status(201).json({
                message: 'Successfully created a new Admin',
                admin,
            })
        }
    } catch (error) {
        res.status(500).json({
            errMsg: 'Server Error',
            error
        })
    }
   
});

module.exports = router;

