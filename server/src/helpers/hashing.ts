import * as crypto from 'crypto'

export const hash = (data: string) => {
  return crypto.createHash('md5').update(data).digest('hex')
}

export const verify = (data: string, hashingData: string) => {
  return hash(data) === hashingData
}
