const mongoose = require('mongoose');

const LICSchema = new mongoose.Schema({
    doc_name: {type: String},
    ref_no: {type: String, default: ''},
    sdate: {type: Date, default: ''},
    edate: {type: Date},
    val: {type: Number, default: ''},
    descr: {type: String, default: ''},
    grp: {type: String, default: ''},
    usern: {type: String},
    firm: {type: String}
});

const LIC = mongoose.model('LIC', LICSchema);

module.exports = LIC;