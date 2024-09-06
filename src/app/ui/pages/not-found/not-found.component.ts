import { Component } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { LayoutComponent } from '@/ui/ds/components/templates/layout/layout.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LayoutComponent, TuiIcon],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
