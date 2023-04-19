import { NextFunction, Request, Response } from 'express';
import { User, Role } from '@prisma/client';
import passport from 'passport';

import MessageResponse from '../interfaces/MessageResponse';

export const AuthAdmin = (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, async (err, user: User | undefined, _info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message : 'Authentication failed.' });
		}
		if (user.role !== Role.ADMIN) {
			return res.status(401).json({ message : `You don\'t have enough privileges.` });
		}
		res.locals.user = user;
		next();
    })(req, res, next);
}

export const Auth = (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, async (err, user: User | undefined, _info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message : 'Authentication failed.' });
		}
		res.locals.user = user;
		next();
    })(req, res, next);
}