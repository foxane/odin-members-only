import { validationResult } from 'express-validator';
import db from '../db/queries.js';
import { InternalServerError } from '../middleware/error.js';

export const create = {
  get: (req, res) => {
    if (!req.user) return res.redirect('/login');
    res.render('pages/new-post');
  },
  post: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.errors;
      return res.render('pages/new-post');
    }

    try {
      await db.createPost(req.user.id, req.body.title, req.body.content);
      res.redirect('/');
    } catch (error) {
      console.error(error);
      next(new InternalServerError());
    }
  },
};

export const deletePost = async (req, res, next) => {
  if (!req.user.is_admin) return res.redirect('/');

  try {
    await db.deletePost(Number(req.params.postId));
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};
