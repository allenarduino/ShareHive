const jwt = require('jsonwebtoken');

// JWT Middleware
exports.jwtMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({success: false, message: 'No token provided'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({success: false, message: 'Invalid token'});
  }
};
