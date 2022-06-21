import express, { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import User from '../../models/User'

const router: Router = express.Router();

//* route     POST api/users
//* desc      Register User
//* access    Public
router.post(
  '/',
  [
    body('name', 'Name is require!').notEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters.').isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
    // ===== Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      // ===== checks if user already exist
      const userExist = await User.findOne({ email })

      if (userExist) {
        return res.status(400).json([{ msg: 'User already exist.' }])
      }

      // ===== Create new User
      const user = new User({
        name,
        email,
        password
      })

      // ===== Hash password
      const salt = await bcrypt.genSalt((10))
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      res.status(201).json('user created')
    } catch (err) {

    }

  }
);

module.exports = router;
