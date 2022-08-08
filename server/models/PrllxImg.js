const mongoose = require('mongoose');

const prllximg = new mongoose.Schema({
    parallax_image: {
        type: String
    }
});

module.exports = mongoose.model('PrllxImg', prllximg);