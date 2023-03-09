// import { PrismaClient } from '@prisma/client'
// import { ModelNamesLower } from '../../../prisma/types/enums'
// // import { AccountAuthPasswordEnum } from '../../../prisma/generated/enums'

// export class Accounts {
//   constructor(private readonly prismaAccount: PrismaClient['account']) {}
//   // Signup a new user
//   async changePassword(data: any): Promise<Account> {
//     // do some custom validation...
//     return this.prismaAccount.update({ data })
//   }
// }

// export class AccountModel {
//   constructor(private readonly prismaAccount: PrismaClient[ModelNamesLower.account]) {}
//   // Signup a new user
//   async changePassword(data: any): Promise<Account> {
//     // do some custom validation...
//     return this.prismaAccount.update({ data })
//   }
// }