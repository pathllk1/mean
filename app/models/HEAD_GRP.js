const mongoose = require('mongoose');

const HEAD_GRPSchema = new mongoose.Schema({
    pto: {type: String},
    grp: {type: String},
    usern: {type: String},
    firm: {type: String}
});

const HEAD_GRP = mongoose.model('HEAD-GRP', HEAD_GRPSchema);

module.exports = HEAD_GRP;