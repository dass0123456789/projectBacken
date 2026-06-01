import express from "express";

import {createService,getAllServices,getServiceById,updateService,deleteService,
} from "../controllers/service.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";
import upload from "../middleware/upload.js";
const route = express.Router();
route.post("/servicecreate",verifytoken,upload,createService);
route.get("/listservice",getAllServices);
route.get("/readservice/:id",getServiceById);
route.patch("/updateservice/:id",verifytoken,upload,updateService);
route.delete("/deleteservice/:id",verifytoken,deleteService);

export default route;