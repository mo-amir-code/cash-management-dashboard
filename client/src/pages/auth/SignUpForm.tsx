import { useForm } from "react-hook-form";
import { AuthScreen } from "../../screens";
import InputField from "../../components/common/inputs/TextField";
import type { SignInFormType } from "../../types/pages/auth";
import Button from "../../components/common/buttons/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormType>();
  const router = useNavigate();

  return (
    <AuthScreen>
      <div className="text-black space-y-6 p-2">
        <h2 className="text-center text-primary text-shadow-lg text-3xl font-semibold">
          Create An Account
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
            <InputField
              register={register}
              placeHolder="Enter password"
              type="text"
              required="Password"
              name="password"
              error={errors.password?.message as string | undefined}
            />
          </div>
          <Button content="Create Account" className="w-full" />
        </form>
      </div>
    </AuthScreen>
  );
};

export default SignUpForm;
