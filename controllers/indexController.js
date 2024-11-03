import db from '../db/queries.js';
import { InternalServerError } from '../middleware/error.js';

export const home = async (req, res, next) => {
  try {
    const posts = await db.getAllPost();
    if (posts.length > 0) res.locals.posts = posts;
    res.render('pages/index');
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};

export const member = async (req, res, next) => {
  try {
    const users = await db.getAllUser();
    if (users.length > 0) res.locals.users = users;
    res.render('pages/member');
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};
