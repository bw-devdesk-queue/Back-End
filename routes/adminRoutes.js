const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = Router();
const adminModels = require('./../models/adminModels');
const { checkIfAdminExist  } = require('./../middleware/verifyBody')
const JWT_SECRETE =  process.env.JWT_SECRETE;


router.post('/register',   checkIfAdminExist() ,async(req, res, next) => {
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
            const token = signToken({
                admin_id: admin.id,
                full_name,
                email
            })
            res.status(201).json({
                message: 'Successfully created a new Admin',
                token,
                admin: {
                    id: admin.id,
                    full_name: admin.full_name,
                    email
                  }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errMsg: 'Server Error',
            error
        })
    }
   
});


router.post('/login', async (req, res, next) => {
    const {full_name, email, password } = req.body;
    try {
        if(!email || !password ) {
            res.status(400).json({
                error: 'Please Provide email and password to register',
                email,
                password
            })
        }else{
            const admin = await adminModels.fetchAdminBy(email);
            if(admin && bcrypt.compareSync(password, admin.password)){
                const token = signToken({
                    admin_id: admin.id,
                    full_name,
                    email
                })
                res.status(200).json({
                    message: 'login successful',
                    token,
                    admin: {
                        id: admin.id,
                        full_name,
                        email
                    }
                })
            }else{
                res.status(404).json({
                    message: 'Invalid Credentials'
                })
            }
        }
    } catch (error) {
        console.log('+++++++', error)
        res.status(500).json({
            message: 'Server Error',
            error
        })
    }
   
});

function signToken(user) {
    
    const options = {
      expiresIn: "2hr"
    };
  
    return jwt.sign(user, JWT_SECRETE, options);
  }
module.exports = router;

