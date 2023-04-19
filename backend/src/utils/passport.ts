import { Strategy } from 'passport-local';
import { User } from '@prisma/client';
import passport from 'passport';
import bcrypt from 'bcrypt';
import db from '../db';

import { SECRET_KEY } from './../utils/config';

const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const authenticateUser = async (username: string, password: string, done: any) => {
    try {
        const user: User | null = await db.user.findFirst({
            where: {
                username
            }
        });
        
        if (!user) {
            return done('Wrong username');
        }
        if (!bcrypt.compareSync(password, user.hash!)) {
            return done('Wrong password');
        }
        done(null, user);
    } catch (error) {
        done(error);        
    }
}

const strategy  = new Strategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser);

passport.use(strategy);

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : SECRET_KEY
    },
    async (jwtPayload: User, done: any) => {
        const user: User | null = await db.user.findFirst({
            where: {
                id: jwtPayload.id
            }
        });

        if (!user) {
            return done(null, 'User not found.');
        }
        return done(null, user);
    })
);

export default passport;