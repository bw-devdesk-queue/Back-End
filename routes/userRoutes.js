// require('dotenv').config()
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')

const secret = process.env.JWT_SECRETE;

const router = Router();

const ticketRoutes = require('./ticketRoutes');

router.use('/', ticketRoutes)

const UserModels = require('./../models/userModels');
const middleware= require('./../middleware/verifyBody');
const restricted = require('./../middleware/restricted');

router.post('/register',   middleware.checkIfUserExist() ,async(req, res, next) => {  
   
    try {
        const {full_name, email, password, role } = req.body;
        if(!full_name, !email, !password, !role){
            return res.status(400).json({
                error: 'Please Provide full_name, email and password to register',
                full_name,
                email,
                role,
                password
            })
        }else{
            const user = await UserModels.addUser({full_name, email, password, role});

            const token = signToken({
                userId: user.id,
                full_name,

                email
            });
            return res.status(201).json({
                message: 'Successfully created a new user',
                user:{
                    id: user.id,
                    full_name: user.full_name,
                    token
                },
            })
        }
    } catch (error) {

       return res.status(400).json({
            errMsg: 'Server Error',
            error
        });
    }
   
});

router.post('/login', async (req, res, next) => {
    if (Object.keys(req.body).length <= 0) {
        return res.status(404).json({
          message: "Please fill out the form to login"
        });
      }
    try {
        const {full_name, email, password } = req.body;
        
        if( !email, !password ){
            res.status(400).json({
                error: 'Please Provide email and password to register',
                email,
                password
            })
        }else{
            const user = await UserModels.fetchUserBy(email)
            const validatePassword = bcrypt.compareSync(password, user.password);
            if(!validatePassword || !user){
                res.status(404).json({
                    message: 'Invalid Credentials'
                })
            }else{
                const token = signToken({
                    userId: user.id,
                    full_name,
                    email
                });
                res.status(200).json({
                    message: "Login successful",
                    user: {
                        userId: user.id,
                        full_name,
                        email,
                        role: user.role
                    },
                    token
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            errMsg: 'Server Error',
            error
        });
    }
});

router.get('/', restricted(), async (req, res, next) => {
    const users = await UserModels.fetchUsers();
    res.status(200).json({
        message: "users",
        users
    })
})
function signToken(user) {
    
    const options = {
      expiresIn: "2hr"
    };
  
    return jwt.sign(user, secret, options);
  }


module.exports = router;

