export interface Message {
    text: string;
    type: 'sent' | 'received';
    isLink?: boolean;
}

export interface ChatFolder {
    name: string;
    messages: Message[];
}
