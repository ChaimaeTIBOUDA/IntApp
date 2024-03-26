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
/*const Storage = multer.diskstorage({
destination: 'uploads',
filename:(req, file, cb) => {
    cb(null, file.originalname)
}})

const upload = multer({
    storage: Storage
}).single('testImage')*/
//Routes
// Interns
app.post("/Add", (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get('/', (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get('/User/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.put('/Edit/:id', async (req, res) => {
  const id = req.params.id;
   await UserModel.findByIdAndUpdate({_id:id}, 
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
    await UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.delete('/deleteUser/:id', (req,res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err  => res.json(err))
})
app.get('/filter', (req, res) => {
    UserModel.find(req.query)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.get("/ongoing", (req, res) => {
    UserModel.aggregate([{
        $match: {'stat': 'on going'}
    }, 
    {$count: "number"}
])
.then(users => res.json(users))
.catch(err => res.json(err))
})

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