// import { FastifyPluginAsync } from "fastify"
// import { PrismaClient } from '@prisma/client'

// const orgRoutesPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
//   // fastify.addSchema({
//   //   $id: 'http://example.com/',
//   //   type: 'object',
//   //   properties: {
//   //     hello: { type: 'string' }
//   //   }
//   // })

//   // // List users
//   // fastify.get('/user', async (req, res) => {
//   //   const users = await fastify.prisma.post.findMany({
//   //     where: { published: true },
//   //     include: { author: true },
//   //   })
//   //   res.send(users)
//   // })

//   type OrgIdParam {
//     id: string;
//   }

//   // Get a org
//   fastify.get<{ Params: OrgIdParam }>('/org/:orgId', async (req, res) => {
//     return null
//   })

//   // Create a org
//   fastify.post('/org', async (req, res) => {
//     return 'this is an example'
//   })

//   // Update a user
//   fastify.put<{ Params: OrgIdParam }>('/org/:orgId', async (req, res) => {
//     const { orgId } = req.params;
//     return 'this is an example'
//   })

//   // Mark an org as deleted
//   fastify.delete<{ Params: OrgIdParam }>('/org/:orgId', async function (req, res) {
//     const { orgId } = req.params;
//     return 'this is an example'
//   })
// }

// export default orgRoutesPlugin;
