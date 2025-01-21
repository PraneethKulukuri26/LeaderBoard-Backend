const userService=require('../Service/UserServices');

async function addUser(req,res) {
    try{
        const uuid=await userService.addNewUser({name:req.body.name});
        return res.json({success:true,uuid:uuid});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

async function loadUsers(req,res) {
    try{
        const users=await userService.loadUsers(); 
        return res.json({success:true,users:users});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

async function cliamRewards(req,res) {
    try{
        const result=await userService.cliamPoints({uuid:req.query.uuid});
        result.success=true;
        return res.json(result);
    }catch(err){
        console.log(err.message);
        return res.json({success:false,message:err.message}); 
    } 
}

async function loadHistory(req,res) {
    try{
        const result=await userService.loadPointsHistory({uuid:req.query.uuid});
        return res.json({success:true,history:result});
    }catch(err){
        console.log(err.message);
        return res.json({success:false,message:err.message}); 
    } 
}

async function loadUserInfo(req,res) {
    try{
        const result=await userService.loadUserInfo({uuid:req.query.uuid});
        return res.json({success:true,info:result});
    }catch(err){
        console.log(err.message);
        return res.json({success:false,message:err.message}); 
    } 
}

module.exports={
    addUser,
    loadUsers,
    cliamRewards,
    loadHistory,
    loadUserInfo,
}