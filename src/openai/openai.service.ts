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

  async chatGptRequest(
    prompt: string,
    messages: Message[],
    createTitle = false,
  ): Promise<string> {
    try {
      // Convert message history to the format expected by the OpenAI API
      const history: any = messages?.map((message) => ({
        role: message?.ai ? 'assistant' : 'user',
        content: message?.text,
      }));

      // Make a request to the ChatGPT model
      const completion: ChatCompletion =
        await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            ...history,
            {
              role: 'user',
              content: createTitle
                ? prompt
                : `Please response abount prompt of user: '${prompt}'. Notice format your response as html, without head, title, or body tags and must respond in the same language as the user's prompt`,
            },
          ],
          temperature: 0.8,
          max_tokens: 3000,
          //Please format your answer as html, without head, title, or body tags
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

  async generateImage(text: string, size: any): Promise<string> {
    try {
      // Make a request to the DALL-E model for image generation
      const { data } = await this.openai.images.generate({
        model: 'dall-e-2',
        prompt: text,
        response_format: 'url',
        size: size || '1024x1024',
      });

      // Return the URL of the generated image
      return data[0].url;
    } catch (e) {
      // Log and propagate the error
      console.error(e);
      throw new ServiceUnavailableException('Failed to generate image');
    }
  }
}
