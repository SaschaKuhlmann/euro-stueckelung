import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuroDenominationComponent } from './euro-denomination.component';

describe('EuroDenominationComponent', () => {
  let component: EuroDenominationComponent;
  let fixture: ComponentFixture<EuroDenominationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EuroDenominationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EuroDenominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
