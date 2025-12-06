import { string } from "zod";
import prisma from "../lib/db.js";

export class ChatService {
  async createConversation(userId: string, mode = "chat", title = null) {
    return prisma.conversation.create({
      data: {
        userId,
        mode,
        title: title || `New ${mode} conversation`,
      },
    });
  }

  async getOrCreateConversation(
    userId: string,
    conversationId = null,
    mode = "chat"
  ) {
    // if conversationId is not null
    if (conversationId) {
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      if (conversation) {
        return conversation;
      }

      return await this.createConversation(userId, mode);
    }
  }

  async addMessage(conversationId: string, role: string, content: string) {
    // convert content into a json string if its an object
    const contentStr =
      typeof content === "string" ? content : JSON.stringify(content);

    return await prisma.message.create({
      data: {
        conversationId,
        role,
        content: contentStr,
      },
    });
  }

  // function to just parse The content
  parseContent(content: string) {
    try {
      return JSON.parse(content);
    } catch (error) {
      return content;
    }
  }

  async getMessage(conversationId: string) {
    // array of messages
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    return messages.map((msg) => ({
      ...msg,
      content: this.parseContent(msg.content),
    }));
  }

  async getUserConversation(userId: string) {
    return await prisma.conversation.findMany({
      where: {
        userId,
      },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  async deleteConversation(conversationId: string, userId: string) {
    return await prisma.conversation.deleteMany({
        where: {
            id: conversationId,
            userId
        }
    })
  }

  async updateTitle(conversationId: string, title: string) {
    return await prisma.conversation.update({
        where: {id: conversationId},
        data: { title }
    })
  }

  formatingMessageForAI(messages: []) {
    return messages
  }

}
