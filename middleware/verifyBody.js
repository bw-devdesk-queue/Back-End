const userModels = require("./../models/userModels");
const adminModels = require("./../models/adminModels");

const checkIfUserExist = () => {
  return async (req, res, next) => {
    if (Object.keys(req.body).length <= 0) {
      return res.status(404).json({
        message: "Please fill out the form to login"
      });
    }
    try {
      const { full_name, email, password, role } = req.body;

      if ((!full_name || !email || !password || !role)) {

        return res.status(400).json({
          error: "Please Provide full_name, email and password to register",
          full_name: full_name,
          email: email,
          role: role,
          password: password
        });
      } 
      const user = await userModels.fetchUserBy(email);
      if (!user) {
        next();
      } else {
        return res.status(403).json({
          message: `user with email of ${req.body.email} exist already in the db, try a new email`
        });
      }
    } catch (error) {
      return res.status(400).json({
        errMsg: "Server Error",
        error: error.message
      });
    }
  };
};

const checkIfAdminExist = () => {

  return async (req, res, next) => {
    console.log(req.body)

    if (Object.keys(req.body).length <= 0) {
      return res.status(404).json({
        message: "Please fill out the form to login"
      });
    }
    try {

      const {full_name, email, password, role} = req.body;
      if(!full_name || !email || !password || !role ){ 
         return res.status(400).json({
              error: 'Please Provide full_name, email and password to register',
              full_name,
              email,
              password,
              role
          })
      }

      const admin = await adminModels.fetchAdminBy(email);
      if (!admin) {
        next();
      } else {
        return res.status(403).json({
          message: `Admin with email of ${email} exist already in the db, try a new email`,
          admin: {
            id: admin.id,
            full_name: admin.full_name,
            email
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: `Server error`,
        error: error.message
      });
    }
  };
};
module.exports = {
  checkIfUserExist,
  checkIfAdminExist
};
