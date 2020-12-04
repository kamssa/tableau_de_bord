import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFlashTerrainComponent } from './liste-flash-terrain.component';

describe('ListeFlashTerrainComponent', () => {
  let component: ListeFlashTerrainComponent;
  let fixture: ComponentFixture<ListeFlashTerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFlashTerrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFlashTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
