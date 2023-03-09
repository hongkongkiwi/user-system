// import { Prisma } from '@prisma/client'

// export default Prisma.defineExtension((prisma) => {
//   return prisma.$extends({
//     query: {
//       $allModels: {
//         // async findOrCreate({ args, query, operation }: any) {
//         //   return (await prisma.$transaction([query(args)]))[0]
//         // },
//       },
//     },
//   })
// })

// // const prisma = new PrismaClient().$extends({
// //   result: {
// //     user: {
// //       password: {
// //         needs: {},
// //         compute() {
// //           return undefined;
// //         },
// //       },
// //     },
// //   },
// // });