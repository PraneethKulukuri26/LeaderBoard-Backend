const userService=require('../Service/UserServices');

async function addUser(req,res) {
    try{
        const uuid=await userService.addNewUser({name:req.body.name});
        return res.json({success:true,uuid:uuid});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

module.exports={
    addUser,
}