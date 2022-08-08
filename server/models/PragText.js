const mongoose = require('mongoose');

const pragtext = new mongoose.Schema({
    
   
    prag: {
        type: String
    }
});

module.exports = mongoose.model('Pragtext', pragtext);