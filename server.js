const express=require("express");
const dotenv=require("dotenv");
const helmet = require("helmet");
const cors=require("cors");
const compression=require("compression");
const bodyParser=require("body-parser");
//const database=require("./Config/database");

const app=express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(compression());

const port=process.env.port || 7070;

app.listen(port,()=>{
  console.log("Running on port:",port);
});

const user=require("./Router/user");
app.use("/api/user/",user);