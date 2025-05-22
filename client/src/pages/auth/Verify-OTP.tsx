import { useForm } from "react-hook-form";
import { AuthScreen } from "../../screens";
import InputField from "../../components/common/inputs/TextField";
import type { VeirfyOTPFormType } from "../../types/pages/auth";
import Button from "../../components/common/buttons/Button";
import { useNavigate } from "react-router";

const VerifyOTP = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<VeirfyOTPFormType>();
  const router = useNavigate();

  return (
    <AuthScreen>
      <div className="text-black space-y-6 p-2">
        <h2 className="text-center text-primary text-shadow-lg text-3xl font-semibold">
          Verify OTP
        </h2>
        <form className="space-y-5">
          <div className="space-y-3">
            <InputField
              register={register}
              placeHolder="Enter OTP"
              type="tel"
              isCenter
              required="OTP"
              name="otp"
              error={errors.otp?.message as string | undefined}
            />
          </div>
          <Button content="Verify" className="w-full" />
        </form>
      </div>
    </AuthScreen>
  );
};

export default VerifyOTP;