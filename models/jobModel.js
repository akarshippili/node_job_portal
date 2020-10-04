const mongoose = require('mongoose');
const { use } = require('../routes/authRoutes');

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true,
        lowercase:true,
    },
    title:{
        type:String,
        required:true,
        lowercase:true,
    },
    salary:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        lowercase:true,
    },
    createdby:{
        type:String,
        required:true,
    }

});



const Job = mongoose.model('job',jobSchema);
module.exports = Job;
