import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoViewComponent } from './documento-view.component';

describe('DocumentoViewComponent', () => {
  let component: DocumentoViewComponent;
  let fixture: ComponentFixture<DocumentoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
