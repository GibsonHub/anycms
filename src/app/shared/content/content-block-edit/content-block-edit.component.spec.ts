import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlockEditComponent } from './content-block-edit.component';

describe('ContentBlockEditComponent', () => {
  let component: ContentBlockEditComponent;
  let fixture: ComponentFixture<ContentBlockEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBlockEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBlockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
