import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import type { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

export const titleResolver: ResolveFn<string> = () => {
  const titleService = inject(Title);
  const title = 'Dungeon Finder';

  titleService.setTitle(title);
  return of(title);
};
