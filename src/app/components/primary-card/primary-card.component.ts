import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-card',
  standalone: true,
  imports: [],
  templateUrl: './primary-card.component.html',
  styleUrl: './primary-card.component.scss'
})
export class PrimaryCardComponent {

  @Input() medicamento: any;


}
