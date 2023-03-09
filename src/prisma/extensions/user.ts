// import { Prisma, PrismaClient, AccountAuthPassword, Account } from '@prisma/client'

// export default Prisma.defineExtension((prisma: PrismaClient) => {
//   // https://www.prisma.io/blog/client-extensions-preview-8t3w27xkrxxn#example-static-methods
//   return prisma.$extends({
//     model: {
//       account: {
//         deleted: () => ({ isDeleted: true }),
//         // byEmail: (emailId: string) => ({ emailId }),
//         // byAuthorDomain: (domain: string) => ({
//         //   author: { email: { endsWith: `@${domain}` } },
//         // }),
//         // hasComments: () => ({ comments: { some: {} } }),
//         // hasRecentComments: (date: Date) => ({
//         //   comments: { some: { createdAt: { gte: date } } },
//         // }),
//         // titleContains: (search: string) => ({ title: { contains: search } }),
//       } satisfies Record<string, (...args: any) => Prisma.AccountWhereInput>,
//     },
//   });
// })


// // return prisma.$extends({
// //   model: {
// //     account: {
// //       async updatePassword(password: string) {
// //         const hash = await bcrypt.hash(password, 10);
// //         return prisma.account.update({
// //             where: {},
// //             data: {
// //               password: {
// //               create: {
// //                 hash,
// //               },
// //             },
// //           },
// //         });
// //       },
// //       // async findManyByDomain(domain: string) {
// //       //   return prisma.user.findMany({
// //       //     where: { email: { endsWith: `@${domain}` } },
// //       //   });
// //       // },
// //     },
// //   },
// // },