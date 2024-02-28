const express = require("express");
const router = express.Router();
const user = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser=require('../middleware/fetchuser')


const authsrt = "cloudnote";




//register a new user
router.post("/reg", async (req, res) => {
  console.log(req.body);

  const temp = await user.findOne({ id: req.body.id });

  if (temp) {
    return res
      .status(400)
      .json({ error: "ID unavailable, please try with different id" });
  }

  const salt = await bcrypt.genSalt(10);
  const finalpass = await bcrypt.hash(req.body.password, salt);

  const usr = await user.create({
    name: req.body.name,
    password: finalpass,
    id: req.body.id,
  });

  usr.save();

  // const data = {
  //   user: {
  //     id: user.id,
  //   },
  // };
  // const authtoken = jwt.sign(data, authsrt);

  res.json(usr);
});


//login a user
router.post("/", async (req, res) => {
  console.log(req.body);

  // const temp = await user.findOne({ id: req.body.id });

  // if (temp) {
  //   return res
  //     .status(400)
  //     .json({ error: "ID unavailable, please try with different id" });
  // }

  const userdata=await user.findOne({id:req.body.id});
  // user= await user.find({userName:"Andressa"})

  if(!userdata){

  return  res
    .status(400)
    .json({ error: "Invalid Credentials, user doesnt exists" });
  }

  const passwordcomp=await bcrypt.compare(req.body.password,userdata.password);

  if(!passwordcomp){
    return res
    .status(400)
    .json({ error: "Invalid Credentials" });
  }

  
  

  const data = {
    user: {
      id: userdata._id,
    },
  };
  const authtoken = jwt.sign(data, authsrt);

  res.json(authtoken)
});


router.post('/getuser',fetchuser,async(req,res)=>{
 
  try {
    let userid=await user.findOne({id:req.body.id})
    res.send(userid);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('err')
  }


})



module.exports = router;
