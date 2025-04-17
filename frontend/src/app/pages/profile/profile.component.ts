import { Component } from '@angular/core';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';

interface ExperienceLevel {
  label: string;
  value: string;
}

interface SystemOption {
  label: string;
  value: string;
}

interface DayOfWeek {
  label: string;
  value: string;
}

interface User {
  name: string;
  email: string;
  experienceLevel: ExperienceLevel | null;
  preferredSystems: string[];
  availability: {
    timeOfDay: Date | null;
    days: string[] | null;
  };
  profilePicture: string | null;
  bio: string;
  location: string;
  contactInfo: {
    discord: string;
    email: string;
    phone: string;
  };
}

@Component({
  selector: 'app-profile',
  imports: [PrimeNgModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
