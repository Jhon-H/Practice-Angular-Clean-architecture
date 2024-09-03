import { Component, inject } from '@angular/core';
import { COMPLETE_ROUTES } from '@/shared/domain/routes';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { LayoutComponent } from '@/shared/ui/components/templates/layout/layout.component';

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
