import passport from 'passport'
import jwt from 'passport-jwt'
import local from 'passport-local'
import userModel from '../dao/models/users.js'
import {
    createHash,
    isValidPassword
} from '../utils.js'
import GitHubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coder39760'

    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload.user)

        } catch (error) {
            return done(error);
        }
    }))

    // passport.use('register', new LocalStrategy({
    //     passReqToCallback: true,
    //     usernameField: 'email'
    // }, async (req, username, password, done) => {
    //     const {
    //         first_name,
    //         last_name,
    //         email,
    //         age,
    //         cart,
    //         role
    //     } = req.body;
    //     try {
    //         const user = await userModel.findOne({
    //             email: username
    //         });
    //         if (user) {
    //             return done(null, false)
    //         }
    //         const usertoSave = {
    //             first_name,
    //             last_name,
    //             email,
    //             age,
    //             cart,
    //             role,
    //             password: createHash(password)
    //         }

    //         const result = await userModel.create(usertoSave);
    //         return done(null, result)
    //     } catch (error) {
    //         return done(`Error al obtener el usuario: ${error}`)
    //     }
    // }))

    // passport.use('login', new LocalStrategy({
    //     usernameField: 'email'
    // }, async (username, password, done) => {
    //     try {
    //         const user = await userModel.findOne({
    //             email: username
    //         });
    //         if (!user) {
    //             return done(null, false)
    //         }
    //         if (!isValidPassword(user, password)) return done(null, false);

    //         return done(null, user)
    //     } catch (error) {
    //         return done(`Error al obtener el usuario: ${error}`)
    //     }
    // }))

    // passport.use('github', new GitHubStrategy({
    //     clientID: "Iv1.5a5995082d1443b8",
    //     clientSecret: "7e97d08631780fa22bcb1694667aefeee67765c1",
    //     callbackURL: "http://localhost:8082/api/sessions/github-callback",
    //     scope: ['user:email']
    // }, async (accessToken, refreshToken, profile, done) => {
    //     try {
    //         const email = profile.emails[0].value;
    //         const user = await userModel.findOne({
    //             email
    //         })
    //         if (!user) {
    //             const newUser = {
    //                 first_name: profile._json.name,
    //                 last_name: '',
    //                 email,
    //                 password: ''
    //             }

    //             const result = await userModel.create(newUser);
    //             done(null, result);
    //         } else {
    //             done(null, user);
    //         }
    //     } catch (error) {
    //         return done(error);
    //     }
    // }))

    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // })
    // passport.deserializeUser(async (id, done) => {
    //     const user = await userModel.findById(id)
    //     done(null, user);
    // })
}
const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['coderCookieToken']
    }
    return token;
}
export default initializePassport;