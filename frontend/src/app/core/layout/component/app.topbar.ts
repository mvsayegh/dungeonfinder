import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';
import { PrimeNgModule } from '../../../shared/primeng/primeng.module';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, PrimeNgModule],
  template: ` <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" (click)="_layoutService.onMenuToggle()">
        <i class="pi pi-bars"></i>
      </button>
      <a class="layout-topbar-logo" routerLink="/">
        <img src="assets/images/logo.svg" alt="Linker TMS" />
      </a>
    </div>

    <div class="layout-topbar-actions">
      <button
        class="layout-topbar-menu-button layout-topbar-action"
        pStyleClass="#menu"
        enterFromClass="hidden"
        enterActiveClass="animate-scalein"
        leaveToClass="hidden"
        leaveActiveClass="animate-fadeout"
        [hideOnOutsideClick]="true">
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block" id="menu">
        <div *ngIf="saldo" class="layout-topbar-menu-content">
          <ng-container>
            <p-card class="flex-1" styleClass="border border-surface shadow-none">
              <div class="flex justify-between items-center gap-4">
                <span
                  class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center"
                  [style]="{ 'background-color': '#066582', color: '#ffffff' }">
                  <i class="pi pi-dollar"></i>
                </span>
                <div class="flex flex-col justify-center">
                  <span class="text-surface-500 dark:text-surface-400 text-sm">Saldo total</span>
                  <span class="font-bold text-lg">R$ {{ saldo }}</span>
                </div>
              </div>
            </p-card>
          </ng-container>
        </div>
      </div>
    </div>
  </div>`,
  styles: [':host { --p-card-body-padding: 5px 20px; }'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AppTopbar {
  _layoutService = inject(LayoutService);

  items!: MenuItem[];
  saldo: number | null = null;
  toggleDarkMode() {
    this._layoutService.layoutConfig.update(state => ({ ...state, darkTheme: !state.darkTheme }));
  }
}
