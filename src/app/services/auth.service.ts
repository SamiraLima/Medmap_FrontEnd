import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface CadastroRequest {
  nome: string;
  cnes: string;
  endereco: string;
  senha: string;
}

export interface CadastroResponse {
  id: number;
  nome: string;
  cnes: string;
  endereco: string;
}

export interface LoginRequest {
  cnes: string;
  password: string;
}

export interface Medicamento {
  id: number;
  nome: string;
  informacoes: string;
  imagemUrl?: string | null;
  ativo: boolean;
  ubsId?: number;
}

export interface RegistroMedicamentoRequest {
  nome: string;
  informacoes: string;
  ativo: boolean;
}

export interface RegistroMedicamentoResponse {
  id: number;
  nome: string;
  informacoes: string;
  imagemUrl: string | null;
  ativo: boolean;
  ubsId: number;
}

export interface EditarMedicamentoRequest {
  nome: string;
  informacoes: string;
  ubsId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8081/auth/login';
  private medicamentosUrl = 'http://localhost:8083/ubs';
  private registroUrl = 'http://localhost:8080/medicamento';
  private token: string | null = null;
  private cnes: string | null = null;
  private ubsId: number | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('authToken');
    this.cnes = localStorage.getItem('cnes');
    const storedUbsId = localStorage.getItem('ubsId');
    this.ubsId = storedUbsId ? parseInt(storedUbsId, 10) : null;
  }

  getMedicamentoPorId(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.registroUrl}/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  editarMedicamento(id: number, dados: EditarMedicamentoRequest): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.registroUrl}/${id}`, dados, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  atualizarMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    const url = `${this.registroUrl}/${medicamento.id}`;
    return this.http.put<Medicamento>(url, medicamento, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  registrarMedicamento(dados: RegistroMedicamentoRequest): Observable<RegistroMedicamentoResponse> {
    return this.http.post<RegistroMedicamentoResponse>(this.registroUrl, dados, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  login(dados: LoginRequest): Observable<string> {
    const url = `${this.loginUrl}?cnes=${dados.cnes}&password=${dados.password}`;
    return this.http.post(url, {}, { responseType: 'text' }).pipe(
      tap((token: string) => {
        this.token = token;
        this.cnes = dados.cnes;
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.ubsId = payload.ubsId;
        localStorage.setItem('authToken', token);
        localStorage.setItem('cnes', dados.cnes);
        if (this.ubsId !== null) {
          localStorage.setItem('ubsId', this.ubsId.toString());
        }
      })
    );
  }

  getMedicamentos(cnes: string): Observable<Medicamento[]> {
    const url = `${this.medicamentosUrl}/${cnes}/medicamentos`;
    return this.http.get<Medicamento[]>(url, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  deletarMedicamento(id: number): Observable<void> {
    const url = `${this.registroUrl}/${id}`;
    return this.http.delete<void>(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getCnes(): string | null {
    return this.cnes;
  }

  getUbsId(): number | null {
    return this.ubsId;
  }

  logout(): void {
    this.token = null;
    this.cnes = null;
    this.ubsId = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('cnes');
    localStorage.removeItem('ubsId');
  }

  cadastrar(dados: CadastroRequest): Observable<CadastroResponse> {
    return this.http.post<CadastroResponse>('http://localhost:8083/ubs', dados, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}