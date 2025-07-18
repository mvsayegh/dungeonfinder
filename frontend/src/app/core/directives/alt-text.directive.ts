import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[altText]',
  standalone: true,
})
export class AltTextDirective implements OnInit {
  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  altText = input<string>('Image');
  errorText = input<string>('Image not found');

  ngOnInit(): void {
    this.addAltText();
  }

  private addAltText(): void {
    const alt = this._elementRef.nativeElement.getAttribute('alt');

    if (!alt || alt.trim() === '') {
      this._renderer.setAttribute(
        this._elementRef.nativeElement,
        'alt',
        this.altText(),
      );
    }
  }

  @HostListener('error')
  onError(): void {
    this._renderer.setAttribute(
      this._elementRef.nativeElement,
      'alt',
      this.errorText(),
    );
  }
}
