import express, { Router, Request, Response } from 'express';
import authMiddleware from '../../middleware/auth';
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

module.exports = router;
