import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from "../../material.module";
import { MatTableDataSource } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { MatchScoreComponent } from './match-score.component';

fdescribe('MatchScoreComponent', () => {
  let component: MatchScoreComponent;
  let fixture: ComponentFixture<MatchScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchScoreComponent ],
      imports: [MatTableDataSource]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
