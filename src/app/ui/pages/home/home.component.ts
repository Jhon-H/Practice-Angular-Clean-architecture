import { Component, inject } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { TuiButton, TuiIcon, TuiNotification } from '@taiga-ui/core';
import { TuiThumbnailCard } from '@taiga-ui/addon-commerce';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { LayoutComponent } from '@/ui/ds/components/templates/layout/layout.component';
import { RbacDirective } from '@/ui/directives/rbac.directive';
import { selectUser } from '@/ui/store/user/user.selector';

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
