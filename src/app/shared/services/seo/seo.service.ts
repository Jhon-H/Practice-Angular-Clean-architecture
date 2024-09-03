import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
