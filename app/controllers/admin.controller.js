const Exp = require("../models/EXP");
const Users = require("../models/user.model");
const Excel = require('exceljs');
const User = require("../models/user.model");
const Lic = require("../models/LIC");
const Contact = require("../models/contacts");

exports.list = (req, res) => {
    Exp.find(null, null, {sort: {'dt' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.list_lic = (req, res) => {
    Lic.find(null, null, {sort: {'edate' : -1}}, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Exp list: ' + err);
        }
    });
}

exports.list_contact = (req, res) => {
    Contact.find((err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Contact list: ' + err);
        }
    });
}

exports.user_list = (req, res) => {
    Users.find((err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving User list: ' + err);
        }
    });
}

exports.del_all = (req, res) => {
    Exp.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("All Deleted");
        }
    })
}

exports.send_sms = (req, res) => {
    const client = require('twilio')('AC4d318cf516b959acb8319b214a85cdb1', 'b360f8e331ade86b4482d8a4aab88d99');
    client.messages
  .create({
     body: req.body.msg,
     from: req.body.frm,
     to: req.body.to
   })
  .then(message => console.log(message.sid));
}

exports.add_exp = (req, res) => {
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

exports.crt_excel = (req, res) => {
    let user_data = [];
    let lic_data = [];
    Users.find((err, docs) => {
        docs.forEach((doc) => {
            user_data.push({
                _id: doc._id,
                username: doc.username,
                email: doc.email,
                roles: doc.roles,
                firm: doc.firm
            })
        })
    });
    Lic.find((err, docs) => {
        docs.forEach((doc) => {
            lic_data.push({
                _id: doc._id,
                doc_name: doc.doc_name,
                ref_no: doc.ref_no,
                sdate: doc.sdate,
                edate: doc.edate,
                val: doc.val,
                descr: doc.descr,
                grp: doc.grp,
                usern: doc.usern,
                firm: doc.firm
            })
        })
    })
    Exp.find((err, docs) => {
        let data = [];
        docs.forEach((doc) => {
            data.push({
                rid: doc.rid,
                dt: doc.dt,
                mode: doc.mode,
                pto: doc.pto,
                head: doc.head,
                grp: doc.grp,
                amt: doc.amt,
                pamt: doc.pamt,
                purp: doc.purp,
                usern: doc.usern,
                type: doc.type,
                firm: doc.firm
            });
        });
        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet('EXPENSES');

        worksheet.columns = [
            { header: 'ID', key: 'rid' },
            { header: 'DATE', key: 'dt' },
            { header: 'MODE', key: 'mode' },
            { header: 'PAID TO / FROM', key: 'pto' },
            { header: 'HEAD', key: 'head' },
            { header: 'GROUP', key: 'grp' },
            { header: 'AMOUNT', key: 'amt' },
            { header: 'PROJECT AMOUNT', key: 'pamt' },
            { header: 'PURPOSE', key: 'purp' },
            { header: 'USER NAME', key: 'usern' },
            { header: 'TRANSACTION TYPE', key: 'type' },
            { header: 'FIRM NAME', key: 'firm' }
        ]

        worksheet.columns.forEach(column => {
            column.width = column.header.length < 12 ? 12 : column.header.length
        });

        worksheet.getRow(1).font = { bold: true };

        worksheet.addRows(data);

        let user_worksheet = workbook.addWorksheet('USER');
        user_worksheet.columns = [
            {header: 'ID', key: '_id'},
            {header: 'USER NAME', key: 'username'},
            {header: 'EMAIL ID', key: 'email'},
            {header: 'ROLES', key: 'roles'},
            {header: 'FIRM NAME', key: 'firm'}
        ]

        user_worksheet.columns.forEach(column => {
            column.width = column.header.length < 15 ? 15 : column.header.length
        });

        user_worksheet.getRow(1).font = { bold: true };

        user_worksheet.addRows(user_data);

        let lic_worksheet = workbook.addWorksheet('LIC');
        lic_worksheet.columns = [
            {header: 'ID', key: '_id'},
            {header: 'DOCUMENT NAME', key: 'doc_name'},
            {header: 'REFERENCE NO', key: 'ref_no'},
            {header: 'START DATE', key: 'sdate'},
            {header: 'VALID TILL', key: 'edate'},
            {header: 'VALUE', key: 'val'},
            {header: 'DESCRIPTION', key: 'descr'},
            {header: 'GROUP', key: 'grp'},
            {header: 'USER NAME', key: 'usern'},
            {header: 'FIRM NAME', key: 'firm'}
        ]
        lic_worksheet.columns.forEach(column => {
            column.width = column.header.length < 15 ? 15 : column.header.length
        });
        lic_worksheet.getRow(1).font = { bold: true };
        lic_worksheet.addRows(lic_data);
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "tutorials.xlsx"
        );

        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    });
}