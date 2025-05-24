import { createContext, useReducer, useContext, type ReactNode } from "react";
import type { Action, Dispatch, State } from "../types/context";

// 2. Initial state
const initialState: State = {
  isLoading: false,
  isAuthenticated: false,
  userInfo: null,
  emps: [],
  txns: [],
};

// 3. Reducer
function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case "IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "IS_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };
    case "EMPLOYEES":
      return { ...state, emps: action.payload };
    case "TRANSACTIONS":
      return { ...state, txns: action.payload };
    case "USER_INFO":
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}

// 4. Create context
const UserStateContext = createContext<State | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch | undefined>(undefined);

// 5. Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={{ ...state }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

// 6. Custom Hooks
export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};
