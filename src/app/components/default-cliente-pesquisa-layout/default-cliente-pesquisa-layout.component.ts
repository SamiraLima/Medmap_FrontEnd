import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-default-cliente-pesquisa-layout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './default-cliente-pesquisa-layout.component.html',
  styleUrl: './default-cliente-pesquisa-layout.component.scss'
})
export class DefaultClientePesquisaLayoutComponent {
  @Input() titulo: string = "";
  @Input() subtitulo: string = "";

  termoBusca: string = '';

  @Output() buscar = new EventEmitter<string>();

  onBuscar(): void {
    this.buscar.emit(this.termoBusca);
  }
}