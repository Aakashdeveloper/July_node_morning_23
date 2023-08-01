import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const config = require('../config');
const User = require('../model/userSchema');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json());

// list all users
router.get('/users',(req,res) => {
    User.find({},(err,user) => {
        if(err) throw err;
        res.send(user)
    })
})

//register User
router.post('/register',(req,res) => {
    let hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User',
    },(err,result) => {
        res.status(200).send('Registration successful')
    })
})

//login User
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send({auth:false,token:'There is problem while login'})
        if(!user) return res.status(500).send({auth:false,token:'No User Found Register First'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passIsValid) return res.status(401).send({auth:false,token:'Invalid Password'})
            let token = jwt.sign({id:user._id},config.secert,{expiresIn:86400})
            return res.status(200).send({auth:true,token:token})
        }
    })
})

//userInfo
router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.status(201).send({auth:false,token:'No Token Provided'});
    jwt.verify(token,config.secert,(err,data) => {
        if(err) res.status(401).send({auth:false,token:'Invalid Token Provided'})
        User.findById(data.id,{password:0},(err,user) => {
            if(err) res.status(201).send({auth:false,token:'Error While Fetching'})
            res.json(user)
        })
    })
})


module.exports = router