import prisma from "../config/prisma.js";
import createError from "../utils/createError.js";

export const createMessage = async (req,res,next) => {
  try {
    const {Service_Id,Room_Id,Order_Id,Sender_Id,Receiver_Id,Message,} = req.body;
    const chat = await prisma.chats.create({
      data: {
        Service_Id: Number(Service_Id),
        Room_Id,
        Order_Id: Order_Id? Number(Order_Id): null,
        Sender_Id: Number(Sender_Id),
        Receiver_Id: Number(Receiver_Id),
        Message: Message || null,
        Image: req.file?.filename || null,
      },
    });
    res.status(201).json({message: "Send Message Success",result: chat,});
  } catch (err) {
    next(err);
  }
};