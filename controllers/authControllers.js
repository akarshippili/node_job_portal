const Student = require('../models/studentModel');
const Comp = require('../models/companyModel');
const jwt = require('jsonwebtoken');


const handelErrors = (err)=>{
    console.log(err.message,err.code);
    let error = {email:'',password:''};
    if(err.code==11000)
    {
        error.email="this email is already registered";
    }
    if(err.message=="incorrect password")
    {
        error.password="incorrect password";
    }
    if(err.message=='incorrect email')
    {
        error.email="incorrect email";
    }
    if(err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach(ele=>{
            error[ele.properties.path] = ele.properties.message;
        });
    }

    return error;
}

const maxAge = 3*24*60*60;

const createToken = (id)=>{
    return jwt.sign({ id },"akarshippili is super cool",{
        expiresIn:maxAge,
    })
}

// module.exports.signin_get = (req,res)=>{
//     res.render('signin');
// }

// module.exports.login_get = (req,res)=>{
//     res.render('login');
// }



module.exports.student_signin_get = (req,res)=>{
    res.render('student_signin');
}

module.exports.student_login_get = (req,res)=>{
    res.render('student_login');
}

module.exports.company_signin_get = (req,res)=>{
    res.render('comp_signin');
}

module.exports.company_login_get = (req,res)=>{
    res.render('comp_login');
}







module.exports.student_signin_post = async (req,res)=>{
    const {email,password} = req.body;
    try
    {
        const student = await Student.create({email,password});
        const token = createToken(student._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({student:student._id});
    }
    catch(err)
    {
        const errors = handelErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.student_login_post = async (req,res)=>{
    const {email,password} = req.body;
    try
    {
        const student = await Student.login(email,password);
        const token = createToken(student._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({student:student._id});
    }
    catch(err)
    {
        const errors = handelErrors(err);
        res.status(400).json({errors});
    }

}

module.exports.company_signin_post = async (req,res)=>{
    const {email,password} = req.body;
    try
    {
        const comp = await Comp.create({email,password});
        const token = createToken(comp._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({comp:comp._id});
    }
    catch(err)
    {
        const errors = handelErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.company_login_post = async (req,res)=>{
    const {email,password} = req.body;
    //console.log(email,password);
    try
    {
        const comp = await Comp.login(email,password);
        const token = createToken(comp._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({comp:comp._id});
    }
    catch(err)
    {
        const errors = handelErrors(err);
        res.status(400).json({errors});
    }

}



module.exports.signin_post = async (req,res)=>{
    const {email,password} = req.body;
    try
    {
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user:user._id});
    }
    catch(err)
    {
        const errors = handelErrors(err);
        res.status(400).json({errors});
    }
}


module.exports.login_post = async (req,res)=>{
    const {email,password} = req.body;
    try
    {
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user:user._id});
    }
    catch(err)
    {
        const errors = handelErrors(err);
        res.status(400).json({errors});
    }

}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}