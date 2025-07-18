import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpinnerService } from '@core/services';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinner],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  private readonly _spinnerService = inject(SpinnerService);

  loading = this._spinnerService.isLoading();
}
