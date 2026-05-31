import express from "express";
import multer from "../middleware/upload.js";
import { verifytoken } from "../middleware/verifytoken.js";
import { validate, updateemailcheema } from "../utils/validate.js";
import {createprofile,upprofile,updateprofile,updateemail,updatepassword,updaterole,
  updatestatus,readprofile,listuser,readuser,readuserbyemail,amountuser,
} from "../controllers/profile.controller.js";

const route = express.Router();
route.post("/newprofile", verifytoken, createprofile);
route.post("/uploadprofile", verifytoken, multer, upprofile);
route.patch("/updateprofile", verifytoken, updateprofile);
route.get("/readprofile/:id", verifytoken, readprofile);
route.get("/listuser", listuser);
route.get("/readuser/:user_id", readuser);
route.get("/readuserbyemail/:email", readuserbyemail);
route.get("/amountuser", amountuser);
route.patch("/updateemail",verifytoken,validate(updateemailcheema),updateemail);
route.patch("/updatepassword",verifytoken,updatepassword);
route.patch("/updaterole",verifytoken,updaterole);
route.patch("/updatestatus",verifytoken,updatestatus);

export default route;

