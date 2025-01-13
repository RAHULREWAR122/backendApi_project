import jwt from 'jsonwebtoken'

export function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token){
      return res.status(401).json({ message: 'Access token required' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  }