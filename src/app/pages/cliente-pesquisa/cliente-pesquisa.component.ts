import { Component, OnInit } from '@angular/core';
import { DefaultClientePesquisaLayoutComponent } from '../../components/default-cliente-pesquisa-layout/default-cliente-pesquisa-layout.component';
import { PrimaryCardComponent } from '../../components/primary-card/primary-card.component';
import { NgFor, NgIf } from '@angular/common';
import { MedicamentoService } from '../../services/medicamento.service';

@Component({
  selector: 'app-cliente-pesquisa',
  standalone: true,
  imports: [DefaultClientePesquisaLayoutComponent, PrimaryCardComponent, NgFor, NgIf],
  templateUrl: './cliente-pesquisa.component.html',
  styleUrl: './cliente-pesquisa.component.scss'
})
export class ClientePesquisaComponent implements OnInit {
  medicamentos: any[] = [];
  termoPesquisa: string = '';
  medicamentosOriginais: any[] = [];

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void {
    this.medicamentoService.getMedicamentosComUbs().subscribe((data) => {
      this.medicamentosOriginais = data;
      this.medicamentos = data;  // Inicializa a lista de medicamentos
    });
  }

  filtrarMedicamentos(termo: string): void {
    this.termoPesquisa = termo.toLowerCase().trim();

    this.medicamentos = this.medicamentosOriginais.filter(med =>
      med.nome.toLowerCase().includes(this.termoPesquisa)
    );
  }
}
