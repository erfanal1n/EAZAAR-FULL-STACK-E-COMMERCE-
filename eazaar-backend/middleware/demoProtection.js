const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { secret } = require("../config/secret");
const Admin = require('../model/Admin');

const demoProtection = async (req, res, next) => {
  try {
    const method = req.method.toUpperCase();
    const destructiveMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    
    if (!destructiveMethods.includes(method)) {
      return next();
    }
    
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return next();
    }
    
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, secret.token_secret);
    } catch (error) {
      return next();
    }
    
    if (decoded.email && decoded.email.toLowerCase() === 'demo@eazaar.com') {
      return res.status(403).json({
        success: false,
        message: 'Modifications are not allowed for demo accounts. This is a read-only demonstration.',
        demoMode: true
      });
    }
    
    if (decoded._id) {
      const admin = await Admin.findById(decoded._id);
      
      if (admin && admin.demoMode === true) {
        return res.status(403).json({
          success: false,
          message: 'Modifications are not allowed for demo accounts. This is a read-only demonstration.',
          demoMode: true
        });
      }
    }
    
    next();
    
  } catch (error) {
    next();
  }
};

module.exports = { demoProtection };