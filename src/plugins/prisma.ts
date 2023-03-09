//import glob from 'glob'
import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export interface PrismaOptions {
  // Specify Support plugin options here
}

// import { withPolicy } from '@zenstackhq/runtime';
// function getUserId(req: Request) {
//     return parseInt(req.header('X-USER-ID')!);
// }

// // Gets a Prisma client bound to the current user identity
// function getPrisma(req: Request) {
//   const userId = getUserId(req);
//   const user = Number.isNaN(userId) ? undefined : { id: userId };
//   return withPolicy(prisma, {
//       user,
//   });

// const loadPrismaMiddleware = async(prisma: PrismaClient) => {
//   const res = await glob(__dirname + '../prisma/**/*.ts');
//   const modules = Promise.all(res.map((file) => (
//     import(file.replace(__dirname, '.').replace('.ts', ''))
//   )))
// }

  // let xprisma = prisma
  // const files = await glob(__dirname + '../prisma/**/*.ts');
  // files.map((file) => (
  //   xprisma = xprisma.$extends({
  //     model: {
  //       account: {
  //         async signUp(email: string) {
  //           await prisma.account.create({ data: { email } })
  //         },
  //       },
  //     },
  //   })
  //   import(file.replace(__dirname, '.').replace('.ts', ''))
  // ))
  // const xprisma = prisma.$extends({
  //   model: {
  //     account: {
  //       async signUp(email: string) {
  //         await prisma.account.create({ data: { email } })
  //       },
  //     },
  //   },
  // })

const extendPrismaClient = (prisma: PrismaClient) => {
  const xprisma = prisma
    // .$extends(xuser)
    // .$extends(xplaidItem)
    // .$extends(xdestination)
    // .$extends(xcodacredential)
    // .$extends(xsync)
  return xprisma
}

export default fp<PrismaOptions>(async (fastify, opts) => {
  const prisma = extendPrismaClient(new PrismaClient())
  await prisma.$connect()
  // Make Prisma Client available through the fastify server instance: server.prisma
  fastify.decorate('prisma', prisma)
  fastify.addHook('onClose', async (server) => {
    await server.prisma.$disconnect()
  })
})