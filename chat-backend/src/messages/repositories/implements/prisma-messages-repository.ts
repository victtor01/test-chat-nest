import { Message } from "src/messages/entitites/message.entity"
import { MessagesRepository } from "../messages-repository"
import { Injectable } from "@nestjs/common"

@Injectable()
export default class PrismaMessagesRepository implements MessagesRepository {
    store(): Promise<Message> {
        return
    }
}