const mongoose = require('mongoose');

const supheroimg = new mongoose.Schema({
    image: {
        type: String
        
    }
});

module.exports = mongoose.model('SupHeroImg', supheroimg);