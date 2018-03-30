import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTokenComponent } from './sell-token.component';

describe('SellTokenComponent', () => {
  let component: SellTokenComponent;
  let fixture: ComponentFixture<SellTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
