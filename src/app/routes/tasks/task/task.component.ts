import { LayoutComponent } from '@/shared/ui/components/templates/layout/layout.component';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [AsyncPipe, LayoutComponent],
  templateUrl: './task.component.html',
  styles: '',
})
export class TaskComponent {
  private readonly activatedRoute = inject(ActivatedRoute);

  taskId = this.activatedRoute.params.pipe(map(params => params['taskId']));
}
