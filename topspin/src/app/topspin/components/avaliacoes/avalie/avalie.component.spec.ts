import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalieComponent } from './avalie.component';

describe('AvalieComponent', () => {
  let component: AvalieComponent;
  let fixture: ComponentFixture<AvalieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvalieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvalieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
