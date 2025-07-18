import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AltTextDirective } from '@core/directives';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [ImageModule, AltTextDirective],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  imageSrc = input.required<string>();
  width = input.required<string>();
  height = input.required<string>();
  preview = input<boolean>(false);
  imageAlt = input<string>('');
  previewIndicatorIcon = input<string>('pi pi-image');
}
