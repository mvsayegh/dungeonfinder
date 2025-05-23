import { Component } from '@angular/core';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { ProfileService } from '../../core/services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

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
  providers: [MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  loading = false;
  userInfo = null;
  constructor(
    private service: ProfileService,
    private messageService: MessageService
  ) {
    this.service
      .getUser()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: res => {
          this.userInfo = res.response;
        },
        error: (err: HttpErrorResponse) => {
          const msg = err?.message || 'Occurred an unknown error!';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        },
      });
  }
}
