const validateAuth = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          error: 'Unauthorized', 
          message: 'No token provided' 
        });
      }
  
      const token = authHeader.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ 
          error: 'Unauthorized', 
          message: 'Invalid token format' 
        });
      }
  
      // For now, we'll just validate that a token exists
      // In production, you'd want to verify the token with Clerk
      next();
      
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Authentication failed' 
      });
    }
  };
  
  module.exports = validateAuth;