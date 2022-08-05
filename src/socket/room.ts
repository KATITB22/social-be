import {Chat} from '../models';
import chatServices from '../services/chat.services';

class Room {
  roomId: string;
  topicId: string;
  users: string[];
  checkReveal: object;
  isRevealed: boolean;
  chat: Chat;

  constructor(roomId: string, topicId: string) {
    this.roomId = roomId;
    this.isRevealed = false;
    this.users = [];
    this.checkReveal = {};
    this.chat = null;
    this.topicId = topicId;
  }

  setUser(user: string) {
    this.users.push(user);
    this.checkReveal[user] = false;
  }

  async setChat() {
    if (this.users.length < 2) throw Error('Add user first!');

    try {
      const result = await chatServices.createChat({
        chat_id: this.roomId,
        topic_id: this.topicId,
        user_id1: this.users[0],
        user_id2: this.users[1],
      });

      this.chat = result;
    } catch (error) {
      console.error(error);
    }
  }

  async createMessage(sender_id: string, message: string) {
    if (!this.users.includes(sender_id))
      throw Error(`User ${sender_id} not found in chat room`);

    return await chatServices.createMessage({
      chat_id: this.roomId,
      sender_id,
      message,
    });
  }

  requestReveal(user: string) {
    this.checkReveal[user] = true;
  }

  canRevealName() {
    let shouldReveal = false;
    if (
      Object.keys(this.checkReveal).length === 2 &&
      Object.values(this.checkReveal).every(val => val === true) &&
      !this.isRevealed
    ) {
      shouldReveal = true;
      this.isRevealed = true;
    }
    return shouldReveal;
  }
}

export default Room;
