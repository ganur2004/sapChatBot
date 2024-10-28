export interface Message {
    text: string;
    type: 'sent' | 'received';
}

export interface ChatFolder {
    name: string;
    messages: Message[]; 
}
