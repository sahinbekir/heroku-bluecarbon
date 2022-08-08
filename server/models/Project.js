const mongoose = require('mongoose');

const project = new mongoose.Schema({
    
    image: {
        type: String
    },
    name: {
        type: String
    },
    desc: {
        type: String
    },
    detail: {
        type: String
    },
    url: {
        type: String
    }
});

module.exports = mongoose.model('Project', project);