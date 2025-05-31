import { JWT_SECRET } from "@/config/env.config";
import { logger } from "@/config/logger.config";
import { fetchOneUser } from "@/repositories/users.repository";
import passport from "passport";
import passportStrategy, { StrategyOptionsWithRequest } from "passport-jwt";

const JWTStrategy = passportStrategy.Strategy;
const ExtractJWT = passportStrategy.ExtractJwt;

const options: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
  secretOrKey: JWT_SECRET,
  passReqToCallback: true,
};

export const passportMiddleware = () => {
  passport.use(
    "jwt",
    new JWTStrategy(options, async (req, payload, done) => {
      try {
        const isUser = await fetchOneUser({
          where: { contact_no: payload.data.contact_no },
          raw: true,
        });
        if (isUser) {
          done(null, { ...isUser });
        } else {
          done(null, false);
        }
      } catch (error) {
        logger.error(error);
        done(error);
      }
    })
  );
};
