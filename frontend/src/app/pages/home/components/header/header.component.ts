import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../../shared/primeng/primeng.module';

@Component({
  selector: 'app-header',
  imports: [PrimeNgModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items = [
    { label: 'Início', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Mesas', icon: 'pi pi-table', routerLink: '/mesas' },
    { label: 'Sobre', icon: 'pi pi-info-circle', routerLink: '/sobre' },
  ];
}
