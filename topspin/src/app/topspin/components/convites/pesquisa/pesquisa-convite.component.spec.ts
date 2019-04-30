import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaConviteComponent } from './pesquisa-convite.component';

describe('PesquisaConviteComponent', () => {
  let component: PesquisaConviteComponent;
  let fixture: ComponentFixture<PesquisaConviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaConviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaConviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
