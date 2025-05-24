import { httpAxios } from "../utils/axios";

const handleToGetAllEmployees = async () => {
  const res = await httpAxios.get("/user");
  return res.data;
};

export { handleToGetAllEmployees };
