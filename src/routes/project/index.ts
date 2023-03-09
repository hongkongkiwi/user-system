// import { FastifyPluginAsync } from "fastify"

// const projectRoutesPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
//   // fastify.addSchema({
//   //   $id: 'http://example.com/',
//   //   type: 'object',
//   //   properties: {
//   //     hello: { type: 'string' }
//   //   }
//   // })

//   type OrgIdParam = {
//     orgId: string
//   }

//   type ProjectIdParam = {
//     projectId: string
//   }

//   // List projects
//   fastify.get<{ Params: OrgIdParam }>('/org/:orgId/projects', async (req, res) => {
//     const { orgId } = req.params;
//     return null
//   })

//   // Get a project
//   fastify.get<{ Params: ProjectIdParam }>('/projects/:projectId', async (req, res) => {
//     return null
//   })

//   // Create a project
//   fastify.post('/project', async (req, res) => {
//     return 'this is an example'
//   })

//   // Update a project
//   fastify.put<{ Params: ProjectIdParam }>('/projects/:projectId', async (req, res) => {
//     const { projectId } = req.params;
//     return 'this is an example'
//   })

//   // Mark a project as deleted
//   fastify.delete<{ Params: ProjectIdParam }>('/projects/:projectId', async function (req, res) {
//     const { projectId } = req.params;
//     return 'this is an example'
//   })
// }

// export default projectRoutesPlugin;
