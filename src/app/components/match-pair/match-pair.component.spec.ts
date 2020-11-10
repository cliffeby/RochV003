import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatchService } from "../../services/match.service";
import { MatchPairComponent } from './match-pair.component';
import { ScoreService } from "../../services/score.service";
import { MatchScoreService } from "../../services/matchscore.service";

describe('MatchPairComponent', () => {
  let component: MatchPairComponent;
  let fixture: ComponentFixture<MatchPairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPairComponent ],
      providers: [ ScoreService, MatchScoreService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
