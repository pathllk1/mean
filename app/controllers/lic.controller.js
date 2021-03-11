const Lic = require("../models/LIC");
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const Daily_bck = require("../models/daily-bck");

exports.add = (req, res) => {
    const details = new Lic();
    details.doc_name = req.body.doc_name;
    details.ref_no = req.body.ref_no || null;
    details.sdate = req.body.sdate || null;
    details.edate = req.body.edate;
    details.val = req.body.val || null;
    details.grp = req.body.grp || null;
    details.descr = req.body.descr || null;
    details.usern = req.body.usern;
    details.firm = req.body.firm;
    details.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.send(err);
        }
    });
}

exports.update = (req, res) => {
    Lic.findById(req.body.id, function (err, details) {
        if (!details)
            res.send('Unable To Find Lic With This Id');
        else {
            details.doc_name = req.body.doc_name;
            details.ref_no = req.body.ref_no || null;
            details.sdate = req.body.sdate || null;
            details.edate = req.body.edate;
            details.val = req.body.val || null;
            details.grp = req.body.grp || null;
            details.descr = req.body.descr || null;
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

exports.list = (req, res) => {
    Lic.find({ 'usern': req.body.usern }, null, { sort: { 'edate': -1 } }, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Lic list: ' + err);
        }
    });
}

exports.getlic = (req, res) => {
    Lic.findOne({ '_id': req.body.id }, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            res.json(err)
        }
    });
}

exports.dellic = (req, res) => {
    Lic.deleteOne({ '_id': req.body.id }, (err, docs) => {
        if (!err) {
            res.json("Record Deleted Success");
        } else {
            res.json(err)
        }
    });
}

exports.chkmail = (req, res) => {
    let ts = new Date(Date.now() + (30 * 86400000));
    let cnt = 0;
    Lic.find({ 
        'usern': req.body.usern,
        'edate': {
            '$lte': ts
        }
    }, null, { sort: { 'edate': -1 } }, (err, docs) => {
        if (!err) {
            let msg = '<b>Please Check The Given Below Documents Validity!</b><br/>';
            msg += '<table border="2">';
            msg += '<tr><th>DOCUMENT NAME</th><th>REFERENCE NO</th><th>VALID UPTO</th></tr>';
            docs.forEach((doc) => {
                msg += '<tr>';
                msg += '<td>' + doc.doc_name + '</td>';
                msg += '<td>' + doc.ref_no + '</td>';
                msg += '<td>' + doc.edate + '</td>';
                msg += '</tr>';
                cnt = cnt + 1;
            })
            msg += '</table><br/>'
            var options = {
                auth: {
                    api_key: process.env.MAIL_API || 'anjanpaul'
                }
            }
            var mailer = nodemailer.createTransport(sgTransport(options));
            msg += '<h4>Anjan Paul</h4>';
            var email = {
                to: [req.body.email, 'pathllk3@gmail.com'],
                from: 'anjanvkp@gmail.com',
                subject: 'REVIEW OF DOCUMENTS VALIDITY!',
                text: 'anjan',
                html: msg
            };

            if(cnt > 0){
                mailer.sendMail(email, function (err, data) {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.send(data)
                    }
                });
            }
            else{
                res.send("No Data to Email!");
            }
        } else {
            res.send('Error in retrieving Lic list: ' + err);
        }
    });
}

exports.chk_bck = (req, res) => {
    Daily_bck.findOne({usern: req.body.usern}, {}, { sort: { 'dt' : -1 } }, (err, docs) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err)
        }
    })
}

exports.crtbck = (req, res) => {
    const details = new Daily_bck();
    details.dt = req.body.dt;
    details.bck = req.body.bck;
    details.usern = req.body.usern;
    details.firm = req.body.firm;
    details.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.send(err);
        }
    });
}