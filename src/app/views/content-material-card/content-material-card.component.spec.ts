import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentMaterialCardComponent } from './content-material-card.component';

describe('ContentMaterialCardComponent', () => {
  let component: ContentMaterialCardComponent;
  let fixture: ComponentFixture<ContentMaterialCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentMaterialCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentMaterialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
