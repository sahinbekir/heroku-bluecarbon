const mongoose = require('mongoose');

const menutitle = new mongoose.Schema({
    
    title: {
        type: String
    }
});

module.exports = mongoose.model('MenuTitle', menutitle);