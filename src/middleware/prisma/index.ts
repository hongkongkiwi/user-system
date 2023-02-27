import * as bcrypt from 'bcrypt'
import { Prisma, PrismaClient, UserCredPasswordType } from '.prisma/client'

// UserCredPassword
const saltRounds = 31
const encryptUserPassword: Prisma.Middleware =  async (params: Prisma.MiddlewareParams, next) => {
  if (params.action == 'create' && params.model == 'UserCredPassword') {
    const user = params.args.data
    const salt = await bcrypt.genSalt(saltRounds)
    user.password = await bcrypt.hash(user.password, salt)
    user.hashType = UserCredPasswordType.BCRYPT
    user.saltRounds = saltRounds
    params.args.data = user
  }
  return await next(params)
}

export default (prisma: PrismaClient) => {
  prisma.$use(encryptUserPassword)
}
