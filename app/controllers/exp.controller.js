const logger = require("../config/logger");
const Exp = require("../models/EXP");
const HEAD_GRP = require("../models/HEAD_GRP");

exports.list = (req, res) => {
    try{
        Exp.find({'firm': req.body.firm}, null , {sort: {'dt' : -1}} ,(err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.list_all = (req, res) => {
    try{
        Exp.find((err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.cash_book = (req, res) => {
    try{
        Exp.find({ 'mode': 'CASH', 'firm': req.body.usern }, null, {sort: {'dt' : -1}} ,(err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.proj_report = (req, res) => {
    try{
        Exp.find({ 'head': req.body.head, 'firm': req.body.usern }, null, {sort: {'dt' : -1}} ,(err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}
exports.get_head_grp = (req, res) => {
    try{
        HEAD_GRP.findOne({
            'pto': req.body.pto,
            'usern' : req.body.usern,
            'firm' : req.body.firm
        } ,(err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}
exports.fetch_all = (req, res) => {
    try{
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
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.fetch_pto_head = (req, res) => {
    try{
        Exp.find({
            'head': req.body.sr_head,
            'pto': req.body.sr_pto,
            'firm' : req.body.usern
        }, null, {sort: {'dt' : -1}}, (err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.fetch_dt_pto = (req, res) => {
    try{
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
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.fetch_dt_head = (req, res) => {
    try{
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
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.fetch_pto = (req, res) => {
    try{
        Exp.find({
            'pto': req.body.sr_pto,
            'firm' : req.body.usern
        }, null, {sort: {'dt' : -1}}, (err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.fetch_head = (req, res) => {
    try{
        Exp.find({
            'head': req.body.sr_head,
            'firm' : req.body.usern
        }, null, {sort: {'dt' : -1}}, (err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.fetch_dt = (req, res) => {
    try{
        Exp.find({
            'dt': {
                '$gte': new Date(req.body.dtfrm),
                '$lte': new Date(req.body.dtto)
            },
            'firm' : req.body.usern
        }, null, {sort: {'dt' : -1}}, (err, docs) => {
            if (!err) {
                res.json(docs);
                logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
            } else {
                console.log('Error in retrieving Exp list: ' + err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}
exports.add = (req, res) => {
    try{
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
        const details = new Exp(req.body);
        details.save((err, doc) => {
            if (!err)
                res.send(doc);
            else {
                res.send(err);
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.add_trf = (req, res) => {
    try{
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
        if (!err){
            res.send(doc);
            logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
        else {
            res.send(err);
        }
    });
    }
    catch(er){
        console.log(er)
    }
}


exports.getid = (req, res) => {
    try{
        let id = req.params.id;
    Exp.findById(id, function (err, exp) {
        res.json(exp);
    });
    }
    catch(er){
        console.log(er)
    }
}

exports.update = (req, res) => {
    try{
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
                    logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
                })
                    .catch(err => {
                        res.status(400).send("Unable To Update Exp");
                    });
            }
        });
    }
    catch(er){
        console.log(er)
    }
}

exports.del = (req, res) => {
    try{
        Exp.findByIdAndRemove({ _id: req.body.id }, function (err, employee) {
            if (err) res.json(err);
            else res.json('Exp Deleted Successfully');
            logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
        });
    }
    catch(er){
        console.log(er)
    }
}
