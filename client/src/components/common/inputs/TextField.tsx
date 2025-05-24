import type { TextFieldType } from "../../../types/components/common/inputs";

const InputField = ({
  placeHolder,
  type,
  name,
  register,
  required,
  isCenter,
  error,
  defaultValue,
}: TextFieldType) => {
  return (
    <div className="w-full">
      <div className="w-full cursor-pointer flex-1 text-xl gap-2 border-2 border-gray-200/50 rounded-sm py-2 px-2 max-md:py-2 max-md:px-1 on_focus transition-all duration-200 flex items-center justify-start">
        <input
          defaultValue={defaultValue}
          type={type}
          {...(register ? { ...register(name, { required: required }) } : null)}
          className={`text-base max-md:text-sm font-normal ${
            isCenter && "text-center"
          } text-foreground-black caret-foreground-black bg-transparent outline-none group w-full`}
          placeholder={placeHolder}
        />
      </div>
      <span className="text-xs text-start block text-red-500 pt-1 pl-1">
        {error ?? null}
      </span>
    </div>
  );
};

export default InputField;
