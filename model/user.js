const mongoose = require('mongoose');
const fs = require('fs')

const addressSchema = new mongoose.Schema({
    streetNo : {
        type : Number,
        required : true
    },
    streetName:{
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true 
    }
})

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
     },
    age : {
        type : Number,
        min : 1,
        max : 100,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    phoneNo : {
        type  : Number,
        validate : {
            validator : (value)=> { 
                return String(value).length === 10;
        },
        message  : props => `${props.value} is not a valid phone number. It should have exactly 10 digits.`
      },
      required : true
},
gender : {
    type:String,
},
address : addressSchema
})


userSchema.methods.sayName =  function(){
    console.log(`hello ${this.name} wecome`)
}

userSchema.virtual("nameEmail").get(function(){
    return `name : ${this.name} Email : ${this.email} `
})

userSchema.statics.findByName = function(name){
  return this.where("name").equals(name.name)
}

userSchema.query.byEmail = function(email){
    return this.where("email").equals(email.email)
}

userSchema.pre('save',function(next){
  this.gender = "male";
  console.log('the user going to save ',this)
  next()
})
userSchema.statics.findByCity = function(city){
    return this.find({"address.city":city})
}
userSchema.post('save',function(doc,next){
    const content = `name of the user is ${doc.name} \n`
    fs.writeFile('./logt.txt',content,{flag:'a'},(err)=>{
        if(err){
        console.log(err.message);
}})
    next()
})


const  model = mongoose.model('user',userSchema)

module.exports = model