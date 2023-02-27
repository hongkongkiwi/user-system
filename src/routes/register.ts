import { AuthorizationServer } from '@jmondi/oauth2-server'
import {
  requestFromFastify,
  handleFastifyReply,
  handleFastifyError,
} from "@jmondi/oauth2-server/dist/adapters/fastify"

const authorizationServer = new AuthorizationServer(
  authCodeRepository,
  clientRepository,
  accessTokenRepository,
  scopeRepository,
  userRepository,
  new JwtService("secret-key"),
);
authorizationServer.enableGrantType("client_credentials");
authorizationServer.enableGrantType("authorization_code");
authorizationServer.enableGrantType("refresh_token");