import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../primeng/primeng.module';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [PrimeNgModule],
  template: `
    <div class="loading-overlay">
      <div class="flex flex-col items-center justify-center min-h-screen">
        <div *ngIf="loading" class="dice-container" [ngStyle]="{ color: currentColor }">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 9l11 13 11-13-11-7zm0 2.2L20.2 9 12 20.3 3.8 9 12 4.2zM12 6l-6 3.5 6 8.5 6-8.5L12 6z" />
          </svg>
        </div>
        <div *ngIf="loading" class="progress-bar" [ngStyle]="{ width: progress + '%', backgroundColor: currentColor }"></div>
        <p [ngStyle]="{ color: currentColor }" class="mt-4 text-lg font-mono">{{ loadingText }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .dice-container {
        animation: spin 2s linear infinite;
        margin-bottom: 20px;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .progress-bar {
        height: 10px;
        margin-top: 20px;
        border-radius: 5px;
        transition:
          width 0.5s ease-in-out,
          background-color 0.5s ease-in-out;
      }

      p {
        animation: flicker 1s infinite alternate;
      }

      @keyframes flicker {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
        100% {
          opacity: 1;
        }
      }
    `,
  ],
})
export class RpgLoadingComponent implements OnInit {
  loading = true;
  loadingText = 'Recuperando vida...';
  progress = 0;
  currentColor = '#ff0000';

  private loadingMessages = [
    { text: 'Recuperando vida...', color: '#ff0000' }, // Vermelho
    { text: 'Recuperando mana...', color: '#0000ff' }, // Azul
    { text: 'Carregando aventura...', color: '#ffa500' }, // Laranja
    { text: 'Descansado com sucesso...', color: '#32cd32' }, // Verde
    { text: 'Invocando aliados...', color: '#8a2be2' }, // Roxo
    { text: 'Preparando o terreno para a batalha...', color: '#f4a300' }, // Amarelo-escuro
    { text: 'Atravessando os portais...', color: '#8b0000' }, // Vermelho escuro
    { text: 'Aventura iniciada...', color: '#00fa9a' }, // Verde-água
  ];

  ngOnInit(): void {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter < this.loadingMessages.length) {
        const current = this.loadingMessages[counter];
        this.loadingText = current.text;
        this.currentColor = current.color;
        this.progress = (counter + 1) * (100 / this.loadingMessages.length);
        counter++;
      } else {
        clearInterval(interval);
        this.loading = false;
      }
    }, 2000);
  }
}
