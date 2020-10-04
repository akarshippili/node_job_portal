const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Comp = require('../models/companyModel');

const reqAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,"akarshippili is super cool",(err,decoded)=>{
            if(err)
            {
                console.log(err.message);
                res.redirect('/');
            }
            else
            {
                //console.log(decoded);
                next();
            }
        });
    }
    else{
        res.redirect('/');
    }    
}





const curUser =  (req,res,next) => {
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,"akarshippili is super cool",async (err,decoded)=>{
            if(err)
            {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else
            {
                //console.log(decoded);
                let comp = await Comp.findById(decoded.id);
                res.locals.comp = comp;
                let student = await Student.findById(decoded.id);
                res.locals.student = student;
                next();
            }
        });
    }
    else
    {
        res.locals.comp = null;
        res.locals.student = null;
        next();
    }    
}

module.exports = {reqAuth,curUser};