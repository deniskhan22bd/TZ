import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Random history';
  characters = ['принцесса', 'пират', 'супергерой'];
  actions = ['спасать мир', 'искать сокровища', 'сражаться с драконом']; 
  places = ['в волшебном лесу', 'на острове', 'в древнем замке'];
  generatedStory = '';
  selectedCharacter = '';
  selectedAction = '';
  selectedPlace = '';

  constructor(private apiService: ApiService) {}

  async generateStory(): Promise<void> {
    if (this.selectedCharacter && this.selectedAction && this.selectedPlace) {
      try {
        this.generatedStory = await this.apiService.generateStory(
          this.selectedCharacter,
          this.selectedAction,
          this.selectedPlace
        );
      } catch (error) {
        console.error('Error:', error);
        this.generatedStory = 'Извините, произошла ошибка при генерации истории.';
      }
    }
  }

  async regenerateStory(): Promise<void> {
    await this.generateStory(); // Используем существующий метод для генерации новой истории
  }
}
