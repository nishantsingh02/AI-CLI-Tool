export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth/adapters/prisma").DBAdapter<import("better-auth").BetterAuthOptions>;
    basePath: string;
    trustedOrigins: string[];
    plugins: [{
        id: "device-authorization";
        schema: {
            deviceCode: {
                fields: {
                    deviceCode: {
                        type: "string";
                        required: true;
                    };
                    userCode: {
                        type: "string";
                        required: true;
                    };
                    userId: {
                        type: "string";
                        required: false;
                    };
                    expiresAt: {
                        type: "date";
                        required: true;
                    };
                    status: {
                        type: "string";
                        required: true;
                    };
                    lastPolledAt: {
                        type: "date";
                        required: false;
                    };
                    pollingInterval: {
                        type: "number";
                        required: false;
                    };
                    clientId: {
                        type: "string";
                        required: false;
                    };
                    scope: {
                        type: "string";
                        required: false;
                    };
                };
            };
        };
        endpoints: {
            deviceCode: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        client_id: string;
                        scope?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        device_code: string;
                        user_code: string;
                        verification_uri: string;
                        verification_uri_complete: string;
                        expires_in: number;
                        interval: number;
                    };
                } : {
                    device_code: string;
                    user_code: string;
                    verification_uri: string;
                    verification_uri_complete: string;
                    expires_in: number;
                    interval: number;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        client_id: import("better-auth").ZodString;
                        scope: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    error: import("better-auth").ZodObject<{
                        error: import("better-auth").ZodEnum<{
                            invalid_request: "invalid_request";
                            invalid_client: "invalid_client";
                        }>;
                        error_description: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    device_code: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    user_code: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    verification_uri: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    verification_uri_complete: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    expires_in: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    interval: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                400: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    error: {
                                                        type: string;
                                                        enum: string[];
                                                    };
                                                    error_description: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/device/code";
            };
            deviceToken: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        grant_type: "urn:ietf:params:oauth:grant-type:device_code";
                        device_code: string;
                        client_id: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        access_token: string;
                        token_type: string;
                        expires_in: number;
                        scope: string;
                    };
                } : {
                    access_token: string;
                    token_type: string;
                    expires_in: number;
                    scope: string;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        grant_type: import("better-auth").ZodLiteral<"urn:ietf:params:oauth:grant-type:device_code">;
                        device_code: import("better-auth").ZodString;
                        client_id: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    error: import("better-auth").ZodObject<{
                        error: import("better-auth").ZodEnum<{
                            invalid_request: "invalid_request";
                            authorization_pending: "authorization_pending";
                            slow_down: "slow_down";
                            expired_token: "expired_token";
                            access_denied: "access_denied";
                            invalid_grant: "invalid_grant";
                        }>;
                        error_description: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    session: {
                                                        $ref: string;
                                                    };
                                                    user: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                400: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    error: {
                                                        type: string;
                                                        enum: string[];
                                                    };
                                                    error_description: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/device/token";
            };
            deviceVerify: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query: {
                        user_code: string;
                    };
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user_code: string;
                        status: string;
                    };
                } : {
                    user_code: string;
                    status: string;
                }>;
                options: {
                    method: "GET";
                    query: import("better-auth").ZodObject<{
                        user_code: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    error: import("better-auth").ZodObject<{
                        error: import("better-auth").ZodEnum<{
                            invalid_request: "invalid_request";
                        }>;
                        error_description: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user_code: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                        enum: string[];
                                                        description: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/device";
            };
            deviceApprove: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userCode: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userCode: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    error: import("better-auth").ZodObject<{
                        error: import("better-auth").ZodEnum<{
                            invalid_request: "invalid_request";
                            expired_token: "expired_token";
                            device_code_already_processed: "device_code_already_processed";
                        }>;
                        error_description: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    requireHeaders: true;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/device/approve";
            };
            deviceDeny: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userCode: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        success: boolean;
                    };
                } : {
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userCode: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    error: import("better-auth").ZodObject<{
                        error: import("better-auth").ZodEnum<{
                            invalid_request: "invalid_request";
                            expired_token: "expired_token";
                        }>;
                        error_description: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/device/deny";
            };
        };
        $ERROR_CODES: {
            readonly INVALID_DEVICE_CODE: "Invalid device code";
            readonly EXPIRED_DEVICE_CODE: "Device code has expired";
            readonly EXPIRED_USER_CODE: "User code has expired";
            readonly AUTHORIZATION_PENDING: "Authorization pending";
            readonly ACCESS_DENIED: "Access denied";
            readonly INVALID_USER_CODE: "Invalid user code";
            readonly DEVICE_CODE_ALREADY_PROCESSED: "Device code already processed";
            readonly POLLING_TOO_FREQUENTLY: "Polling too frequently";
            readonly USER_NOT_FOUND: "User not found";
            readonly FAILED_TO_CREATE_SESSION: "Failed to create session";
            readonly INVALID_DEVICE_CODE_STATUS: "Invalid device code status";
            readonly AUTHENTICATION_REQUIRED: "Authentication required";
        };
    }];
    socialProviders: {
        github: {
            clientId: string;
            clientSecret: string;
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map