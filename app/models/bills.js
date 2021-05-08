const mongoose = require('mongoose');

const BILLSSchema = new mongoose.Schema({
    bno: {type: String},
    bdate: {type: Date},
    supply: {type: String},
    addr: {type: String},
    gstin: {type: String},
    state: {type: String},
    gtot: {type: Number},
    disc: {type: Number},
    cgst: {type: Number},
    usern: {type: String},
    sgst: {type: Number},
    firm: {type: String},
    igst: {type: Number},
    rof: {type: Number},
    ntot: {type: Number},
});

const BILLS = mongoose.model('BILLS', BILLSSchema);

module.exports = BILLS;