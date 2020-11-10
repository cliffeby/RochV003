import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchListComponent } from './match-list.component';
import {FormsModule} from "@angular/forms";
import {SearchFilterPipe} from "../../search.pipe";
import { MatchService } from "../../services/match.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { ScoreService } from "../../services/score.service";

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ MatchListComponent, SearchFilterPipe ],
      imports: [FormsModule],
      providers: [MatchService, MatchScoreService, ScoreService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
