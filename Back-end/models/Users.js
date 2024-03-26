const mongoose = require("mongoose")

const userShema = new mongoose.Schema({
    name: {type: String, required:true},
    firstname: {type: String, required:true},
    cin: {type: String, required:true},
    adress: {type: String, required:true},
    phone: {type: String, required:true},
    degree: {type: String, required:true},
    field: {type: String, required:true},
    duration: {type: String, required:true},
    stat: {type: String, required:true},
    image: {data:Buffer,
    contentType: String}
})
const UserModel = mongoose.model("users", userShema)
module.exports = UserModel