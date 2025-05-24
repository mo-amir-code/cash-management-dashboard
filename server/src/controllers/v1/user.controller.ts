import { getAccountByUserId } from "../../db/services/account.db.service";
import { getAllUsersDbService } from "../../db/services/user.db.service";
import {
  apiHandler,
  ok,
} from "../../services/errorHandling";
import { UserSchemaType } from "../../types/db/schemas";
import { ALL_USERS_FETCHED_MSG } from "../../utils/constants/serverResponseMessages";

const getAllUsers = apiHandler(async (req, res, next) => {
  let users: any = await getAllUsersDbService("employee");

  users = await Promise.all(
    users.map(async (u:UserSchemaType) => {
      const account = await getAccountByUserId(u._id);
      const user = JSON.parse(JSON.stringify(u))
      return {
        name: user?.name || "",
        id: user._id,
        accountId: account!._id,
      };
    })
  );

  return ok({
    res,
    message: ALL_USERS_FETCHED_MSG,
    data: users
  });
});

export { getAllUsers };
