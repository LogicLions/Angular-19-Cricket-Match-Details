import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerUpsertComponent } from './player-upsert.component';

describe('PlayerUpsertComponent', () => {
  let component: PlayerUpsertComponent;
  let fixture: ComponentFixture<PlayerUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
