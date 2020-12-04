import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeterrainComponent } from './listeterrain.component';

describe('ListeterrainComponent', () => {
  let component: ListeterrainComponent;
  let fixture: ComponentFixture<ListeterrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeterrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeterrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
