const BILLS = require("../models/bills");
const STOCK = require("../models/stock");
const STOCK_REG = require("../models/stock_reg");

exports.list = (req, res) => {
    try {
        STOCK.find((err, docs) => {
            if (!err) {
                res.json(docs)
            } else {
                console.log('Error in retrieving STOCK list: ' + err);
            }
        });
    }
    catch (er) {
        console.log(er)
    }
}

exports.list_bill = (req, res) => {
    try {
        BILLS.find((err, docs) => {
            if (!err) {
                res.json(docs)
            } else {
                console.log('Error in retrieving BILL list: ' + err);
            }
        });
    }
    catch (er) {
        console.log(er)
    }
}

exports.list_reg = (req, res) => {
    try {
        STOCK_REG.find((err, docs) => {
            if (!err) {
                res.json(docs)
            } else {
                console.log('Error in retrieving STOCK list: ' + err);
            }
        });
    }
    catch (er) {
        console.log(er)
    }
}

exports.get_item = (req, res) => {
    try {
        STOCK_REG.findOne({ '_id': req.body.id }, (err, docs) => {
            if (!err) {
                res.json(docs)
            } else {
                console.log('Error in retrieving STOCK item: ' + err);
            }
        });
    }
    catch (er) {
        console.log(er)
    }
}

exports.get_item_by_name = (req, res) => {
    try {
        STOCK.findOne({ 'item': req.body.item }, (err, docs) => {
            if (!err) {
                res.json(docs)
            } else {
                console.log('Error in retrieving STOCK item: ' + err);
            }
        })
    }
    catch (er) {
        console.log(er)
    }
}

exports.save = (req, res) => {
    try {
        if (!req.body.id) {
            insertRecord(req, res);
        } else {
            updateRecord(req, res);
        }
    }
    catch (er) {
        console.log(er)
    }
}

exports.save_bill = (req, res) => {
    try {
        const p = new BILLS(req.body);
        p.save((err, doc) => {
            if (!err) {
                res.send("Data Saved Successfully");
            }
            else {
                res.send("Error in Data Saving: " + err);
            }
        });
    }
    catch (er) {
        console.log(er)
    }
}

function insertRecord(req, res) {
    STOCK.updateOne({ item: req.body.item },
        {
            item: req.body.item,
            pno: req.body.pno,
            oem: req.body.oem,
            hsn: req.body.hsn,
            qty: req.body.qtyh,
            uom: req.body.uom,
            rate: req.body.rate,
            grate: req.body.grate,
            total: req.body.total,
            user: req.body.user,
            firm: req.body.firm
        }, { upsert: true }, (err, doc) => {
            if (!err) {
                const p = new STOCK_REG(req.body);
                p.save((err, doc) => {
                    if (!err) {
                        res.send("Data Saved Successfully");
                    }
                    else {
                        res.send("Error in Data Saving: " + err);
                    }
                });
            }
            else {
                res.send("Error in Data Saving: " + err);
            }
        })
}



function updateRecord(req, res) {
    STOCK.updateOne({ item: req.body.item },
        {
            item: req.body.item,
            pno: req.body.pno,
            oem: req.body.oem,
            hsn: req.body.hsn,
            qty: req.body.qtyh,
            uom: req.body.uom,
            rate: req.body.rate,
            grate: req.body.grate,
            total: req.body.total1,
            user: req.body.user,
            firm: req.body.firm
        }, { upsert: true }, (err, doc) => {
            if (err)
                res.send("Error in Data Saving: " + err);
        })
    STOCK_REG.findById(req.body.id, function (err, p1) {
        if (!p1)
            res.send("Error in Data Saving: " + err);
        else {
            p1.type = req.body.type;
            p1.bno = req.body.bno;
            p1.bdate = req.body.bdate;
            p1.supply = req.body.supply;
            p1.item = req.body.item;
            p1.pno = req.body.pno;
            p1.oem = req.body.oem;
            p1.hsn = req.body.hsn;
            p1.qty = req.body.qty;
            p1.qtyh = req.body.qtyh;
            p1.uom = req.body.uom;
            p1.rate = req.body.rate;
            p1.grate = req.body.grate;
            p1.disc = req.body.disc;
            p1.discamt = req.body.discamt;
            p1.cgst = req.body.cgst;
            p1.sgst = req.body.sgst;
            p1.igst = req.body.igst;
            p1.total = req.body.total;
            p1.project = req.body.project;
            p1.user = req.body.user;
            p1.firm = req.body.firm;
            p1.save().then(emp => {
                res.json('Stock Updated Successfully');
            }).catch(err => {
                res.status(400).send("Unable To Update Stock");
            });
        }
    })
}

