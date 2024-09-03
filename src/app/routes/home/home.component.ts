import { Component, inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { TuiButton, TuiIcon, TuiNotification } from '@taiga-ui/core';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { TuiThumbnailCard } from '@taiga-ui/addon-commerce';
import { Store } from '@ngrx/store';
import { selectUser } from '@/store/user/user.selector';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { LayoutComponent } from '@/shared/ui/components/templates/layout/layout.component';
import { RbacDirective } from '@/shared/ui/directives/rbac.directive';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    NgOptimizedImage,
    TuiIcon,
    TuiButton,
    TuiNotification,
    TestimonialComponent,
    TuiThumbnailCard,
    RbacDirective,
    TranslateModule,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly clipboard = inject(Clipboard);
  private readonly store = inject(Store);

  readonly downloadAppText = 'npm install @fireTodoApp@latest';
  name = this.store.select(selectUser).pipe(map(({ user }) => user?.name));

  copyDownloadApp() {
    this.clipboard.copy(this.downloadAppText);
  }
}
