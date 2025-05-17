import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FuncionarioComponent } from './funcionario.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('FuncionarioComponent', () => {
  let component: FuncionarioComponent;
  let fixture: ComponentFixture<FuncionarioComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getCnes', 'getMedicamentos', 'logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FuncionarioComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionarioComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ADIÇÃO: Teste para erro 404
  it('should set medicamentos to empty array on 404 error', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getCnes.and.returnValue('1234567');
    authService.getMedicamentos.and.returnValue(throwError(() => new HttpErrorResponse({ status: 404, error: 'Nenhum medicamento encontrado' })));

    fixture.detectChanges(); // Chama ngOnInit

    expect(component.medicamentos).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(authService.logout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // ADIÇÃO: Teste para erro com mensagem específica
  it('should set medicamentos to empty array on error with "nenhum medicamento" message', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getCnes.and.returnValue('1234567');
    authService.getMedicamentos.and.returnValue(throwError(() => new HttpErrorResponse({ status: 400, error: 'Nenhum medicamento encontrado para essa UBS' })));

    fixture.detectChanges();

    expect(component.medicamentos).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(authService.logout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  // ADIÇÃO: Teste para lista vazia bem-sucedida
  it('should set medicamentos to empty array on successful empty response', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getCnes.and.returnValue('1234567');
    authService.getMedicamentos.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.medicamentos).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(authService.logout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});