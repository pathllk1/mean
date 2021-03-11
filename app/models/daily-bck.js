const mongoose = require('mongoose');

const daily_bckSchema = new mongoose.Schema({
    dt: {type: Date},
    bck: {type: Boolean},
    usern: {type: String},
    firm: {type: String}
});

const daily_bck = mongoose.model('daily_bck', daily_bckSchema);

module.exports = daily_bck;