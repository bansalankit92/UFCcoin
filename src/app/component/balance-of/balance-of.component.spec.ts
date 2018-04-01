import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceOfComponent } from './balance-of.component';

describe('BalanceOfComponent', () => {
  let component: BalanceOfComponent;
  let fixture: ComponentFixture<BalanceOfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceOfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
