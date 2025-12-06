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

    async getOrCreateConversation(userId. ) {

    }
}
