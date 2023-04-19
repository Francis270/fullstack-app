import bodyParser from 'body-parser';
import passport from 'passport';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import './utils/passport';
import MessageResponse from './interfaces/MessageResponse';
import ErrorHandler from './middlewares/ErrorHandler';
import NotFound from './middlewares/NotFound';
import api from './api';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '25mb' }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get<{}, MessageResponse>('/', (_req, res) => {
	res.json({ message: 'welcome home' });
});

app.use('/api/v1', api);

app.use(NotFound);
app.use(ErrorHandler);

export default app;