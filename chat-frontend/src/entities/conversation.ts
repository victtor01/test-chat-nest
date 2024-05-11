import { Message } from "./message";
import { User } from "./user";

export interface Conversation {
  id: string;
  isGroup: boolean;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;

  users?: Partial<User>[]
  messages?: Message[]
}

/* 
 conversations: [
        {
          id: 'a209b997-39c1-4256-9de1-8b8ecdaf281a',
          isGroup: false,
          name: null,
          createdAt: '2024-05-09T02:32:57.692Z',
          updatedAt: '2024-05-09T02:32:57.692Z'
        }
      ],
*/
