const mongoose = require('mongoose');
const { use } = require('../routes/authRoutes');

const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    dob:{
        type:String,
        required:true,
    },

    highest_qualification:{
        type:String,
        required:true,
    },

    address:{
        type:String,
        required:true,
    },

    phone_number:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },

    cv_link:{
        type:String,
        required:true,
    },

    profileOf:{
        type:String,
        required:true,
    }

});



const Profile = mongoose.model('profile',profileSchema);
module.exports = Profile;
