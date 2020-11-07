import { TestBed } from '@angular/core/testing';
import { AuthService } from "../services/auth.service";
import { AuthHttp } from "angular2-jwt";
import { ScoreService } from "../services/score.service";
import { MatchService } from "../services/match.service";
import { MemberService } from "../services/member.service";
import { MatchScoreService } from './matchscore.service';
import { ScorecardService } from "../services/scorecard.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
class MockAuthService {
  isAuthenticated() {}
}
class MockAuthHttp {
  get() {}
}

describe('MatchscoreService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ScorecardService,
        MemberService,
        MatchService,
        MatchScoreService,
        ScoreService,
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: AuthHttp,
          useClass: MockAuthHttp,
        },
      ],
    })
  );

  it('should be created', () => {
    const service: MatchScoreService = TestBed.get(MatchScoreService);
    expect(service).toBeTruthy();
  });
});
