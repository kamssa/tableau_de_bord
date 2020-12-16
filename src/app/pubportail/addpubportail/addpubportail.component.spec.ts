import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpubportailComponent } from './addpubportail.component';

describe('AddpubportailComponent', () => {
  let component: AddpubportailComponent;
  let fixture: ComponentFixture<AddpubportailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpubportailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpubportailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
