import prisma from "../config/prisma.js";
import createError from "../utils/createError.js";

export const createService = async (req, res, next) => {
  try {
    const { Users_Id,Title, Description, Price } = req.body;
    const service = await prisma.services.create({
      data: {
        Users_Id:Number(Users_Id),
        Title,
        Description,
        Price: Number(Price),
        Image: req.file?.filename || null,
      },
    });
    res.json({
      message: "Create Service Success",
      result: service,
    });
  } catch (err) {
    next(err);
  }
};
export const getAllServices = async (req, res, next) => {
  try {
    const services = await prisma.services.findMany({
      include: {
        User: {
          select: {
            Users_Id: true,
            Email: true,
            Role: true,
            Profile: {
              select: {
                First_Name: true,
                Last_Name: true,
                Avatar: true,
              },
            },
          },
        },
      },
      orderBy: {
        Created_At: "desc",
      },
    });
    res.json({
      result: services,
    });
  } catch (err) {
    next(err);
  }
};
export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await prisma.services.findUnique({
      where: {
        Service_Id: Number(id),
      },
      include: {
        User: {
          select: {
            Users_Id: true,
            Email: true,
            Role: true,
            Profile: true,
          },
        },
      },
    });
    if (!service) {
      return next(createError(404, "Service not found"));
    }
    res.json({
      result: service,
    });
  } catch (err) {
    next(err);
  }
};
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await prisma.services.findUnique({
      where: {
        Service_Id: Number(id),
      },
    });
    if (!service) {
      return next(createError(404, "Service not found"));
    }
    if (service.Users_Id !== Number(req.body.Users_Id)) {
      return next(createError(403, "Access Denied"));
    }
    const { Title, Description, Price } = req.body;
    const updateData = {};
    if (Title !== undefined) {
      updateData.Title = Title;
    }
    if (Description !== undefined) {
      updateData.Description = Description;
    }
    if (Price !== undefined) {
      updateData.Price = Number(Price);
    }
    if (req.file) {
      updateData.Image = req.file.filename;
    }
    const result = await prisma.services.update({
      where: {
        Service_Id: Number(id),
      },
      data: updateData,
    });
    res.json({
      message: "Update Service Success",
      result,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await prisma.services.findUnique({
      where: {
        Service_Id: Number(id),
      },
    });
    if (!service) {
      return next(createError(404, "Service not found"));
    }
    if (service.Users_Id !== req.body.Users_Id) {
      return next(createError(403, "Access Denied"));
    }
    await prisma.services.delete({
      where: {
        Service_Id: Number(id),
      },
    });
    res.json({
      message: "Delete Service Success",
    });
  } catch (err) {
    next(err);
  }
};