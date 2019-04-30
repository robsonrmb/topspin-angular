import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroConviteComponent } from './cadastro-convite.component';

describe('CadastroConviteComponent', () => {
  let component: CadastroConviteComponent;
  let fixture: ComponentFixture<CadastroConviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroConviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroConviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
