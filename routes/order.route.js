import express from "express";
import { verifytoken } from "../middleware/verifytoken.js";
import {createOrder,getAllOrders,getOrderById,updateOrderStatus,deleteOrder
} from "../controllers/order.controller.js";

const route = express.Router();
route.post("/createorder",verifytoken,createOrder);
route.get("/listorder", getAllOrders);
route.get("/readorder/:id", getOrderById);
route.patch("/updateorder/:id",verifytoken, updateOrderStatus);
route.delete("/removeorder/:id",verifytoken, deleteOrder);
export default route;