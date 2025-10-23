import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchUpsertComponent } from './match-upsert.component';

describe('MatchUpsertComponent', () => {
  let component: MatchUpsertComponent;
  let fixture: ComponentFixture<MatchUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
