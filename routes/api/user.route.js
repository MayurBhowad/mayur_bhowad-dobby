const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../../models/user.model');

//@desc     register user
//@route    user/api/register
//access    public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already registered!'
            return res.status(400).json(errors)
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                password: req.body.password1,
                password2: req.body.password2
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log(err);
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    })

})

//@desc     login user
//@route    user/api/login
//access    public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = 'User Not Found!';
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, username: user.username, email: user.email }

                jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                })
            } else {
                errors.password = 'Password Incorrect!'
                return res.status(400).json(errors)
            }
        })
    })
})


module.exports = router;