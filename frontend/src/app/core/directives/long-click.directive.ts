import { Directive, HostListener, input, output } from '@angular/core';

@Directive({
  selector: '[longClick]',
  standalone: true,
})
export class LongClickDirective {
  longClickDuration = input<number>(500);
  onLongClick = output<void>();

  private timeoutId: number | null = null;
  private isLongClick = false;

  @HostListener('mousedown')
  onMouseDown(): void {
    this.timeoutId = setTimeout(() => {
      this.isLongClick = true;
      this.onLongClick.emit();
    }, this.longClickDuration());
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.clearTimeout();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.clearTimeout();
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.isLongClick = false;
    }
  }
}
