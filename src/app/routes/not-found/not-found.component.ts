import { Component } from '@angular/core';
import { LayoutComponent } from '@/shared/ui/components/templates/layout/layout.component';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LayoutComponent, TuiIcon],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
