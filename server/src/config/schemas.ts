const USER_SCHEMA_NAME = "User";
const ACCOUNT_SCHEMA_NAME = "Account";
const TRANSACTION_SCHEMA_NAME = "Transaction";



export {
    USER_SCHEMA_NAME,
    TRANSACTION_SCHEMA_NAME,
    ACCOUNT_SCHEMA_NAME
}


// Schema Data
const USERS_ROLE = ["employee", "admin"] as const;
const TRANSACTION_ROLE = ["deposit", "collection"] as const;

export {
    USERS_ROLE,
    TRANSACTION_ROLE
}