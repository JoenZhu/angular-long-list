import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongListComponent } from './long-list.component';

describe('LongListComponent', () => {
  let component: LongListComponent;
  let fixture: ComponentFixture<LongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
