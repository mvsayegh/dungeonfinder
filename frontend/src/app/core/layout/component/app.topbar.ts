/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';
import { StorageService } from '../../../core/authentication/storage.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [RouterModule, CommonModule, PrimeNgModule],
  template: `
    <div class="layout-topbar bg-gray-900 text-white shadow-md px-4 py-2">
      <div class="layout-topbar-logo-container flex items-center">
        <a class="layout-topbar-logo text-xl font-semibold text-white hover:text-gray-300" routerLink="/"> Dungeon Finder </a>
      </div>

      <div class="layout-topbar-actions flex items-center ml-auto">
        <div class="relative ml-3" *ngIf="isLoggedIn; else notLoggedIn">
          <button (click)="userMenu.toggle($event)" type="button" class="flex items-center text-sm rounded-full" aria-haspopup="true">
            <span class="sr-only">Abrir menu do usuário</span>
            <p-avatar
              [image]="userAvatar"
              shape="circle"
              size="large"
              styleClass="cursor-pointer border-2 border-transparent hover:border-primary-500 transition-colors duration-200">
            </p-avatar>
          </button>
          <p-menu #userMenu [model]="userMenuItems" [popup]="true" appendTo="body" styleClass="dark-menu-popup"> </p-menu>
        </div>

        <ng-template #notLoggedIn>
          <button (click)="userMenu.toggle($event)" type="button" class="text-white hover:text-primary-400">
            <i class="pi pi-bars text-xl"></i>
          </button>
          <p-menu #userMenu [model]="userMenuItems" [popup]="true" appendTo="body" styleClass="dark-menu-popup"> </p-menu>
        </ng-template>
      </div>
    </div>
    <p-toast></p-toast>
  `,
  styles: [':host { --p-card-body-padding: 5px 20px; }'],
})
export class AppTopbar implements OnInit {
  private _confirmationService = inject(ConfirmationService);
  private _toast = inject(MessageService);
  private storageService = inject(StorageService);
  private router = inject(Router);

  isLoggedIn = false;
  user: any = null;
  userMenuItems: MenuItem[] = [];

  get userAvatar(): string {
    return this.user?.profilePicture ? this.user.profilePicture : 'https://ui-avatars.com/api/?name=?&background=777&color=fff';
  }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.isLoggedIn = !!this.user;
    this.userMenuItems = this.defineUserMenu();
  }

  defineUserMenu(): MenuItem[] {
    if (this.isLoggedIn) {
      return [
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          command: () => this.navigate('/profile'),
        },
        {
          label: 'My Tables',
          icon: 'pi pi-fw pi-table',
          disabled: true,
          command: () => this.navigate('/tables'),
        },
        {
          label: 'Configurations',
          icon: 'pi pi-fw pi-cog',
          disabled: true,
          command: () => this.navigate('/settings'),
        },
        { separator: true },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          command: event => this.confirm(event.originalEvent),
        },
      ];
    } else {
      return [
        {
          label: 'Login',
          icon: 'pi pi-fw pi-sign-in',
          command: () => this.navigate('/signin'),
        },
        {
          label: 'Create Account',
          icon: 'pi pi-fw pi-user-plus',
          command: () => this.navigate('/signup'),
        },
      ];
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  confirm(event?: Event) {
    if (!event || !event.target) {
      this.logout();
      return;
    }

    this._confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Confirmar',
      message: 'Você tem certeza que deseja sair?',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sair',
      },
      accept: () => {
        this._toast.add({ severity: 'info', summary: 'Deslogado', detail: 'Deslogado com sucesso!', life: 3000 });
        this.logout();
      },
    });
  }

  logout(): void {
    this.storageService.removeToken();
    localStorage.removeItem('user');

    this.user = null;
    this.isLoggedIn = false;
    this.userMenuItems = this.defineUserMenu(); // atualiza o menu

    this.router.navigate(['/']);
  }
}
