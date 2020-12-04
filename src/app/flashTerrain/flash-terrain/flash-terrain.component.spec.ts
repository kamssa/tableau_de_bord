import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashTerrainComponent } from './flash-terrain.component';

describe('FlashTerrainComponent', () => {
  let component: FlashTerrainComponent;
  let fixture: ComponentFixture<FlashTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
