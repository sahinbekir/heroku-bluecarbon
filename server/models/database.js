const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
//process.env.MONGODB_URI
console.log("mdb_uri:" ,process.env.MONGODB_URI)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'console error: '));
db.once('open', function(){
    console.log('Connected')
});

//Models
require('../models/PrllxImg');
require('../models/PrllxText');
require('../models/MenuTitle');
require('../models/Project');
require('../models/KeyInitiatives');
require('../models/Link');
require('../models/PragText');
require('../models/JourneySoFar');
require('../models/SupHeroImg');

