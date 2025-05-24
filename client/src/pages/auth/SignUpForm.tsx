import { useForm } from "react-hook-form";
import { AuthScreen } from "../../wrappers/screens";
import InputField from "../../components/common/inputs/TextField";
import type { SignInFormType } from "../../types/pages/auth";
import Button from "../../components/common/buttons/Button";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { handleToSignUp } from "../../apis/auth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import type { APIResponseType } from "../../types/apis/auth";
import { useUserDispatch } from "../../context/GlobalContext";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormType>();
  const router = useNavigate();
  const dispatch = useUserDispatch();

  const mutation = useMutation({
    mutationFn: handleToSignUp,
    onSuccess: (res: APIResponseType<any>) => {
      reset();
      router("/auth/verify");
      toast.success(res.data.message);

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

  const handleOnSubmit = useCallback(async (data: SignInFormType) => {
    dispatch({
      type: "IS_LOADING",
      payload: true,
    });
    mutation.mutate({ ...data, role: "admin" });
  }, []);

  return (
    <AuthScreen>
      <div className="text-black space-y-6 p-2">
        <h2 className="text-center text-primary text-shadow-lg text-3xl font-semibold">
          Create An Account
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
              required="Email is required"
              name="email"
              error={errors.email?.message as string | undefined}
            />
            <InputField
              register={register}
              placeHolder="Enter password"
              type="text"
              required="Password is required"
              name="password"
              error={errors.password?.message as string | undefined}
            />
          </div>
          <Button type="submit" content="Create Account" className="w-full" />
          <div className="flex items-center">
            <button
              onClick={() => router("/auth/signin")}
              className="text-blue-700 underline cursor-pointer"
            >
              Already have an account?
            </button>
          </div>
        </form>
      </div>
    </AuthScreen>
  );
};

export default SignUpForm;
