import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token')

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied!' })

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    // req.user = decodedToken.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid!' })
  }
}