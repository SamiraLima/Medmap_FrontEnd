import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-default-cliente-pesquisa-layout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './default-cliente-pesquisa-layout.component.html',
  styleUrl: './default-cliente-pesquisa-layout.component.scss'
})
export class DefaultClientePesquisaLayoutComponent {

  termoBusca: string = '';
  @Input() titulo: string = "";
  @Input() subtitulo: string = "";

}
