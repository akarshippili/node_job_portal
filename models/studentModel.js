const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { use } = require('../routes/authRoutes');

const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'enter valid email'],
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:[6,'minimum password length is 6 characters'],
    }
});

studentSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

studentSchema.statics.login = async function(email,password){
    const student = await this.findOne({email});
    if(student)
    {
        const auth = await bcrypt.compare(password,student.password);
        if(auth)
        {
            return student;
        }
        throw Error("incorrect password");
    }
    throw Error('incorrect email');
}
const Student = mongoose.model('student',studentSchema);
module.exports = Student;
