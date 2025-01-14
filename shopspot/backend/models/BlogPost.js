const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure `author` references `User`
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
