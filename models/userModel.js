var mongoose=require("mongoose");
var passportLocalMongoose= require("passport-local-mongoose")

var UserSchema= new mongoose.Schema({
    name: {
        type: String,
        required:true,
        min: [6, 'Name must be atleast 6 characters']
    },
    dob: {
        type: Date,
        default: new Date(2000,0,1,00,00,00,0)
    },
    date: {
        type: Date,
        default: Date.now
    },
    gender: {
        type:String,
        default: 'male'
    },
    phno: {
        type: String,
        default: '420420420'
    },
    addr: [{
        fname: {
            type: String,
        },
        lname: {
            type: String
        },
        hno: {
            type: String,
        },
        street: {
            type: String,
        },
        city: {
            type: String
        },
        pcode: {
            type: Number
        },
        state: {
            type: String 
        },
        country: {
            type: String
        },
        mno: {
            type: Number
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    }]
});

UserSchema.plugin(passportLocalMongoose,{
    usernameField: 'email'
});

module.exports =mongoose.model("User",UserSchema);