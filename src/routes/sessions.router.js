import {
    Router
} from 'express'
import passport from 'passport'


const router = Router();

router.post('/register', passport.authenticate('register', {
    failureRedirect: 'fail-register'
}), async (req, res) => {
    res.status(200).send({
        status: 'success',
        message: 'user registered'
    })

})
router.get('/fail-register', async (req, res) => {
    res.status(400).send({
        status: 'error',
        message: 'register failed'
    })
})

router.post('/login', passport.authenticate('login', {
    failureRedirect: 'fail-login'
}), async (req, res) => {

    if (!req.user) {
        return res.status(401).send({
            status: 'error',
            error: 'User not found'
        });
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email
    }
    res.status(200).send({
        status: 'success',
        message: 'Login success'
    })
})
router.get('/fail-login', async (req, res) => {
    res.status(401).send({
        status: 'error',
        message: 'login failed'
    })
})

router.get('/github', passport.authenticate(
    'github', {
        scope: ['user:email']
    }
), async (req, res) => {
    res.status(200).send({
        status: "success",
        message: "User registered"
    })
});

router.get('/github-callback', passport.authenticate(
    'github', {
        failureRedirect: '/login'
    }
), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/')
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({
            status: 'error',
            error: 'logout fail'
        });
        res.redirect('/')
    })
})

export default router;