const Contact = require('../models/contacts');

exports.add = (req, res) => {
    const con = new Contact({
        name: {
            first: req.body.first || null,
            last: req.body.last || null
        },
        company: req.body.company || null,
        desig: req.body.desig || null,
        phno: {
            mobile: req.body.mobile || null,
            home: req.body.home || null
        },
        email: {
            primary: req.body.primary || null,
            sec: req.body.sec || null
        },
        usern: req.body.usern,
        firm: req.body.firm
    });
    con.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.send(err);
        }
    });
}

exports.list = (req, res) => {
    Contact.find({ 'usern': req.body.usern }, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Lic list: ' + err);
        }
    });
}

exports.getcontact = (req, res) => {
    Contact.findOne({ '_id': req.body.id }, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            res.json(err)
        }
    });
}

exports.update = (req, res) => {
    Contact.findById(req.body.id, function (err, details) {
        if (!details)
            res.send('Unable To Find Contact With This Id');
        else {
            details.name.first = req.body.first || null;
            details.name.last = req.body.last || null;
            details.company = req.body.company || null;
            details.desig  = req.body.desig || null;
            details.phno.mobile = req.body.mobile || null;
            details.phno.home = req.body.home || null;
            details.email.primary = req.body.primary || null;
            details.email.sec = req.body.sec || null
            details.usern = req.body.usern;
            details.firm = req.body.firm;
            
            details.save().then(emp => {
                res.json('Document Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update Lic" + err);
                });
        }
    });
}

exports.delcontact = (req, res) => {
    Contact.deleteOne({ '_id': req.body.id }, (err, docs) => {
        if (!err) {
            res.json("Record Deleted Success");
        } else {
            res.json(err)
        }
    });
}