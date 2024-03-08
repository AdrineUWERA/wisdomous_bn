import express from 'express';
import passport from 'passport';
import '../middlewares/passport';
import { loginWithGoogle } from '../controllers/user.controller.js';
import dotenv from 'dotenv';

dotenv.config();

const googleUserRouter = express.Router();

googleUserRouter.get('/users/login/google', (req, res) => {
  res
    .status(200)
    .send(
      `<a href="${process.env.PRODUCTION_URL}/auth/google/"/>Login with Google</a>`
    );
});

googleUserRouter.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

googleUserRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google',
    successRedirect: '/auth/google/success',
  })
);
googleUserRouter.get('/auth/google/success', loginWithGoogle);

export default googleUserRouter;
