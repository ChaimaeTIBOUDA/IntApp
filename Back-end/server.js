const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT | 5000
// Mongoose Models 

const UserModel = require('./models/Users')
const AdminModel = require('./models/Admin')


app.use(express.json())
app.use(cors())
app.use(express.static('images'))

// Connect DataBase
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DATABASE connected"))
    .catch(err => console.log(err))


// storage image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images")
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
})
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage: storage, fileFilter }).single('image')

///Routes

// Interns

// Add intern
app.post("/Add", upload, (req, res) => {
    UserModel.create(
        {
            name: req.body.name,
            firstname: req.body.firstname,
            cin: req.body.cin,
            adress: req.body.adress,
            phone: req.body.phone,
            degree: req.body.degree,
            field: req.body.field,
            duration: req.body.duration,
            stat: req.body.stat,
            image: req.file.filename
        })
        .then(users => { console.log(users), res.json(users) })
        .catch(err => res.json(err))
})
//Display all interns
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
//Display information of specefic intern
app.get('/User/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
// Edit specific intern
app.patch('/Edit/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id },
        {
            name: req.body.name,
            firstname: req.body.firstname,
            cin: req.body.cin,
            adress: req.body.adress,
            phone: req.body.phone,
            degree: req.body.degree,
            field: req.body.field,
            duration: req.body.duration,
            stat: req.body.stat
        })
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
//Delete specefic intern
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
})
//Filter interns based on state of internship
app.get('/filter', (req, res) => {
    UserModel.find(req.query)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

//Display  number of interns with state of internship: ongoing
app.get("/ongoing", (req, res) => {
    UserModel.aggregate([{
        $match: { 'stat': 'on going' }
    },
    { $count: "number" }
    ])
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
//Display number of interns with state of internship: onwait
app.get("/onwait", async (req, res) => {
    UserModel.aggregate([{
        $match: { 'stat': 'on wait' }
    },
    { $count: 'number' }
    ])
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.get("/count", async (req, res) => {
    UserModel.aggregate([{
         $match: {}
     }, 
     {$count: 'number'}
 ])
 .then(users => res.json(users))
 .catch(err => res.json(err))
 })
//Search for intern by name
app.get("/search/:key", async (req, res) => {
    let result = await UserModel.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            }
        ]
    })
    res.send(result)
})
//Sort interns by name
app.get("/sort", (req, res) => {
    UserModel.find().sort({ name: 1 })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
//Admin
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const admins = await AdminModel.findOne({ email: email })
    if (admins.password === password) {
        //res.json("Success")
        let token = jwt.sign(
            {
                userId: admins._id,
                email: admins.email,
            },
            "secretkeyappearshere",
            { expiresIn: "30min" }
        )
        res.status(201).send(token),
            console.log(token)
    }
    if (!admins) {
        return res.status(401).send({ message: "Invalid Email or Password" });
    }

});
app.get('/Admin', (req, res) => {
    AdminModel.find({})
        .then(admins => res.json(admins))
        .catch(err => res.json(err))
})
//Add Admin
app.post('/register', (req, res) => {
    AdminModel.create({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        name: req.body.name,
        username: req.body.username
    })
        .then(admins => res.json(admins))
        .catch(err => res.json(err))
})
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})