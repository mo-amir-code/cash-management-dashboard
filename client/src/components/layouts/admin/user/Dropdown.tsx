import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handleToLogout } from "../../../../apis/auth";
import { useUserDispatch } from "../../../../context/GlobalContext";

const Dropdown = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useUserDispatch();

  const mutation = useMutation({
    mutationFn: handleToLogout,
    onSuccess: (res: any) => {
      toast.success(res.message);
      dispatch({
        type: "IS_AUTHENTICATED",
        payload: false,
      });
      dispatch({
        type: "USER_INFO",
        payload: null,
      });
    },
    onError: (res: any) => {
      toast.error(res.response.data.message);
    },
  });

  return (
    <div
      className={`absolute -bottom-[120%] min-w-[150%] select-none right-0 w-full bg-white rounded-md shadow p-2 smooth-transition ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <ul>
        <li onClick={() => mutation.mutate()} className="text-red-500 ">
          Log out
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
