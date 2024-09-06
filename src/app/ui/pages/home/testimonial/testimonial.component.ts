import { Component } from '@angular/core';
import { TuiArcChart } from '@taiga-ui/addon-charts';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [TuiArcChart],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
})
export class TestimonialComponent {}
