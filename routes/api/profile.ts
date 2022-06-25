import express, { Router, Request, Response } from 'express'
import authMiddleware from '../../middleware/auth'
import ProfileModel from '../../models/Profile'
import UserModel from '../../models/User'
const router: Router = express.Router();

//* route     GET api/profile/me
//* desc      Get current user's profile
//* access    Private
router.get('/me', authMiddleware, async (req: any, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id }).populate('User', ['name'])

    if (!profile) return res.status(400).json({ msg: 'Profile not found' })

    res.json(profile)

  } catch (err) {
    console.error(err)
    res.status(500).json('Server Error')
  }
});

module.exports = router;
