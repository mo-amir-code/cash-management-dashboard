import type { TransactionType } from "../components/layouts/admin/dashboard"


type UserInfoType = {
    userId: string
    email: string
    accountId: string
}

type EmpType = {
    id: string
    name: string
    accountId: string
}

type State = {
    isLoading: boolean
    isAuthenticated: boolean;
    userInfo: UserInfoType | null
    emps: EmpType[]
    txns: TransactionType[]
}

type Action =
  | { type: "IS_LOADING"; payload: boolean }
  | { type: "IS_AUTHENTICATED"; payload: boolean }
  | { type: "USER_INFO"; payload: UserInfoType | null }
  | { type: "EMPLOYEES"; payload: EmpType[] }
  | { type: "TRANSACTIONS"; payload: TransactionType[] }

type Dispatch = (action: Action) => void;

export type {
    UserInfoType,
    State,
    Action,
    Dispatch,
    EmpType
}
