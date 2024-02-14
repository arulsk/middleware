const user = require('../model/user');
const bcrypt= require('bcrypt');
const createUser = async (req, res) => {
    try {
        const {name,age,email,password,phoneNo,address} = req.body;
        const hashPassword = await bcrypt.hash(password,10)
    
        const newUser = await user.create({
            name,
            age,
            email,
            password : hashPassword,
            phoneNo,
            address
        })
        
        res.status(201).json({newUser})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

const getUserById = async(req,res)=>{
    try{
        const id = req.params.id;
        const getUser = await user.findOne().where("_id").equals(id)
        getUser.sayName()
        res.status(201).json(getUser);
    }catch(error){
        res.status(404).json({  message: "user Not Found!!" });
    }
} 

const getUsers = async(req,res)=>{
    try{
        const users = await user.find()
        res.status(201).json(users)
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

const updateUsers = async(req,res)=>{
    try{
        const request = req.body;
        const id = req.params.id
        const updateUser = await user.findByIdAndUpdate(id,request);
        res.status(201).json(updateUser) 
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id
        await user.findByIdAndDelete(id);
        res.status(201).json({message : "user deleted"}) 
    }catch(error){
        res.status(404).json({ message: "user Not Found!!" });
    }

}

const numberOfUser = async(req,res)=>{
    try{
        const totalUsers = await user.countDocuments()
        res.status(201).json(totalUsers)

    }catch(error){
        res.status(400).json({ message: error.message });
    }
}



const getUserWithHighestId = async (req, res) => {
    try {
        const highestIdUser = await user.findOne().sort({ _id: -1 });
        res.status(201).json(highestIdUser);
        console.log(highestIdUser.nameEmail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserWithLowestId = async (req, res) => {
    try {
        const lowestIdUser = await user.findOne().sort({ _id: 1 });
        res.status(200).json(lowestIdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserbyName = async(req,res)=>{
    try{
     const name = req.body;
     const username = await user.findByName(name)
     if(username.length === 0){
        return res.status(404).json({message : "user not fount"}); 
     }
     res.status(200).json(username);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const findByEmail = async(req,res)=>{
    try{
     const email = req.body;
     const username = await user.find().byEmail(email)
     if(username.length === 0){
        return res.status(404).json({message : "user not fount"}); 
     }
     res.status(200).json(username);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}
const findByCity = async(req,res)=>{
    try{
        const {city} = req.body;
        const username = await user.findByCity(city)
        if(username.length === 0){
           return res.status(404).json({message : "user not fount"}); 
        }
        res.status(200).json(username);
       }catch(error){
           res.status(500).json({ message: error.message });
       }
}
module.exports = {createUser,getUserById,getUsers,updateUsers,deleteUser,numberOfUser,getUserWithHighestId,getUserWithLowestId,getUserbyName,findByEmail,findByCity}