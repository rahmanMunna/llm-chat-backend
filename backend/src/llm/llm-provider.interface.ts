export type ChatRole = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface LlmUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
}

export interface LlmResult {
  text: string;
  model: string;
  usage: LlmUsage;
  latencyMs: number;
}

export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
}

export interface LlmProvider {
  chat(messages: ChatMessage[], options?: ChatOptions): Promise<LlmResult>;
}

export const LLM_PROVIDER = Symbol('LLM_PROVIDER');

export class LlmError extends Error {}