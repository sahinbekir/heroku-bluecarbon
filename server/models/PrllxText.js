const mongoose = require('mongoose');

const prllxtext = new mongoose.Schema({
    
    parallax_title: {
        type: String
    },
    parallax_text: {
        type: String
    }
});

module.exports = mongoose.model('PrllxText', prllxtext);