import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownTableComponent } from './breakdown-table.component';

describe('BreakdownTableComponent', () => {
  let component: BreakdownTableComponent;
  let fixture: ComponentFixture<BreakdownTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakdownTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakdownTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
