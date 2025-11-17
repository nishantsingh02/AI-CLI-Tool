export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth/adapters/prisma").DBAdapter<import("better-auth").BetterAuthOptions>;
    basePath: string;
    trustedOrigins: string[];
    socialProviders: {
        github: {
            clientId: string;
            clientSecret: string;
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map