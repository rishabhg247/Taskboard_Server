const mongoose = require('mongoose');
const { listSchema, userSchema } = require('../modals/schema');
const MongoUrl = "mongodb+srv://rg1224362:rg1224362@cluster001.tclpf8d.mongodb.net/Todo";

mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connection established with mongodb server online");
    })
    .catch(err => {
        console.log("error while connection", err)
    });
let Lists = mongoose.model('List', listSchema);
let Users = mongoose.model('User', userSchema)
module.exports = { Lists, Users };