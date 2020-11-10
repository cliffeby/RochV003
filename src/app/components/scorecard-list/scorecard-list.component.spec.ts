import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ScorecardListComponent } from './scorecard-list.component';
import { MatSort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";

xdescribe('ScorecardListComponent', () => {
  let component: ScorecardListComponent;
  let fixture: ComponentFixture<ScorecardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatTableModule, MatSort]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
