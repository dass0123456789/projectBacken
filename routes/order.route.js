import express from "express";

import {createOrder,getAllOrders,getOrderById,updateOrderStatus,deleteOrder
} from "../controllers/order.controller.js";

const route = express.Router();
route.post("/createorder", createOrder);
route.get("/listorder", getAllOrders);
route.get("/readorder/:id", getOrderById);
route.patch("/updateorder/:id", updateOrderStatus);
route.delete("/removeorder/:id", deleteOrder);
export default route;