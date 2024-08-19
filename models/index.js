const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Define the relationships between the models

// User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// A post will belong to one User
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// A comment will belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// A comment will belong to a post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// A post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// A user can make many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

module.exports = {User, Post, Comment};

