import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaAvaliacaoComponent } from './pesquisa-avaliacao.component';

describe('PesquisaAvaliacaoComponent', () => {
  let component: PesquisaAvaliacaoComponent;
  let fixture: ComponentFixture<PesquisaAvaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaAvaliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
