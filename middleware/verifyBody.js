const userModels = require("./../models/userModels");
const adminModels = require("./../models/adminModels");

const checkIfUserExist = () => {
  return async (req, res, next) => {
    if (Object.keys(req.body).length <= 0) {
      return res.status(404).json({
        message: "Please fill out the form to login"
      });
    } else {
      const user = await userModels.fetchUserBy(req.body.email);
      if (!user) {
        next();
      } else {
        return res.status(403).json({
          message: `user with email of ${req.body.email} exist already in the db, try a new email`
        });
      }
    }
  };
};

const checkIfAdminExist = () => {
  return async (req, res, next) => {
    if (Object.keys(req.body).length <= 0) {
      return res.status(404).json({
        message: "Please fill out the form to login"
      });
    }
    try {
      const { email } = req.body;
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
        error
      });
    }
  };
};
module.exports = {
  checkIfUserExist,
  checkIfAdminExist
};
