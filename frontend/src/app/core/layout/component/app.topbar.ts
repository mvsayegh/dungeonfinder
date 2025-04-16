import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, PrimeNgModule],
  template: ` <div class="layout-topbar bg-gray-900 text-white shadow-md px-4 py-2">
    <div class="layout-topbar-logo-container flex items-center">
      <a class="layout-topbar-logo text-xl font-semibold text-white hover:text-gray-300" routerLink="/"> Dungeon Finder </a>
    </div>

    <div class="layout-topbar-actions flex items-center ml-auto">
      <p-button>Cadastrar mesa</p-button>
      <p-button>Quero mestrar</p-button>
      <div class="relative ml-3">
        <button
          (click)="userMenu.toggle($event)"
          type="button"
          class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          aria-expanded="false"
          aria-haspopup="true">
          <span class="sr-only">Abrir menu do usuário</span>
          <p-avatar
            image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
            shape="circle"
            size="large"
            styleClass="cursor-pointer border-2 border-transparent hover:border-primary-500 transition-colors duration-200">
          </p-avatar>
        </button>

        <p-menu #userMenu [model]="userMenuItems" [popup]="true" appendTo="body" styleClass="dark-menu-popup"> </p-menu>
      </div>
    </div>
  </div>`,
  styles: [':host { --p-card-body-padding: 5px 20px; }'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AppTopbar implements OnInit {
  _layoutService = inject(LayoutService);

  items!: MenuItem[];
  userMenuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.userMenuItems = this.defineUserMenu();
  }

  defineUserMenu(): MenuItem[] {
    return [
      {
        label: 'Meu Perfil',
        icon: 'pi pi-fw pi-user',
        command: () => {
          console.log('Ir para Perfil');
          // Ex: this.router.navigate(['/user/profile']);
        },
      },
      {
        label: 'Minhas Mesas',
        icon: 'pi pi-fw pi-table', // Exemplo de ícone
        command: () => {
          console.log('Ir para Minhas Mesas');
          // Ex: this.router.navigate(['/user/tables']);
        },
      },
      {
        label: 'Configurações',
        icon: 'pi pi-fw pi-cog',
        command: () => {
          console.log('Ir para Configurações');
          // Ex: this.router.navigate(['/user/settings']);
        },
      },
      {
        separator: true, // Linha separadora
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          console.log('Ir para Configurações');
          // Ex: this.router.navigate(['/user/settings']);
        },
      },
    ];
  }
}
