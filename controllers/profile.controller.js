import prisma from "../config/prisma.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const createprofile = async (req, res, next) => {
  try {
    const {
      Users_Id,
      First_Name,
      Last_Name,
      Phone,
      Gender,
      Birth_Date,
      Address,
    } = req.body;

    if (!Users_Id) {
      createError(400, "Users_Id is required");
    }

    const user = await prisma.users.findUnique({
      where: {
        Users_Id: Number(Users_Id),
      },
    });

    if (!user) {
      createError(404, "User not found");
    }

    const profileExists = await prisma.profiles.findUnique({
      where: {
        Users_Id: Number(Users_Id),
      },
    });

    if (profileExists) {
      createError(400, "Profile already exists");
    }

    const profile = await prisma.profiles.create({
      data: {
        Users_Id: Number(Users_Id),
        First_Name,
        Last_Name,
        Phone,
        Gender,
        Birth_Date: Birth_Date ? new Date(Birth_Date) : null,
        Address,
      },
    });

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

export const upprofile = async (req, res, next) => {
  try {
    const { Users_Id } = req.body;

    if (!req.file) {
      createError(400, "Avatar file is required");
    }

    await prisma.profiles.update({
      where: {
        Users_Id: Number(Users_Id),
      },
      data: {
        Avatar: req.file.filename,
      },
    });

    res.json({
      message: "Upload avatar success",
    });
  } catch (err) {
    next(err);
  }
};

export const readprofile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const profile = await prisma.profiles.findUnique({
      where: {
        Users_Id: Number(id),
      },
    });

    if (!profile) {
      createError(400, "Profile not found");
    }

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

export const updateprofile = async (req, res, next) => {
  try {
    const {
      Users_Id,
      First_Name,
      Last_Name,
      Phone,
      Gender,
      Birth_Date,
      Address,
    } = req.body;

    const profile = await prisma.profiles.findUnique({
      where: {
        Users_Id: Number(Users_Id),
      },
    });

    if (!profile) {
      createError(400, "Profile not found");
    }

    const updated = await prisma.profiles.update({
      where: {
        Users_Id: Number(Users_Id),
      },
      data: {
        First_Name,
        Last_Name,
        Phone,
        Gender,
        Birth_Date: Birth_Date ? new Date(Birth_Date) : undefined,
        Address,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const updateemail = async (req, res, next) => {
  try {
    const { Users_Id, Email } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        Users_Id: Number(Users_Id),
      },
    });

    if (!user) {
      createError(404, "User not found");
    }

    await prisma.users.update({
      where: {
        Users_Id: Number(Users_Id),
      },
      data: {
        Email,
      },
    });

    res.json({
      message: "update email success",
    });
  } catch (err) {
    next(err);
  }
};

export const updatepassword = async (req, res, next) => {
  try {
    const { Users_Id, Password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        Users_Id: Number(Users_Id),
      },
    });

    if (!user) {
      createError(404, "User not found");
    }

    const hashPassword = bcrypt.hashSync(Password, 10);

    await prisma.users.update({
      where: {
        Users_Id: Number(Users_Id),
      },
      data: {
        Password: hashPassword,
      },
    });

    res.json({
      message: "update password success",
    });
  } catch (err) {
    next(err);
  }
};

export const updaterole = async (req, res, next) => {
  try {
    const { Users_Id, Role } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        Users_Id: Number(Users_Id),
      },
    });

    if (!user) {
      createError(404, "User not found");
    }

    await prisma.users.update({
      where: {
        Users_Id: Number(Users_Id),
      },
      data: {
        Role,
      },
    });

    res.json({
      message: "update role success",
    });
  } catch (err) {
    next(err);
  }
};

export const updatestatus = async (req, res, next) => {
  try {
    const { Users_Id, Status } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        Users_Id: Number(Users_Id),
      },
    });

    if (!user) {
      createError(404, "User not found");
    }

    await prisma.users.update({
      where: {
        Users_Id: Number(Users_Id),
      },
      data: {
        Status,
      },
    });

    res.json({
      message: "update status success",
    });
  } catch (err) {
    next(err);
  }
};

export const listuser = async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        Profile: true,
      },
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const readuser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const user = await prisma.users.findUnique({
      where: {
        Users_Id: Number(user_id),
      },
      include: {
        Profile: true,
      },
    });

    if (!user) {
      createError(404, "User not found");
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const readuserbyemail = async (req, res, next) => {
  try {
    const { email } = req.params;

    const user = await prisma.users.findUnique({
      where: {
        Email: email,
      },
      include: {
        Profile: true,
      },
    });

    if (!user) {
      createError(404, "User not found");
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const amountuser = async (req, res, next) => {
  try {
    const count = await prisma.users.count();

    res.json({
      amountuser: count,
    });
  } catch (err) {
    next(err);
  }
};