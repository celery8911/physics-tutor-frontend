export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: Date;
}

export interface PhysicsAnswer {
  answer: string;
  concepts: string[];
  explanation: string;
}
