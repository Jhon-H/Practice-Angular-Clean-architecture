import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { COMPLETE_ROUTES } from '@/ui/helpers/constants/routes';
import { LayoutComponent } from '@/ui/ds/components/templates/layout/layout.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [LayoutComponent, RouterLink, JsonPipe],
  templateUrl: './tasks.component.html',
  styles: '',
})
export class TasksComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly cards = [
    { title: 'Card 1', id: 'card-1' },
    { title: 'Card 2', id: 'card-2' },
  ];

  tasks = [];

  constructor() {
    this.activatedRoute.data.subscribe(routeData => {
      this.tasks = routeData['tasks'];
    });
  }

  getCardTo(id: string): string {
    return `${COMPLETE_ROUTES.Tasks}/${id}`;
  }
}
