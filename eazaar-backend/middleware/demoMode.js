const Admin = require('../model/Admin');

const checkDemoMode = async (req, res, next) => {
  try {
    // Skip demo check if no user is authenticated
    if (!req.user || (!req.user.id && !req.user._id)) {
      return next();
    }
    
    // Handle both possible token structures
    const userId = req.user.id || req.user._id;

    // Find admin by ID
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(401).json({ 
        success: false,
        message: 'Admin not found' 
      });
    }

    // Check if user is demo user
    const demoEmails = ['demo@eazaar.com'];
    const isDemoUser = admin.demoMode === true || demoEmails.includes(admin.email.toLowerCase());
    
    // Block destructive operations for demo users
    if (isDemoUser) {
      const method = req.method.toUpperCase();
      const destructiveMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
      
      if (destructiveMethods.includes(method)) {
        // ALWAYS block - don't allow any exceptions
        return res.status(403).json({ 
          success: false,
          message: 'Demo mode active: Modifications are not allowed. This is a read-only demo account.',
          demoMode: true,
          blocked: true,
          user: admin.email,
          method: method,
          route: req.originalUrl
        });
      }
    }

    // Set demo mode flag for downstream middleware
    req.isDemoMode = isDemoUser;
    next();
    
  } catch (error) {
    // Log error but don't continue on error - this ensures security
    console.error('Demo mode check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Demo mode check failed',
      error: 'DEMO_CHECK_ERROR'
    });
  }
};

const preventDemoActions = (req, res, next) => {
  if (req.isDemoMode) {
    return res.status(403).json({ 
      success: false,
      message: 'Demo mode active: This action is not allowed in demo mode.',
      demoMode: true 
    });
  }
  next();
};

module.exports = { checkDemoMode, preventDemoActions };