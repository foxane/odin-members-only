import bcrypt from 'bcryptjs';
import db from '../db/queries.js';
import { validationResult } from 'express-validator';
import passport from 'passport';
import { InternalServerError } from '../middleware/error.js';

export const signup = {
  get: (req, res) => {
    if (req.user) return redirect('/profile');
    res.render('pages/auth');
  },
  post: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.errors;
      res.locals.errType = 'signup'; // Tell what error to page
      return res.render('pages/auth');
    }

    try {
      const pwHash = await bcrypt.hash(req.body.password, 10);
      await db.createUser(req.body.fullName, req.body.username, pwHash);
      res.locals.success = 'Account created successfully!';
      res.render('pages/auth');
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  },
};

export const login = {
  get: (req, res) => {
    if (req.user) return redirect('/profile');
    res.render('pages/auth');
  },
  post: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
};

export const logout = (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

export const join = async (req, res, next) => {
  if (req.body.code === 'cat') {
    try {
      await db.makeMember(req.user.id);
      res.redirect('/');
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  }
};
