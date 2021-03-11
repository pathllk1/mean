const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    company: String,
    desig: String,
    phno: {
        mobile: String,
        home: String
    },
    email: {
        primary: String,
        sec: String
    },
    usern: String,
    firm: String
});

const contacts = mongoose.model('contact', ContactsSchema);

module.exports = contacts;