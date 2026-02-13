import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};
