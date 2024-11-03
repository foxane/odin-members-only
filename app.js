import 'dotenv/config.js';
import express from 'express';
import path from 'node:path';
import passport from 'passport';

import routes from './routes/index.js';
import passportConfig from './config/passportConfig.js';
import sessionConfig from './config/sessionConfig.js';
import { errorMiddleware } from './middleware/error.js';

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(sessionConfig());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
passportConfig(passport);

app.use('/', routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`Server started at ${PORT}`);
});
