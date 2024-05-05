import { User } from "./user";

export interface FriendsRequests {
  id: string;
  senderId: string;
  receiverId: string;

  sender?: User;
  receiver?: User;
}
