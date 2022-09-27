import * as crypto from 'crypto'

export const hash = (data: string) => {
  try {
    return crypto.createHash('md5').update(data).digest('hex')
  }
  catch (e){
    console.log(e);
    return e
  }

}

export const verify = (data: string, hashingData: string) => {
  return hash(data) === hashingData
}
