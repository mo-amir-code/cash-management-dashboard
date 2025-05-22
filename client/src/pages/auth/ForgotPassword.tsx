import { useForm } from "react-hook-form";
import { AuthScreen } from "../../screens";
import InputField from "../../components/common/inputs/TextField";
import type { ForgotPasswordFormType } from "../../types/pages/auth";
import Button from "../../components/common/buttons/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>();
  const router = useNavigate();

  return (
    <AuthScreen>
      <div className="text-black space-y-6 p-2">
        <h2 className="text-center text-primary text-shadow-lg text-3xl font-semibold">
          Reset Your Password
        </h2>
        <form className="space-y-5">
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
          <Button content="Send OTP" className="w-full" />
        </form>
      </div>
    </AuthScreen>
  );
};

export default ForgotPassword;