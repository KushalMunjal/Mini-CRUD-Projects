var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required : true,
        unique:true
    },
    description: {
        type: String,
        required : true,
        unique:true
    }
});
var user = new mongoose.model('User', schema);
module.exports = user;