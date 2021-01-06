import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaisonComponent } from './list-maison.component';

describe('ListMaisonComponent', () => {
  let component: ListMaisonComponent;
  let fixture: ComponentFixture<ListMaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
