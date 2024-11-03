import { Router } from 'express';
import { postValidator, signupValidator } from '../middleware/validator.js';

import { NotFoundError } from '../middleware/error.js';
import * as user from '../controllers/userController.js';
import * as post from '../controllers/postController.js';
import * as index from '../controllers/indexController.js';

const router = Router();

// Ensure all routes receive locals.user
router.all('*', (req, res, next) => {
  if (req.user) res.locals.user = req.user;
  next();
});

router.get('/delete/:postId', post.deletePost);
router.get('/signup', user.signup.get);
router.get('/login', user.login.get);
router.get('/new-post', post.create.get);
router.get('/logout', user.logout);
router.get('/member', index.member);
router.get('/', index.home);

router.post('/signup', signupValidator, user.signup.post);
router.post('/login', user.login.post);
router.post('/new-post', postValidator, post.create.post);
router.post('/join', user.join);

router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

export default router;
