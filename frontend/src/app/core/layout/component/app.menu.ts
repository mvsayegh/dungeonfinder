import { CommonModule } from '@angular/common';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { Router, RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [CommonModule, AppMenuitem, RouterModule, PrimeNgModule],
  template: `
    <div class="layout-menu-container flex flex-col h-full">
      <ul class="layout-menu flex-1 overflow-y-auto">
        <ng-container *ngFor="let item of model; let i = index">
          <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
          <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
      </ul>

      <div class="menu-footer p-4 mt-auto">
        <!-- <p-confirmpopup /> -->
        <!-- <p-button label="Sair" *ngIf="logged_user" icon="pi pi-sign-out" class="w-full" [fluid]="true" (onClick)="confirm($event)"></p-button>
        <p-button label="Acessar" *ngIf="!logged_user" icon="pi pi-sign-in" class="w-full" [fluid]="true" [routerLink]="['/signin']"></p-button> -->
      </div>
    </div>
  `,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AppMenu implements OnInit {
  _confirmationService = inject(ConfirmationService);
  _router = inject(Router);
  _toast = inject(MessageService);

  isLoading = false;
  model: MenuItem[] = [];

  async ngOnInit() {
    this.model = [
      {
        items: [{ label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }],
      },
      // {
      //   items: [
      //     {
      //       label: 'Financeiro',
      //       icon: 'pi pi-fw pi-wallet',
      //       items: [
      //         { label: 'Carteira', routerLink: ['/account/wallet'] },
      //         { label: 'Extrato', routerLink: ['/account/extract'] },
      //         { label: 'Plano', routerLink: ['/account/plan'] },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   items: [
      //     {
      //       label: 'Configuração',
      //       icon: 'pi pi-fw pi-cog',
      //       items: [
      //         { label: 'Meu Perfil', routerLink: ['/account/profile'] },
      //         { label: 'Dados Transportadora', routerLink: ['/account/parameter'] },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   items: [
      //     {
      //       label: 'Suporte',
      //       icon: 'pi pi-fw pi-question',
      //       items: [
      //         { label: 'F.A.Q', routerLink: ['/account/faq'] },
      //         { label: 'Tabela de Preços', routerLink: ['/account/plans'] },
      //         { label: 'Termos de Serviço', routerLink: ['/account/terms'] },
      //       ],
      //     },
      //   ],
      // },
    ];
  }

  logout() {
    console.log('logout');
  }
}
