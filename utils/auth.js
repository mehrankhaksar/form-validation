import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs");

const hashPassword = async (password) => {
  return await hash(password, 12);
};

const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

const verifyToken = (token, secretKey) => {
  try {
    return verify(token, secretKey);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { hashPassword, verifyPassword, verifyToken };
