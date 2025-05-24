import { getAccountById } from "../../db/services/account.db.service";
import {
  apiHandler,
  ErrorHandlerClass,
  ok,
} from "../../services/errorHandling";
import { BAD_REQUEST_STATUS_CODE } from "../../utils/constants/common";
import {
  ACCOUNT_FETCHED_MSG,
  ACCOUNT_ID_REQUIRED_MSG,
  INVALID_ACCOUNT_ID_MSG,
} from "../../utils/constants/serverResponseMessages";

const getAccount = apiHandler(async (req, res, next) => {
  const { accountId } = req.params;

  if (!accountId) {
    return next(
      new ErrorHandlerClass(ACCOUNT_ID_REQUIRED_MSG, BAD_REQUEST_STATUS_CODE)
    );
  }

  const account = await getAccountById(accountId);
  if (account) {
    return next(
      new ErrorHandlerClass(INVALID_ACCOUNT_ID_MSG, BAD_REQUEST_STATUS_CODE)
    );
  }

  return ok({
    res,
    message: ACCOUNT_FETCHED_MSG,
    data: account,
  });
});

export { getAccount };
