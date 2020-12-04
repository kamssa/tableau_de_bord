import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProspectComponent } from './liste-prospect.component';

describe('ListeProspectComponent', () => {
  let component: ListeProspectComponent;
  let fixture: ComponentFixture<ListeProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
