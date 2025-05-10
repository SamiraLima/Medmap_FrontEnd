import { Component } from '@angular/core';
import { DefaultClientePesquisaLayoutComponent } from '../../components/default-cliente-pesquisa-layout/default-cliente-pesquisa-layout.component';
import { PrimaryCardComponent } from '../../components/primary-card/primary-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cliente-pesquisa',
  standalone: true,
  imports: [DefaultClientePesquisaLayoutComponent, PrimaryCardComponent, NgFor, NgIf],
  templateUrl: './cliente-pesquisa.component.html',
  styleUrl: './cliente-pesquisa.component.scss'
})
export class ClientePesquisaComponent {

  medicamentos = [
    // {
    //   nome: 'Captoril',
    //   descricao: 'Captoril 50,0 mg',
    //   local: 'Posto da Fé',
    //   endereco: 'R. Dr. Benedito Matarazzo, 371, Parque Maria Helena, SP, 05854-090'
    // }

  ];

}
