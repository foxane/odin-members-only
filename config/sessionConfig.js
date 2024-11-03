import session from 'express-session';
import pool from '../db/pool.js';
import pgConnect from 'connect-pg-simple';
const PgStore = pgConnect(session); // Create connect-pg-simple class

export default () =>
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PgStore({ pool: pool, createTableIfMissing: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 day expire
    },
  });
