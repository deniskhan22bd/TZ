import { Injectable } from '@angular/core';
import { Mistral } from '@mistralai/mistralai';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private client: Mistral;
  private model = 'mistral-tiny';
  constructor() {
    this.client = new Mistral({apiKey: environment.aiApiKey});
  }
  async generateStory(character: string, action: string, place: string): Promise<string> {
    try {
      const prompt = `Создай историю об ${character} который хочет ${action} в ${place}. В двух предложениях`;
      
      const chatResponse = await this.client.chat.complete({
        model: this.model,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const content = chatResponse.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('Invalid response content');
      }
      if (typeof content !== 'string') {
        throw new Error('Invalid response content');
      }
      return content;
    } catch (error) {
      console.error('Error generating story:', error);
      throw new Error('Failed to generate story');
    }
  }
}
