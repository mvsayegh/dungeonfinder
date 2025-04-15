import { Component } from '@angular/core';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restrict-access',
  standalone: true,
  imports: [PrimeNgModule, CommonModule, RouterModule],
  templateUrl: './restrict-access.component.html',
  styleUrl: './restrict-access.component.scss',
})
export class RestrictAccessComponent {}
