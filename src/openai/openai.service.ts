import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAIApi from 'openai';
import { ChatCompletion } from 'openai/resources';

// Define a type for message objects
type Message = {
  text: string;
  ai?: boolean; // Indicate if the message is from the AI
};

@Injectable()
export class OpenAIService {
  public openai: OpenAIApi;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAIApi({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }
  async chatGptRequest(prompt: string, messages: Message[]): Promise<string> {
    try {
      // Convert message history to the format expected by the OpenAI API
      const history: any = messages.map((message) => ({
        role: message.ai ? 'assistant' : 'user',
        content: message.text,
      }));

      // Make a request to the ChatGPT model
      const completion: ChatCompletion =
        await this.openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: prompt,
            },
            ...history,
          ],
          temperature: 0.5,
          max_tokens: 1000,
        });

      // Extract the content from the response
      const [content] = completion.choices.map(
        (choice) => choice.message.content,
      );

      return content;
    } catch (e) {
      // Log and propagate the error
      console.error(e);
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }
}
