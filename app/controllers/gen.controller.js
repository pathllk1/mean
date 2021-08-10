const Client_logs = require('../models/client-log');

exports.client_log = (req, res) => {
    try {
        const p = new Client_logs(req.body);
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