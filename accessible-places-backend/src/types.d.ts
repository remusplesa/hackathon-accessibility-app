import express from 'express';
import { azureBlobConn } from "./utils/connection.azure";

export type AzureBlobConn = typeof azureBlobConn;
export type UserAuth = {
  user: string;
  password: string;
  isLoggedIn: boolean;
}
export type ServerContext = AzureBlobConn & { req: express.Request, res: express.Response } & UserAuth;
