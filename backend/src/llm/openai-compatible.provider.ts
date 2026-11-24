import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  LlmError,
  type ChatMessage,
  type ChatOptions,
  type LlmProvider,
  type LlmResult,
} from './llm-provider.interface.js';


/** What an OpenAI-compatible API sends back. Only the fields we use. */
interface OpenAiChatResponse {
  model?: string;
  choices?: { message?: { content?: string | null } }[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
}

@Injectable()
export class OpenAiCompatibleProvider implements LlmProvider {
  private readonly logger = new Logger(OpenAiCompatibleProvider.name);

  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly models: string[];
  private readonly timeoutMs: number;

  constructor(config: ConfigService) {
    this.baseUrl = config
      .get<string>('LLM_BASE_URL', 'https://openrouter.ai/api/v1')
      .replace(/\/+$/, '');

    this.apiKey = config.get<string>('LLM_API_KEY', '');

    this.models = config
      .get<string>('LLM_MODELS', '')
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    this.timeoutMs = Number(config.get('LLM_TIMEOUT_MS', 60000));
  }
    chat(messages: ChatMessage[], options?: ChatOptions): Promise<LlmResult> {
        throw new Error('Method not implemented.');
    }
}