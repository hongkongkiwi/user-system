import fp from 'fastify-plugin'
import gracefulShutdown from 'fastify-graceful-shutdown'

export interface GracefulShutdownPluginOptions {
  // Specify Support plugin options here
}

/**
 * Shutdown Fastify graceful asynchronously. 
 * By default the fastify close hook is called when SIGINT or SIGTERM was triggered.
 *
 * @see https://www.npmjs.com/package/fastify-graceful-shutdown
 */
export default fp<GracefulShutdownPluginOptions>(async (fastify) => {
  fastify
    .register(gracefulShutdown)
    .after(() => {
      fastify.gracefulShutdown((signal, next) => {
        console.log('Shutting Down!')
        next()
      })
    })
})