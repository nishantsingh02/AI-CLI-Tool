export declare class AIService {
    private model;
    constructor();
    sendMessage(messages: any, onchunk: any, tools?: undefined, onToolCall?: null): Promise<{
        content: string;
        finishResponse: Promise<import("@ai-sdk/provider").LanguageModelV2FinishReason>;
        usgae: Promise<import("@ai-sdk/provider").LanguageModelV2Usage>;
    }>;
    getMessage(messages: any, tools?: undefined): Promise<string>;
}
//# sourceMappingURL=google-service.d.ts.map