import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MedicamentoService {
  private http = inject(HttpClient);

  private medicamentosUrl = 'https://usuario-8qd5.onrender.com/usuarios/medicamentos';
  private ubsUrl = 'https://ubs-1nba.onrender.com/ubs';

  getMedicamentosComUbs(): Observable<any[]> {
    return forkJoin({
      medicamentos: this.http.get<any[]>(this.medicamentosUrl),
      ubs: this.http.get<any[]>(this.ubsUrl)
    }).pipe(
      map(({ medicamentos, ubs }) => {
        return medicamentos.map((med) => {
          const ubsInfo = ubs.find(u => u.id === med.ubsId);
          return {
            nome: med.nome,
            descricao: med.informacoes,
            local: ubsInfo?.nome || 'UBS não encontrada',
            endereco: ubsInfo?.endereco || 'Endereço não disponível',
            ativo: med.ativo      // <— inclui o status no objeto
          };
        });
      })
    );
  }
}
