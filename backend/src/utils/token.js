import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.configDotenv({ debug: true });

export const GenerateJwtToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT secret key is missing");
  }

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "7d",
  });

  return token;
};

export const verifyToken = (token) => {
  const jwt_secret = process.env.JWT_SECRET_KEY;

  if (!jwt_secret) {
    throw new Error("JWT secret key is missing");
  }

  if (!token) {
   throw new Error("Access denied . token is missing");
  }

  const payload = jwt.verify(token,jwt_secret);
  return payload;
};
