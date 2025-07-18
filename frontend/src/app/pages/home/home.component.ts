import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@components/shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  featuredMasters = [
    {
      id: 1,
      name: 'João Silva',
      avatar: '/assets/images/master1.jpg',
      rating: 4.8,
      specialties: ['D&D 5e', 'Pathfinder'],
      experience: '5 anos',
    },
    {
      id: 2,
      name: 'Maria Santos',
      avatar: '/assets/images/master2.jpg',
      rating: 4.9,
      specialties: ['Call of Cthulhu', 'Vampire'],
      experience: '8 anos',
    },
    {
      id: 3,
      name: 'Pedro Costa',
      avatar: '/assets/images/master3.jpg',
      rating: 4.7,
      specialties: ['Tormenta', 'D&D 3.5'],
      experience: '3 anos',
    },
  ];

  onSearchTables() {
    // Navegar para página de busca
  }

  onBecomeMaster() {
    // Navegar para página de criação de mesa
  }

  onLogin() {
    // Navegar para página de login
  }

  onRegister() {
    // Navegar para página de registro
  }
}
