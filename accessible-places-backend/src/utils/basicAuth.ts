import express from "express";
import { UserAuth } from "../types";

export const BasicAuthCtx = (req: express.Request): UserAuth => {
  const apiUser = process.env.API_USER;
  const apiPassword = process.env.API_PASSWORD;

  const authToken = req.headers["authorization"].split(" ")[1];
  const [user, password] = Buffer.from(authToken, 'base64').toString('ascii').split(":");

  return {
    user,
    password,
    isLoggedIn: user === apiUser && password === apiPassword
  }
}