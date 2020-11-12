import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatchService } from "../../services/match.service";
import { MatchPairComponent } from './match-pair.component';
import { ScoreService } from "../../services/score.service";
import { ScorecardService } from "../../services/scorecard.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { MemberService } from "../../services/member.service";
import { MatchService } from "../../services/match.service";
import { AuthService } from "../../services/auth.service";
import { AuthHttp } from "angular2-jwt";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { RouterTestingModule } from '@angular/router/testing';

let loader: HarnessLoader;
export class MockAuthService {
  isAuthenticated() {}
  logout() {}
  userHasScopes([scopes]: string[]) {}
}
export class MockAuthHttp {
  get(){}
};
describe("MatchPairComponent Harness", () => {
  let component: MatchPairComponent;
  let fixture: ComponentFixture<MatchPairComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ScoreService,
        MatchScoreService,
        ScorecardService,
        MemberService,
        MatchService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: AuthHttp, useClass: MockAuthHttp },
      ],
      declarations: [MatchPairComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(MatchPairComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

