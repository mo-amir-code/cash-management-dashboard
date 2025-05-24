import { useForm } from "react-hook-form";
import { AuthScreen } from "../../wrappers/screens";
import InputField from "../../components/common/inputs/TextField";
import type { SignInFormType } from "../../types/pages/auth";
import Button from "../../components/common/buttons/Button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { APIResponseType } from "../../types/apis/auth";
import toast from "react-hot-toast";
import { handleToSignIn } from "../../apis/auth";
import { useUserDispatch } from "../../context/GlobalContext";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignInFormType>();
  const router = useNavigate();
  const [_isChecked, setIsChecked] = useState(false);
  const dispatch = useUserDispatch();

  const mutation = useMutation({
    mutationFn: handleToSignIn,
    onSuccess: (res: APIResponseType<any>) => {
      reset();
      toast.success(res.data.message);
      dispatch({
        type: "IS_AUTHENTICATED",
        payload: true,
      });
      dispatch({
        type: "USER_INFO",
        payload: res.data.data,
      });
    },
    onError: (res: any) => {
      toast.error(res.response.data.message);
    },
  });

  const handleOnSubmit = useCallback(async (data: SignInFormType) => {
    mutation.mutate(data);
  }, []);

  useEffect(() => {
    const savedMail = localStorage.getItem("rememberedEmail");
    if (savedMail) {
      setValue("email", savedMail);
    }
  }, [setValue]);

  return (
    <AuthScreen>
      <div className="text-black space-y-6 p-2">
        <h2 className="text-center text-primary text-shadow-lg text-3xl font-semibold">
          Sign In to Your Dashboard
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
            <InputField
              register={register}
              placeHolder="Enter password"
              type="text"
              required="Password"
              name="password"
              error={errors.password?.message as string | undefined}
            />
          </div>
          <div className="space-y-3">
            <Button
              content="Login to dashboard"
              type="submit"
              className="w-full"
            />

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => setIsChecked(e.target.checked)}
                  type="checkbox"
                  className="bg-white checked:bg-primary"
                />
                <span>Remember me</span>
              </div>

              <span
                onClick={() => router("/auth/forgot-password")}
                className="cursor-pointer"
              >
                Forgot Password
              </span>
            </div>
          </div>
        </form>
      </div>
    </AuthScreen>
  );
};

export default SignInForm;
