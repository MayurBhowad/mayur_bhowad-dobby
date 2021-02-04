const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    images: [
        {
            image_name: {
                type: String,
            },
            image_path: {
                type: String,
            },
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('posts', postSchema);