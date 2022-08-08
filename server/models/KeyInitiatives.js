const mongoose = require('mongoose');

const keyinitiatives = new mongoose.Schema({
    
    image: {
        type: String
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    url: {
        type: String
    }
});

module.exports = mongoose.model('KeyInitiatives', keyinitiatives);