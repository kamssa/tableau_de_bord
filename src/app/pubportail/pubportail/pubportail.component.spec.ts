import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubportailComponent } from './pubportail.component';

describe('PubportailComponent', () => {
  let component: PubportailComponent;
  let fixture: ComponentFixture<PubportailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubportailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubportailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
