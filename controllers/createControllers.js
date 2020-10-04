const Job = require('../models/jobModel');
const jwt = require('jsonwebtoken');
const Comp = require('../models/companyModel');
const Student = require('../models/studentModel');
const Profile = require('../models/profileModel');
const Application = require('../models/applicationModel')

module.exports.create_get = (req,res)=>{
    res.render('create');
}

module.exports.create_post = (req,res)=>{
    const {company,title,salary,description} = req.body;
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,"akarshippili is super cool",async (err,decoded)=>{
            if(err)
            {
                console.log(err.message);
            }
            else
            {
                const comp = await Comp.findById(decoded.id);
                // console.log(comp._id);
                try
                {
                    const job = await Job.create({company,title,salary,description,createdby:comp._id});
                    res.status(201).json({job:job._id});
                }
                catch(err)
                {
                    res.status(400).json({err});
                }
            }
        });
    }
}

module.exports.created_get = async (req,res)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,"akarshippili is super cool",async (err,decoded)=>{
            if(err){
                console.log(err.message);
            }
            else{
                const result = await Job.find({createdby:decoded.id});
                res.render('created',{created:result});
            }
        });
    }


}

module.exports.apply_get = async (req,res)=>{
    const result = await Job.find();
    res.render('apply',{alljobs:result});
}

module.exports.apply_details_get = async (req,res)=>{
    const id = req.params.id;
    const result = await Job.findById(id);
    res.render('jobDetails',{job:result});
}




module.exports.details_get = (req,res)=>{
    res.render('details_student');
}


module.exports.details_post = (req,res)=>{
    const {name, dob, highest_qualification, address, phone_number, email,cv_link} = req.body;
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,"akarshippili is super cool",async (err,decoded)=>{
            if(err)
            {
                console.log(err.message);
            }
            else
            {
                const student = await Student.findById(decoded.id);
                try
                {
                    const profile = await Profile.create({name, dob, highest_qualification, address, phone_number, email,cv_link,profileOf:student._id});
                    res.status(201).json({profile:profile._id});
                }
                catch(err)
                {
                    res.status(400).json({err});
                }
            }
        });
    }
}



module.exports.apply_post = (req,res)=>{
    const { job_id,job_company } = req.body;
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,"akarshippili is super cool",async (err,decoded)=>{
            if(err)
            {
                console.log(err.message);
            }
            else
            {
                const student = await Student.findById(decoded.id);
                const alredyApplied = await Application.find({ job_id, student_id:student._id })
                console.log(alredyApplied);
                try
                {
                    if(alredyApplied.length===0)
                    {
                        const application = await Application.create({ job_id, job_company,student_id:student._id });
                        res.status(201).json({application:application._id});
                    }
                    else
                    {
                        application = alredyApplied[0];
                        res.status(201).json({ application:application._id });
                    }
                }
                catch(err)
                {
                    res.status(400).json({err});
                }
            }
        });
    }
}


module.exports.sucessfully_applied_get = (req,res)=>{
    res.render('sucessfully_applied');
}

module.exports.applied_get = (req,res)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,"akarshippili is super cool",async (err,decoded)=>{
            if(err)
            {
                console.log(err.message);
                res.render('home');
            }
            else
            {
                const ans = await Application.find({student_id:decoded.id});
                const job_ids = ans.map((obj) => {
                    return obj.job_id;
                });
                // const alljobs = job_ids.map(async (obj)=>{
                //     const job =  await Job.findById(obj);
                //     return job;
                // })
                const alljobs = await Job.find( { _id : { $in : job_ids } } );
                // console.log(alljobs);
                res.render('applied',{alljobs});
            }
        });
    }
}



module.exports.response_get = async (req,res)=>{
    const id = req.params.id;
    const job = await Job.find({_id:id});
    const all_applications = await Application.find({job_id:id});
    //console.log(all_applications);
    const all_candidates_ids = all_applications.map((obj) => {
        return obj.student_id;
    });
    //console.log(all_candidates_ids);
    const all_candidates = await Profile.find( { profileOf : { $in : all_candidates_ids } } );
    //console.log(all_candidates);
    res.render('responses',{ job:job[0],all_candidates });
}