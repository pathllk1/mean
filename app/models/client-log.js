const mongoose = require('mongoose');

const Client_logsSchema = new mongoose.Schema({
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
      msg: {
          type: String
      }
});

const Client_logs = mongoose.model('Client_logs', Client_logsSchema);

module.exports = Client_logs;