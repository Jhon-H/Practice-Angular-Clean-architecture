import { SeoService } from '@/core/providers/seo/seo.service';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../organisms/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent],

  templateUrl: './layout.component.html',
  styles: '',
})
export class LayoutComponent {
  private readonly seoService = inject(SeoService);
  private readonly activatedRoute = inject(ActivatedRoute);

  showLoginButton = input<boolean>(true);

  constructor() {
    this.activatedRoute.title.subscribe(title => {
      this.seoService.setTitle(title ?? 'mYApp');
    });
  }
}
