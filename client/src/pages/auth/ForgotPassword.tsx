import { useForm } from "react-hook-form";
import { AuthScreen } from "../../wrappers/screens";
import InputField from "../../components/common/inputs/TextField";
import type { ForgotPasswordFormType } from "../../types/pages/auth";
import Button from "../../components/common/buttons/Button";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { APIResponseType } from "../../types/apis/auth";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { handleToForgotPassword } from "../../apis/auth";
import { useUserDispatch } from "../../context/GlobalContext";

const ForgotPassword = () => {
  const dispatch = useUserDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>();
  const router = useNavigate();

  const mutation = useMutation({
    mutationFn: handleToForgotPassword,
    onSuccess: (res: APIResponseType<any>) => {
      toast.success(res.data.message);
      reset();
      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
      router("/auth/reset");
    },
    onError: (res: any) => {
      toast.error(res.response.data.message);
      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
    },
  });

  const handleOnSubmit = useCallback(async (data: { email: string }) => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });
    mutation.mutate(data);
  }, []);

  return (
    <AuthScreen>
      <div className="text-black space-y-6 p-2">
        <h2 className="text-center text-primary text-shadow-lg text-3xl font-semibold">
          Reset Your Password
        </h2>
        <form
          onSubmit={handleSubmit((data) => handleOnSubmit(data))}
          className="space-y-5"
        >
          <div className="space-y-3">
            <InputField
              register={register}
              placeHolder="Enter email"
              type="text"
              required="Email"
              name="email"
              error={errors.email?.message as string | undefined}
            />
          </div>
          <Button content="Send OTP" type="submit" className="w-full" />
        </form>
      </div>
    </AuthScreen>
  );
};

export default ForgotPassword;
