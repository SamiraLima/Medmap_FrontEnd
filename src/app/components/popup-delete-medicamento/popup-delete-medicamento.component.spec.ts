import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteMedicamentoComponent } from './popup-delete-medicamento.component';

describe('PopupDeleteMedicamentoComponent', () => {
  let component: PopupDeleteMedicamentoComponent;
  let fixture: ComponentFixture<PopupDeleteMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDeleteMedicamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDeleteMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
