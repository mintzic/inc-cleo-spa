import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Check if the user has a valid JWT token else check the session
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies[process.env.REMEMBER_TOKEN as string];
  if (token) {
    jwt.verify(token, process.env.AUTH_JWT_SECRET as string, (err: unknown) => {
      if (err) {
        throw new Error('Unauthorized');
      }
      next();
    });
  } else if (req.session && req.session.user_id) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default isAuthenticated;
