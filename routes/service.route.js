import express from "express";

import {createService,getAllServices,getServiceById,updateService,deleteService,
searchServices} from "../controllers/service.controller.js";
import { verifytoken } from "../middleware/verifytoken.js";
import upload from "../middleware/upload.js";
import { validate, createServiceSchema } from "../utils/validate.js";
const route = express.Router();
route.post("/servicecreate",verifytoken,upload,validate(createServiceSchema),createService);
route.get("/listservice",getAllServices);
route.get("/servicesearch",searchServices);
route.get("/readservice/:id",getServiceById);
route.patch("/updateservice/:id",verifytoken,upload,updateService);
route.delete("/removeservice/:id",verifytoken,deleteService);

export default route;