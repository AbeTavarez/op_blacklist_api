import express, { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    res.status(200).json({ data: req.body });
  }
);

module.exports = router;
