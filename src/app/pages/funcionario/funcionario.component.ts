import { Component } from '@angular/core';
import { DefaultClientePesquisaLayoutComponent } from '../../components/default-cliente-pesquisa-layout/default-cliente-pesquisa-layout.component';
import { RouterModule } from '@angular/router';
import { SecondCardComponent } from '../../components/second-card/second-card.component';
import { PrimaryCardComponent } from '../../components/primary-card/primary-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [DefaultClientePesquisaLayoutComponent, RouterModule, SecondCardComponent, NgFor, NgIf],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss'
})
export class FuncionarioComponent {

  medicamentos = [
    // {
    //   id: 1,
    //   nome: 'Desogestrel',
    //   descricao: '0,075mg 28 comprimidos revestidos',
    //   ativo: true
    // },

    // {
    //   id: 2,
    //   nome: 'Dipirona',
    //   descricao: '0,075mg 28 comprimidos revestidos',
    //   ativo: true
    // }
  ];

}
