import * as dotenv from 'dotenv'
dotenv.config()
import * as path from 'path'
import loadCustomPrismaMiddleware from './middleware/prisma';
import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import { createYoga } from 'graphql-yoga'
import { buildSchema } from "type-graphql"
import { PrismaClient } from '.prisma/client'
import { resolvers } from '@generated/type-graphql'

const prisma: PrismaClient = new PrismaClient()
// Import custom prisma middlewares
loadCustomPrismaMiddleware(prisma)
await prisma.$connect()

// This is the fastify instance you have created
const app = fastify({ logger: true })
const schema = await buildSchema({
  resolvers,
  emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
  validate: false,
})

const yoga = createYoga<{
  schema,
  req: FastifyRequest
  reply: FastifyReply
}>({
  // Integrate Fastify logger
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg))
  }
})

// This will allow Fastify to forward multipart requests to GraphQL Yoga
//app.addContentTypeParser('multipart/form-data', {}, (req, payload, done) =>
//  done(null)
//)
 
/**
 * We pass the incoming HTTP request to GraphQL Yoga
 * and handle the response using Fastify's `reply` API
 * Learn more about `reply` https://www.fastify.io/docs/latest/Reply/
 **/
app.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  handler: async (req, reply) => {
    // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply
    })
    response.headers.forEach((value, key) => {
      reply.header(key, value)
    })
 
    reply.status(response.status)
 
    reply.send(response.body)
 
    return reply
  }
})
 
app.listen({ port: process.env.PORT || 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})