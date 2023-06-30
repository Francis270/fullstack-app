import { Response, Request, NextFunction } from 'express';
import { User, Role, UserConfig } from '@prisma/client';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../../db';

import { env } from './../../utils/config';
import MessageResponse from './../../interfaces/MessageResponse';

export const register = async (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    try {
        const username: string  = req.body.username;
        const password: string  = req.body.password;
        const role: string      = req.body.role;

        const exists = await db.user.findFirst({
            where: { username }
        });
        if (exists) {
            throw new Error(`Username ${username} is already taken.`);
        }
        const hash = await bcrypt.hash(password, env.SALT_ROUNDS);
        await db.user.create({
            data: {
                username: username,
                hash: hash,
                role: Role[role as keyof typeof Role]
            }
        });
        res.status(201).json({ message: `User ${username} has been created.` });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err, user, _info) => {
        try {
            if (err) {
                throw new Error(err);
            }
            if (!user) {
                throw new Error('No user found.');
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    throw new Error(err);
                }
                const token = jwt.sign(user, env.SECRET_KEY);

                return res.status(200).json({ message: token });
            })
        } catch (error) {
            next(error);
        }
    })(req, res, next);
}

export const getUserConfig = async (req: Request, res: Response<UserConfig>, next: NextFunction) => {
    try {
        const user = res.locals.user as User;
        const userWithConfig = await db.user.findUnique({
            where: {
                username: user.username
            },
            include: {
                config: true
            }
        })
        
        if (!userWithConfig || !userWithConfig.config) {
            throw new Error(`User ${user.username} does'nt have config.`);
        }
        res.status(200).json(userWithConfig.config);
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req: Request, res: Response<User>, next: NextFunction) => {
    try {
        const username: string = req.params.username;
        const user = await db.user.findUnique({
            where: {
                username: username
            }
        })
        
        if (!user) {
            throw new Error(`User ${username} not found.`);
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    try {
        const user = res.locals.user as User;
        const deletedUser = await db.user.delete({
            where: {
                username: (user as User).username
            }
        });
        
        res.json({ message: `User ${deletedUser.username} deleted.` });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req: Request, res: Response<MessageResponse>, next: NextFunction) => {
    try {
        const user = res.locals.user as User;
        const newpassword: string = req.body.newpassword;
        let hash = '';
        
        if (newpassword) {
            hash = await bcrypt.hash(newpassword, env.SALT_ROUNDS);
        }
        await db.user.update({
            where: {
                username: (user as User).username
            },
            data: {
                hash
            }
        })
        res.json({ message: `User ${user.username} updated.` });
    } catch (error) {
        next(error);
    }
}