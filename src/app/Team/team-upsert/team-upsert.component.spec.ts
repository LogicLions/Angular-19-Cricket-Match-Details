import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamUpsertComponent } from './team-upsert.component';

describe('TeamUpsertComponent', () => {
  let component: TeamUpsertComponent;
  let fixture: ComponentFixture<TeamUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
