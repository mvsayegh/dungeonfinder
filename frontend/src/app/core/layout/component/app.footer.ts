import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-top">
          <div class="footer-column">
            <h4>SUPORTE</h4>
            <ul>
              <li><a href="#">Portal de Ajuda</a></li>
              <li><a href="#">Fórum de Suporte</a></li>
              <li><a href="#">Informações Pessoais</a></li>
              <li><a href="#">Opções de Privacidade</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>SOBRE</h4>
            <ul>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Sobre Nós</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4>REDES SOCIAIS</h4>
            <div class="social-links">
              <a href="#" aria-label="Instagram"><i class="pi pi-instagram"></i></a>
              <a href="#" aria-label="Twitch"><i class="pi pi-twitch"></i></a>
              <a href="#" aria-label="Facebook"><i class="pi pi-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i class="pi pi-twitter"></i></a>
              <a href="#" aria-label="Youtube"><i class="pi pi-youtube"></i></a>
              <a href="#" aria-label="TikTok"><i class="pi pi-tiktok"></i></a>
            </div>
          </div>

          <div class="footer-column">
            <h4>SEJA UM PARCEIRO</h4>
            <div class="app-links">
              <!-- <a href="#" class="app-store-link">
                <img src="assets/images/google-play-badge.png" alt="Disponível no Google Play" />
              </a>
              <a href="#" class="app-store-link">
                <img src="assets/images/app-store-badge.png" alt="Baixar na App Store" />
              </a> -->
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="copyright">
            Todos os direitos reservados à {{ appName }} &copy; {{ getYear() }}.
            <span class="legal-info"> </span>
          </div>
          <div class="legal-links">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Serviço</a>
          </div>
          <div class="extra-logo"></div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        display: block; /* Garante que o componente ocupe espaço */
        width: 100%;
        margin-top: 40px; /* Aumentei um pouco a margem superior */
        background-color: #1f1f1f; /* Cor de fundo escura similar ao exemplo */
        color: #ccc; /* Cor de texto clara padrão */
        padding: 30px 0;
        font-family: sans-serif; /* Use a fonte do seu projeto */
        line-height: 1.6;
        font-size: 14px;
      }

      .footer-content {
        max-width: 1200px; /* Limita a largura do conteúdo */
        margin: 0 auto; /* Centraliza o conteúdo */
        padding: 0 15px; /* Espaçamento lateral */
      }

      .footer-top {
        display: flex;
        flex-wrap: wrap; /* Permite que as colunas quebrem em telas menores */
        justify-content: space-between;
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 1px solid #444; /* Linha separadora */
      }

      .footer-column {
        flex: 1; /* Tenta dar tamanho igual às colunas */
        min-width: 180px; /* Largura mínima antes de quebrar a linha */
        margin: 10px 15px; /* Espaçamento entre colunas */
      }

      .footer-column h4 {
        color: #fff; /* Títulos em branco */
        margin-bottom: 15px;
        font-size: 0.9em;
        text-transform: uppercase;
        font-weight: bold;
      }

      .footer-column ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-column ul li {
        margin-bottom: 10px;
      }

      .footer-column ul li a,
      .legal-links a {
        color: #aaa; /* Cor dos links */
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .footer-column ul li a:hover,
      .legal-links a:hover {
        color: #fff; /* Cor do link ao passar o mouse */
        text-decoration: underline;
      }

      .social-links a {
        color: #aaa;
        margin-right: 12px;
        font-size: 1.5em; /* Tamanho dos ícones */
        transition: color 0.3s ease;
      }
      .social-links a:hover {
        color: #fff;
      }
      .social-links a:last-child {
        margin-right: 0;
      }
      /* Se estiver usando PrimeIcons (exemplo) */
      .social-links .pi {
        vertical-align: middle;
      }

      .app-links .app-store-link img {
        height: 40px; /* Ajuste a altura conforme necessário */
        margin-bottom: 10px;
        display: block; /* Para que a margem funcione corretamente */
      }

      .footer-bottom {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        font-size: 0.85em;
        color: #aaa;
      }

      .copyright {
        margin-right: 20px;
        margin-bottom: 10px; /* Espaçamento quando quebrar linha */
        flex-grow: 1; /* Ocupa espaço disponível */
      }
      .copyright .legal-info {
        display: block; /* Informação legal extra em nova linha */
        margin-top: 5px;
        font-size: 0.9em;
        color: #888;
      }

      .legal-links a {
        margin-left: 15px;
      }
      .legal-links a:first-child {
        margin-left: 0;
      }

      .extra-logo img {
        height: 40px; /* Ajuste conforme necessário */
        margin-left: 20px;
        opacity: 0.7;
      }

      /* Media Query para telas menores (ex: celulares) */
      @media (max-width: 768px) {
        .footer-top {
          flex-direction: column; /* Empilha as colunas */
          align-items: flex-start; /* Alinha à esquerda */
          border-bottom: none; /* Remove a borda entre top e bottom */
        }
        .footer-column {
          min-width: 100%; /* Colunas ocupam largura total */
          margin: 15px 0; /* Ajusta margem vertical */
          padding-bottom: 15px;
          border-bottom: 1px solid #444; /* Adiciona borda entre colunas empilhadas */
        }
        .footer-column:last-child {
          border-bottom: none; /* Remove borda da última coluna */
          padding-bottom: 0;
        }

        .footer-bottom {
          flex-direction: column;
          align-items: center; /* Centraliza no mobile */
          text-align: center;
          margin-top: 20px; /* Espaço extra depois das colunas */
        }
        .copyright {
          margin-right: 0;
          margin-bottom: 15px;
        }
        .legal-links {
          margin-bottom: 15px;
        }
        .legal-links a {
          margin: 0 8px;
        }
        .extra-logo {
          margin-left: 0; /* Remove margem do logo */
          margin-top: 10px;
        }
      }
    `,
  ],
})
export class AppFooter {
  appName = environment.appInfo.name;

  getYear() {
    const year = new Date().getFullYear();
    return year;
  }
}
