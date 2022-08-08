const mongoose = require('mongoose');

const link = new mongoose.Schema({

    desc: {
        type: String
    },
    url: {
        type: String
    }
});

module.exports = mongoose.model('Link', link);