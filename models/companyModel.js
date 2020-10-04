const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { use } = require('../routes/authRoutes');

const companySchema = new mongoose.Schema({
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

companySchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

companySchema.statics.login = async function(email,password){
    const comp = await this.findOne({email});
    if(comp)
    {
        const auth = await bcrypt.compare(password,comp.password);
        if(auth)
        {
            return comp;
        }
        throw Error("incorrect password");
    }
    throw Error('incorrect email');
}
const Comp = mongoose.model('com',companySchema);
module.exports = Comp;
