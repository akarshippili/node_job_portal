const mongoose = require('mongoose');
const { use } = require('../routes/authRoutes');

const applicationSchema = new mongoose.Schema({
    job_id:{
        type:String,
        required:true,
    }, 
    job_company:{
        type:String,
        required:true,
    },
    student_id:{
        type:String,
        required:true,
    }, 
});



const Application = mongoose.model('application',applicationSchema);
module.exports = Application;
