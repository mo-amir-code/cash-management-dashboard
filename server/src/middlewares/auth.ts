import { COOKIE_ROOT_DOMAIN } from "../config/constants";
import { getUserByIDorEmail } from "../db/services/user.db.service";
import { apiHandler, ErrorHandlerClass } from "../services/errorHandling";
import { generateRefreshAndAccessToken } from "../services/jwt";
import { UNAUTHORIZED_REQUEST_STATUS_CODE } from "../utils/constants/common";
import { ACCESS_TOKEN_NAME, accessCookieOptions } from "../utils/constants/cookies";
import { SESSION_EXPIRED_RES_MSG, UNAUTHORIZED_REQUEST_RES_MSG } from "../utils/constants/serverResponseMessages";
import { JWTTokenVerifier } from "../utils/controllers/v1/auth.utils";
import jwt from "jsonwebtoken"


const isUserAuthenticated = apiHandler(async (req, res, next) => {
    const { accesstoken } = req.cookies;
  
    if (!accesstoken) {
      return next(
        new ErrorHandlerClass(
          UNAUTHORIZED_REQUEST_RES_MSG,
          UNAUTHORIZED_REQUEST_STATUS_CODE
        )
      );
    }
  
    let payload = JWTTokenVerifier(accesstoken);
    if (payload) {
      req.user.id = payload.userId;
      return next();
    }
  
    payload = jwt.decode(accesstoken) as any;
  
    if (!payload) {
      return next(
        new ErrorHandlerClass(
          UNAUTHORIZED_REQUEST_RES_MSG,
          UNAUTHORIZED_REQUEST_STATUS_CODE
        )
      );
    }
  
    const user = await getUserByIDorEmail({ type: "id", data: payload.userId });
  
    if (!user) {
      return next(
        new ErrorHandlerClass(
          UNAUTHORIZED_REQUEST_RES_MSG,
          UNAUTHORIZED_REQUEST_STATUS_CODE
        )
      );
    }
  
    if (!user.isVerified) {
      return next(
        new ErrorHandlerClass(
          UNAUTHORIZED_REQUEST_RES_MSG,
          UNAUTHORIZED_REQUEST_STATUS_CODE
        )
      );
    }
  
    const session = user.session;
  
    if (!session) {
      return next(
        new ErrorHandlerClass(
          UNAUTHORIZED_REQUEST_RES_MSG,
          UNAUTHORIZED_REQUEST_STATUS_CODE
        )
      );
    }
  
    payload = JWTTokenVerifier(session);
  
    if (payload) {
      const { accessToken } = await generateRefreshAndAccessToken({
        userId: user._id,
      });
  
      res.cookie(ACCESS_TOKEN_NAME, accessToken, {
        ...accessCookieOptions,
        domain: COOKIE_ROOT_DOMAIN,
      });
  
      req.user.id = user._id;
      return next();
    }
  
    return next(
      new ErrorHandlerClass(
        SESSION_EXPIRED_RES_MSG,
        UNAUTHORIZED_REQUEST_STATUS_CODE
      )
    );
  });

  export {
    isUserAuthenticated
  }
  