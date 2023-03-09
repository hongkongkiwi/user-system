import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts'
import { generateUsername } from 'friendly-username-generator'
import { schemaAccountCreateBody } from './schema'
import $RefParser from '@apidevtools/json-schema-ref-parser'

// const deleteEmptyProps = (obj: any): any => {
//   // modifies passed obj in place, removing empty properties (inc. empty arrays)
//   return Object.keys(obj).forEach(k => {
//     if (obj[k] === null ||
//       Array.isArray(obj[k]) && obj[k].length === 0) {
//       obj[k] = undefined
//     }
//   })
// }

type OrgIdParam = {
  orgId: string
}

type AccountIdParam = {
  accountId: string
}

type AccountUpdateBody = {
  username?: string,
  pronoun?: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  preferredName?: string,
  dateOfBirth?: Date
}

type AccountUpdatePasswordBody = {
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
}

const plugin: FastifyPluginAsyncJsonSchemaToTs<{ references: [typeof schemaAccountCreateBody] }> = async (fastify, opts): Promise<void> => {
  fastify.addSchema(schemaAccountCreateBody)

  // try {
  //   let schema = await $RefParser.dereference('./schema.ts')
  //   console.log(schema)
  // }
  // catch(err) {
  //   console.error(err)
  // }

  // const accountWithPosts = Prisma.validator<Prisma.AccountArgs>()({
  //   include: { po  sts: true },
  // })

  // const userPersonalData = Prisma.validator<Prisma.AccountArgs>()({
  //   select: { email: true, name: true },
  // })

  // // // 3: This type will include a user and all their posts
  // type AccountWithPosts = Prisma.AccountGetPayload<typeof accountWithPosts>

  // Get all organisation users
  fastify.get<{ Params: OrgIdParam }>('/orgs/:orgId/accounts', async (req, res) => {
    const { orgId } = req.params
    const orgAccounts = await fastify.prisma.account.findMany({
      where: { 
        id: orgId,
        pendingDelete: false
      },
      select: {
        id: true,
        accountHuman: {
          select: {
            firstName: true
          }
        },
        accountEmails: {
          where: {
            primary: true,
          },
          select: {
            emailAddress: true
          }
        }
      }
    })
    res.send(orgAccounts)
  })

  // Get a specific user
  fastify.get<{ Params: AccountIdParam }>('/accounts/:accountId', async (req, res) => {
    const { accountId } = req.params
    const account = await fastify.prisma.account.findUnique({
      where: { id: accountId }
    })
    res.send(account)
  })

  // Create a new user
  fastify.post('/account', { schema: { body: schemaAccountCreateBody } }, async (req, res) => {
    const { username, pronoun, firstName, middleName, 
      lastName, preferredName, dateOfBirth } = req.body
    if (firstName == null || lastName == null) {
      return res.badRequest()
    }
    try {
      const newAccount = await fastify.prisma.account.create({
        data: {
          username: username || generateUsername(),
          accountHuman: {
            create: {
              pronoun,
              firstName,
              middleName,
              lastName,
              preferredName,
              dateOfBirth
            }
          }
        }
      })
      res.send({id: newAccount.id})
    } catch (e) {
      res.send(e)
    }
  })

  // Update a specific user
  fastify.put<{ Params: AccountIdParam, Body: AccountUpdateBody }>('/user/:userId', async (req, res) => {
    const { accountId } = req.params
    const { username, pronoun, firstName, middleName, 
      lastName, preferredName, dateOfBirth } = req.body
    try {
      await fastify.prisma.account.update({
        where: { id: accountId },
        data: {
          username: username,
          accountHuman: {
            update: {
              pronoun,
              firstName,
              middleName,
              lastName,
              preferredName,
              dateOfBirth
            }
          }
        }
      })
      res.code(200)
    } catch (e) {
      res.send(e)
    }
  })

  // Change user password
  fastify.put<{ Params: AccountIdParam, Body: AccountUpdatePasswordBody }>('/account/:userId/password', async (req, res) => {
    const { accountId } = req.params
    const { newPassword, confirmNewPassword } = req.body
    if (newPassword !== confirmNewPassword) { return res.badRequest() }
    // TODO: check currentPassword
    try {
      await fastify.prisma.accountAuthPassword.upsert({
        where: { accountId: accountId },
        update: { password: newPassword },
        create: { password: newPassword, accountId: accountId }
      })
      res.send(200)
    } catch (e) {
      res.send(e)
    }
  })

  // Soft delete an account
  fastify.delete<{ Params: AccountIdParam }>('/accounts/:userId', async function (req, res) {
    const { accountId } = req.params
    try {
      await fastify.prisma.account.update({
        where: { id: accountId },
        data: { pendingDelete: true }
      })
      res.send(200)
    } catch (e) {
      res.send(e)
    }
  })
}

export default plugin
