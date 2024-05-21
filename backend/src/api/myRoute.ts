// src/api/myRoute.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import  app  from '../index';

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};