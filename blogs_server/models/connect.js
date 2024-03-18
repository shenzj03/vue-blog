const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`)