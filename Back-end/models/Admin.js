const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    username: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    name: {type: String, required:true},
    firstname: {type: String, required:true}

})
const AdminModel = mongoose.model("Admin", userShema)
module.exports = AdminModel