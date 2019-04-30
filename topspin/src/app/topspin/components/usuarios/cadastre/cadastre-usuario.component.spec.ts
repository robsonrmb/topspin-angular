import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastreUsuarioComponent } from './cadastre-usuario.component';

describe('CadastreUsuarioComponent', () => {
  let component: CadastreUsuarioComponent;
  let fixture: ComponentFixture<CadastreUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastreUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastreUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
