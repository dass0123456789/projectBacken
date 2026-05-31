import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return next(createError(400, "Email already exists"));
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
        role: "USER",
        status: "ACTIVE",
      },
    });

    res.json({
      message: "Register Success",
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return next(
        createError(400, "Email or Password is Invalid")
      );
    }

    const checkPassword = bcrypt.compareSync(
      password,
      user.password
    );

    if (!checkPassword) {
      return next(
        createError(400, "Email or Password is Invalid")
      );
    }

    if (user.status !== "ACTIVE") {
      return next(
        createError(403, "Account is not active")
      );
    }

    const payload = {
      id: user.Users_Id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "5h",
      }
    );

    res.json({
      message: "Login Success",
      payload,
      token,
    });
  } catch (err) {
    next(err);
  }
};