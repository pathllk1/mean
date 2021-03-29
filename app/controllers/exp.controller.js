const Exp = require("../models/EXP");
const HEAD_GRP = require("../models/HEAD_GRP");

exports.list = (req, res) => {
    Exp.find({'firm': req.body.usern}, null , {sort: {'dt' : -1}} ,(err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.list_all = (req, res) => {
    Exp.find((err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.cash_book = (req, res) => {
    Exp.find({ 'mode': 'CASH', 'firm': req.body.usern }, null, {sort: {'dt' : -1}} ,(err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.proj_report = (req, res) => {
    Exp.find({ 'head': req.body.head, 'firm': req.body.usern }, null, {sort: {'dt' : -1}} ,(err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}
exports.get_head_grp = (req, res) => {
    HEAD_GRP.findOne({
        'pto': req.body.pto,
        'usern' : req.body.usern,
        'firm' : req.body.firm
    } ,(err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}
exports.fetch_all = (req, res) => {
    Exp.find({
        'head': req.body.sr_head,
        'pto': req.body.sr_pto,
        'dt': {
            '$gte': new Date(req.body.dtfrm),
            '$lte': new Date(req.body.dtto)
        },
        'firm' : req.body.usern
    }, null, {sort: {'dt' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.fetch_pto_head = (req, res) => {
    Exp.find({
        'head': req.body.sr_head,
        'pto': req.body.sr_pto,
        'firm' : req.body.usern
    }, null, {sort: {'dt' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.fetch_dt_pto = (req, res) => {
    Exp.find({
        'pto': req.body.sr_pto,
        'dt': {
            '$gte': new Date(req.body.dtfrm),
            '$lte': new Date(req.body.dtto)
        },
        'firm' : req.body.usern
    }, null, {sort: {'dt' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.fetch_dt_head = (req, res) => {
    Exp.find({
        'head': req.body.sr_head,
        'dt': {
            '$gte': new Date(req.body.dtfrm),
            '$lte': new Date(req.body.dtto)
        },
        'firm' : req.body.usern
    }, null, {sort: {'dt' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.fetch_pto = (req, res) => {
    Exp.find({
        'pto': req.body.sr_pto,
        'firm' : req.body.usern
    }, null, {sort: {'dt' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.fetch_head = (req, res) => {
    Exp.find({
        'head': req.body.sr_head,
        'firm' : req.body.usern
    }, null, {sort: {'dt' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.fetch_dt = (req, res) => {
    Exp.find({
        'dt': {
            '$gte': new Date(req.body.dtfrm),
            '$lte': new Date(req.body.dtto)
        },
        'firm' : req.body.usern
    }, null, {sort: {'dt' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}
exports.add = (req, res) => {
    HEAD_GRP.findOne({
        'pto': req.body.pto,
        'usern' : req.body.usern,
        'firm' : req.body.firm
    } ,(err, docs) => {
        if (!docs) {
            const grp = new HEAD_GRP();
            grp.pto= req.body.pto;
            grp.grp = req.body.grp;
            grp.usern =req.body.usern;
            grp.firm =req.body.firm;
            grp.save();
        } else {
            console.log('GROUP ALREADY EXIST');
        }
    });
    const details = new Exp();
    details.rid = req.body.rid;
    details.dt = req.body.dt;
    details.mode = req.body.mode;
    details.pto = req.body.pto;
    details.head = req.body.head;
    details.grp = req.body.grp;
    details.amt = req.body.amt;
    details.pamt = req.body.pamt;
    details.purp = req.body.purp;
    details.usern = req.body.usern;
    details.type = req.body.type;
    details.firm = req.body.firm;
    details.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.send(err);
        }
    });
}

exports.add_trf = (req, res) => {
    const details = new Exp();
    details.rid = req.body.rid;
    details.dt = req.body.dt;
    details.mode = req.body.mode;
    details.pto = req.body.pto;
    details.head = req.body.head;
    details.grp = req.body.grp;
    details.amt = req.body.amt;
    details.pamt = req.body.pamt;
    details.purp = req.body.purp;
    details.usern = req.body.usern;
    details.type = req.body.type;
    details.firm = req.body.firm;
    details.save((err, doc) => {
        if (err)
            res.send(err);
    });

    const details1 = new Exp();
    details1.rid = req.body.rid;
    details1.dt = req.body.dt;
    details1.mode = req.body.pto;
    details1.pto = req.body.mode;
    details1.head = req.body.head;
    details1.grp = req.body.grp;
    details1.amt = '-' + req.body.amt;
    details1.pamt = '-' + req.body.pamt;
    details1.purp = req.body.purp;
    details1.usern = req.body.usern;
    details1.type = req.body.type;
    details1.firm = req.body.firm;
    details1.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            res.send(err);
        }
    });
}


exports.getid = (req, res) => {
    let id = req.params.id;
    Exp.findById(id, function (err, exp) {
        res.json(exp);
    });
}

exports.update = (req, res) => {
    Exp.findById(req.body._id, function (err, details) {
        if (!details)
            return next(new Error('Unable To Find Exp With This Id'));
        else {
            details.rid = req.body.rid;
            details.dt = req.body.dt;
            details.mode = req.body.mode;
            details.pto = req.body.pto;
            details.head = req.body.head;
            details.grp = req.body.grp;
            details.amt = req.body.amt;
            details.pamt = req.body.pamt;
            details.purp = req.body.purp;
            details.usern = req.body.usern;
            details.type = req.body.type;
            details.firm = req.body.firm;
            details.save().then(emp => {
                res.json('Exp Updated Successfully');
            })
                .catch(err => {
                    res.status(400).send("Unable To Update Exp");
                });
        }
    });
}

exports.del = (req, res) => {
    Exp.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
        if (err) res.json(err);
        else res.json('Exp Deleted Successfully');
    });
}
