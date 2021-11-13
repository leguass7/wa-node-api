export declare const baseURL = "https://api.sac.digital/v2/client";
export declare enum ReqType {
    NOTIFICATION = "notification/contact",
    DEPARTMENT = "department/all",
    GETCONTACT = "contact/search",
    GETATTENDANT = "operator/all"
}
export declare const authScopes: readonly ["edit", "write", "import", "remove", "send", "contact", "inbox", "channel", "department", "operator", "schedule", "wallet_client", "monitor", "group", "campaign", "tag", "protocol", "notification", "coupon", "smsideal", "product", "correios", "portable", "popup", "manager"];
export declare type ScopeType = typeof authScopes[number];
