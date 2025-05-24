import type { ForgotPasswordType, ResetPasswordType, SignInDataType, SignUpDataType } from "../types/apis/auth";
import { httpAxios } from "../utils/axios";

const handleToSignUp = async (data: SignUpDataType) => {
  const res = await httpAxios.post("/auth/register", data);
  return res;
};

const handleToSignIn = async (data: SignInDataType) => {
  const res = await httpAxios.post("/auth/signin", data);
  return res;
};

const handleToVerifyOTP = async (data: { otp: number }) => {
  const res = await httpAxios.post("/auth/verify", data);
  return res;
};

const handleToCheckSession = async () => {
  const res = await httpAxios.get("/auth");
  return res;
};

const handleToForgotPassword = async (data:ForgotPasswordType) => {
  const res = await httpAxios.post("/auth/forgot-password", data);
  return res;
};

const handleToChangePassword = async (data:ResetPasswordType) => {
  const res = await httpAxios.post("/auth/reset-password", data);
  return res;
};

const handleToLogout = async () => {
  const res = await httpAxios.post("/auth/logout");
  return res.data;
};

export {
  handleToSignUp,
  handleToSignIn,
  handleToVerifyOTP,
  handleToCheckSession,
  handleToForgotPassword,
  handleToChangePassword,
  handleToLogout
};
