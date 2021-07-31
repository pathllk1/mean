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

tcs: {type: Number},
  fare: {type: Number},
  fare_hsn: {type: Number},
  fare_grate: {type: Number},
  fare_cgst: {type: Number},
  fare_sgst: {type: Number},
  fare_igst: {type: Number},
  fare_tot: {type: Number},
  ldunld: {type: Number},
  ldunld_hsn: {type: Number},
  ldunld_grate: {type: Number},
  ldunld_cgst: {type: Number},
  ldunld_sgst: {type: Number},
  ldunld_igst: {type: Number},
  ldunld_tot: {type: Number},
  insr: {type: Number},
  insr_hsn: {type: Number},
  insr_grate: {type: Number},
  insr_cgst: {type: Number},
  insr_sgst:{type: Number},
  insr_igst: {type: Number},
  insr_tot: {type: Number}
});

const BILLS = mongoose.model('BILLS', BILLSSchema);

module.exports = BILLS;