const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT | 5000
const UserModel = require('./models/Users')
const AdminModel = require('./models/Admin')

app.use(express.json())
app.use(cors())


mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log("DATABASE connected"))
.catch(err=>console.log(err))
// storage
const Storage = multer.diskstorage({
destination: 'uploads',
filename:(req, file, cb) => {
    cb(null, file.originalname)
}})

const upload = multer({
    storage: Storage
}).single('testImage')
//Routes
// Interns
// Add intern
app.post("/Add",upload,(req, res) => {
    UserModel.create(
    {name:req.body.name, 
    firstname:req.body.firstname, 
    cin:req.body.cin,
    adress: req.body.adress,
    phone:req.body.phone,
    degree: req.body.degree,
    field: req.body.field,
    duration: req.body.duration,
    stat: req.body.stat,
    image: req.file.filename
})
    .then(users => {console.log(users), res.json(users) })
    .catch(err => res.json(err))
})
//Display all interns
app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
//Display information of specefic intern
app.get('/User/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// Edit specific intern
app.patch('/Edit/:id',  (req, res) => {
    const id = req.params.id;
      UserModel.findByIdAndUpdate({_id:id}, 
      {name:req.body.name, 
      firstname:req.body.firstname, 
      cin:req.body.cin,
      adress: req.body.adress,
      phone:req.body.phone,
      degree: req.body.degree,
      field: req.body.field,
      duration: req.body.duration,
      stat: req.body.stat
  })
       UserModel.findById({_id:id})
      .then(users => res.json(users))
      .catch(err => res.json(err))
  })
//Delete specefic intern
app.delete('/deleteUser/:id', (req,res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err  => res.json(err))
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
        $match: {'stat': 'on going'}
    }, 
    {$count: "number"}
])
.then(users => res.json(users))
.catch(err => res.json(err))
})
//Display number of interns with state of internship: onwait
app.get("/onwait", async (req, res) => {
   UserModel.aggregate([{
        $match: {'stat': 'on wait'}
    }, 
    {$count: 'number'}
])
.then(users => res.json(users))
.catch(err => res.json(err))
})
app.get("/search/:key", async (req, res) => {
     let result = await UserModel.find({
        "$or": [
            {
                nom: {$regex: req.params.key}
            }
        ]
     })
     res.send(result)
})
app.get("/sort", (req, res) => {
    UserModel.find().sort({name: 1})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
//Admin
app.post("/login", async (req, res) => {
    const{email,password}=req.body

    try{
        const check=await AdminModel.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.get('/admin', (req, res) => {
    AdminModel.find({})
    .then(admins => res.json(admins))
    .catch(err => res.json(err))
})
   

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})