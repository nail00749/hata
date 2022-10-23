import { v4 as uuidv4 } from 'uuid';
import {extname} from 'path'
import {Request} from 'express';

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback
) => {
  const originalName = file.originalname.split('.').at(0)
  const extension = extname(file.originalname)
  const randomName = uuidv4()
  callback(null, `${originalName}-${randomName}${extension}`)
}
