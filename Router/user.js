const express=require("express");
const router=express.Router();
const userController=require("../Controller/UserController");

router.post('/addUser',userController.addUser);
router.get('/loadUsers',userController.loadUsers);
router.get('/cliamPoints',userController.cliamRewards);
router.get('/historyPoints',userController.loadHistory);
router.get('/loadUserInfo',userController.loadUserInfo);


module.exports=router;