import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default-registro-medicamento-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './default-registro-medicamento-layout.component.html',
  styleUrl: './default-registro-medicamento-layout.component.scss'
})
export class DefaultRegistroMedicamentoLayoutComponent {
  @Input() titulo: string = "";
  @Input() btnTexto: string = "";
  @Input() aLink: string = "";

}
