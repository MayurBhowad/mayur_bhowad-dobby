const express = require('express');
const passport = require('passport');
const Multer = require('multer');

const router = express.Router();

const Post = require('../../models/post.model');
const User = require('../../models/user.model');

const uploadPostImageToStorage = require('../../middleware/uploadPostImageToStorage');

//Multer
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

//@route    GET api/post/test
//@desc     Test post rout
//@access   Public
router.get('/test', (req, res) => { res.status(200).json({ message: 'Post ROute Work' }) });

// @route    GET api/post/
// @desc     Get posts
// @access   Public
router.get('/:id', (req, res) => {
    Post.find({ user: req.params.id }).sort({ date: -1 }).populate('user', ['username', 'role']).then(posts => {
        res.json(posts[0])
    }).catch(err => {
        res.status(404).json({ nopostfound: 'No Post Found!' })
    });
});



//@route    POST api/post/
//@desc     Create post
//@access   Private
router.post('/',
    passport.authenticate('jwt', { session: false }),
    multer.single('imagePreview'),
    (req, res) => {

        let postImage = req.file;
        uploadPostImageToStorage(postImage).then(ress => {
            const newPost = new Post({
                user: req.user.id,
            })

            Post.findOne({ user: req.user.id }).then(us => {
                if (!us) {
                    User.findOne({ id: req.user.id }).then(user => {
                        newPost.save().then(da => {
                            const newImg = {
                                image_name: req.body.text,
                                image_path: ress
                            }
                            da.images.unshift(newImg);
                            da.save().then(post => res.json(post));
                        })
                    })
                } else {
                    const newImg = {
                        image_name: req.body.text,
                        image_path: ress
                    }
                    us.images.unshift(newImg);
                    us.save().then(post => res.json(post));
                }


            })
        });
    })

module.exports = router;