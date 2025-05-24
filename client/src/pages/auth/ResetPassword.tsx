import { useForm } from "react-hook-form";
import { AuthScreen } from "../../wrappers/screens";
import InputField from "../../components/common/inputs/TextField";
import type { ResetPasswordFormType } from "../../types/pages/auth";
import Button from "../../components/common/buttons/Button";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { APIResponseType } from "../../types/apis/auth";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { handleToChangePassword } from "../../apis/auth";
import { useUserDispatch } from "../../context/GlobalContext";

const ResetPassword = () => {
  const dispatch = useUserDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormType>();
  const router = useNavigate();

  const mutation = useMutation({
    mutationFn: handleToChangePassword,
    onSuccess: (res: APIResponseType<any>) => {
      toast.success(res.data.message);
      reset();
      router("/auth/signin");
      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
    },
    onError: (res: any) => {
      toast.error(res.response.data.message);
      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
    },
  });

  const handleOnSubmit = useCallback(async (data: any) => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });
    mutation.mutate({...data, otp: JSON.parse(data.otp)});
  }, []);

  return (
    <AuthScreen>
      <div className="text-black space-y-6 p-2">
        <h2 className="text-center text-primary text-shadow-lg text-3xl font-semibold">
          Change Your Password
        </h2>
        <form
          onSubmit={handleSubmit((data) => handleOnSubmit(data))}
          className="space-y-5"
        >
          <div className="space-y-3">
            <InputField
              register={register}
              placeHolder="Enter OTP"
              type="number"
              required="OTP is required"
              name="otp"
              error={errors.otp?.message as string | undefined}
            />
            <InputField
              register={register}
              placeHolder="Enter new password"
              type="text"
              required="New Password is required"
              name="newPassword"
              error={errors.newPassword?.message as string | undefined}
            />
          </div>
          <Button content="Change Password" type="submit" className="w-full" />
        </form>
      </div>
    </AuthScreen>
  );
};

export default ResetPassword;
