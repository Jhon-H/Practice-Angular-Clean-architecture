import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LayoutComponent } from '@/ui/ds/components/templates/layout/layout.component';

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
