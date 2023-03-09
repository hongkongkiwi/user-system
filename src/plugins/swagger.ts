import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export interface SwaggerPluginOptions {
  // Specify Support plugin options here
}

/**
 * A Fastify plugin for serving Swagger (OpenAPI v2) or OpenAPI v3 schemas, 
 * which are automatically generated from your route schemas, or from an 
 * existing Swagger/OpenAPI schema.
 * @see https://github.com/fastify/fastify-swagger
 */
export default fp<SwaggerPluginOptions>(async (fastify) => {
  fastify
    .register(swagger, {
      swagger: {
        info: {
          title: 'Test swagger',
          description: 'testing the fastify swagger api',
          version: '0.1.0'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
      },
      hideUntagged: true
    })
  .register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })
})