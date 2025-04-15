import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterModule, PrimeNgModule],
  template: `
    <div class="notfound-container">
      <div class="notfound-card">
        <span class="notfound-code">404</span>
        <h1 class="notfound-title">Página não encontrada</h1>
        <p class="notfound-text">A página que você procura pode ter sido removida ou não existe.</p>
        <p-button label="Voltar para Home" routerLink="/" aria-label="Voltar para a página inicial" />
      </div>
    </div>
  `,
  styles: [
    `
      .notfound-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: var(--surface-ground);
      }

      .notfound-card {
        text-align: center;
        background: var(--surface-0);
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .notfound-code {
        font-size: 3rem;
        font-weight: bold;
        color: var(--primary-color);
      }

      .notfound-title {
        font-size: 2rem;
        color: var(--surface-900);
        margin: 1rem 0;
      }

      .notfound-text {
        color: var(--surface-600);
        margin-bottom: 1.5rem;
      }
    `,
  ],
})
export class Notfound {}
