import { useForm } from "react-hook-form";
import { AuthScreen } from "../../wrappers/screens";
import InputField from "../../components/common/inputs/TextField";
import type { VeirfyOTPFormType } from "../../types/pages/auth";
import Button from "../../components/common/buttons/Button";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { APIResponseType } from "../../types/apis/auth";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { handleToVerifyOTP } from "../../apis/auth";
import { useUserDispatch } from "../../context/GlobalContext";

const VerifyOTP = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VeirfyOTPFormType>();
  // const router = useNavigate();
  const dispatch = useUserDispatch();

  const mutation = useMutation({
    mutationFn: handleToVerifyOTP,
    onSuccess: (res: APIResponseType<any>) => {
      reset();
      toast.success(res.data.message);
      dispatch({
        type: "USER_INFO",
        payload: res.data.data,
      });
      dispatch({
        type: "IS_AUTHENTICATED",
        payload: true,
      });
    },
    onError: (res:any) => {
      toast.error(res.response.data.message);
    }
  });

  const handleOnSubmit = useCallback(async (data: any) => {
    let otp = JSON.parse(data.otp);
    mutation.mutate({ otp });
  }, []);

  return (
    <AuthScreen>
      <div className="text-black space-y-6 p-2">
        <h2 className="text-center text-primary text-shadow-lg text-3xl font-semibold">
          Verify OTP
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
              isCenter
              required="OTP"
              name="otp"
              error={errors.otp?.message as string | undefined}
            />
          </div>
          <Button content="Verify" type="submit" className="w-full" />
        </form>
      </div>
    </AuthScreen>
  );
};

export default VerifyOTP;
