import prisma from "../lib/db.js";

export class ChatService {
    async createConversation(userId: string, mode="chat", title=null) {
        return prisma.conversation.create({
            data: {
                userId,
                mode,
                title: title || `New ${mode} conversation`
            }
        })
    }

    async getOrCreateConversation(userId: string, conversationId=null,  mode="chat") {
        // if conversationId is not null
        if(conversationId) {
            const conversation = await prisma.conversation.findFirst({
                where: {
                    id: conversationId,
                    userId
                },
                include: {
                    messages:
                }
            })
        }
    }
}
