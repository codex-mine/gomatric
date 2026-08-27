import express, { Request, Response } from 'express';
import { createNestServer } from '../src/main';

const server = express();
let isAppInitialized = false;

export default async function handler(req: Request, res: Response) {
  if (!isAppInitialized) {
    const app = await createNestServer(server);
    await app.init();
    isAppInitialized = true;
  }
  return server(req, res);
}
