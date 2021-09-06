import { Router } from "express"
import { User } from "../entities/user"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { HttpException } from "../helpers/httpException"
import httpRespone from "../helpers/httpRespone"
import passport from 'passport'
import * as passportLocal from 'passport-local'
// import * as passportGoogle from 'passport-google-oauth20';
import {v4 as uuid} from 'uuid';
import { BCRYPT, JWT } from "../consts/const"

const LocalStrategy = passportLocal.Strategy
// const GoogleStrategy = passportGoogle.Strategy;

const router = Router()



//normal login ------------->


passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username })
        .then(async user => {
            if (user) {
                const isMatchPass = await bcrypt.compare(password, user.password)
                if (isMatchPass) {
                    return done(null, user)
                }
                return done(null, null)
            } else {
                return done(null, null)
            }
        }).catch(err => {
            return done(err, null)
        })
}))

router.post('/auth/register', async (req, res, next) => {
    try {
        const user: User = {
            ...req.body,
            id: uuid(),
            password: bcrypt.hashSync(req.body.password, BCRYPT.SALTT_OR_ROUNDS)
        }
        const result = await User.insert(user)
        if (result) {
            //generate token
            const payload = {
                username: user.username,
                id: user.id
            }
            jwt.sign(payload, JWT.SECRET_KEY, { expiresIn: 1 * 24 * 60 * 60 * 1000 }, (err, encoded) => {
                if (err) next(err)
                return res.status(200).json(httpRespone.successRespone({ data: { accessToken: encoded , user: { id: user.id, fullName: user.fullName }} }))
            })
        }
        // next(new HttpException(500, 'server error'))
    } catch (err) {
        next(err)
    }
})

router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err)
        if (user) {
            const payload = {
                username: user.username,
                id: user.id
            }
            const token = jwt.sign(payload, JWT.SECRET_KEY)
            return res.status(200).json(httpRespone.successRespone({ data: { accessToken: token, user: { id: user.id, fullName: user.fullName, location: user.locationId, photoURL: user.photoURL } }, message: 'Login success' }))
        } else {
            return next(new HttpException(401, 'sai tài khoản hoạc mật khẩu'))
        }
    })(req, res, next)
})




export default router