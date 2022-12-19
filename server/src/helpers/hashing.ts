import * as crypto from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(crypto.scrypt);
export const hash = async (data: string) => {
  try {
    const salt = crypto.randomBytes(16).toString('hex');
    const buf = (await scryptAsync(data, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}}`;
  } catch (e) {
    return e;
  }

};

export const verify = async (data: string, hashingData: string) => {
  const [hashedPassword, salt] = hashingData.split('.');
  const hashedPasswordBuffer = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuff = (await scryptAsync(data, salt, 64)) as Buffer;
  return crypto.timingSafeEqual(hashedPasswordBuffer, suppliedPasswordBuff);
};
