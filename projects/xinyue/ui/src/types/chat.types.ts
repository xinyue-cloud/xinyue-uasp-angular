import { KuAttachment } from './attachment.types';
import { KuContact }    from './contact.types';

export interface KuUserChat {
  contactId?: string;
  contract?: KuContact;
  muted?: boolean;
  lastMessage?: string;
  lastMessageAt?: Date;
  messages: KuChatMessage[];
}

export interface KuChatMessage {
  messageId?: string;
  contactId?: string;
  isMine?: boolean;
  content?: string;
  createdAt?: Date;
  attachments?: KuAttachment[]
}
