import express, { Router, Request, Response } from 'express';
import authMiddleware from '../../middleware/auth';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/User';
const router: Router = express.Router();

//* route     GET api/auth
//* desc      Test route
//* access    Public
router.get('/', authMiddleware, async (req: any, res: Response) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password')
    res.json(user)

  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error')
  }
});

//* route     POST api/auth
//* desc      Authenticate User and Get Token
//* access    Public
router.post(
  '/',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password is required!').exists()
  ], async (req: Request, res: Response) => {
    // ===== Validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      // ===== Checks if user already exist
      const userExist = await UserModel.findOne({ email })

      if (!userExist) {
        return res.status(400).json([{ msg: 'Invalid Credentials!' }])
      }

      // ===== Checks is password matches
      const passwordIsMatch = bcrypt.compare(password, userExist.password)

      if (!passwordIsMatch) return res.status(400).json([{ msg: 'Invalid Credentials!' }])

      // ===== JSONWEBTOKEN
      const payload = {
        user: {
          id: userExist.id
        }
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: 360000 })

      res.status(201).json({ token })
    } catch (err) {

    }

  }
);

module.exports = router;
