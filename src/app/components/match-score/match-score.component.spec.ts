import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from "../../material.module";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatchScoreComponent } from './match-score.component';
import { AuthService } from "../../services/auth.service";
import { AuthHttp } from "angular2-jwt";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatchScoreService } from '../../services/matchscore.service';
import { ScoreService } from '../../services/score.service';
import { ScorecardService } from "../../services/scorecard.service";
import { MemberService } from '../../services/member.service';
import { MatchService } from '../../services/match.service';
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

let loader: HarnessLoader;
export class MockAuthService {
  isAuthenticated() {}
  logout() {}
  userHasScopes([scopes]: Array<string>) {}
}
export class MockAuthHttp {
  get(){}
};

describe("MatchScoreComponent Harness", () => {
  let component: MatchScoreComponent;
  let fixture: ComponentFixture<MatchScoreComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [MatchScoreComponent],
      providers: [
        ScoreService,
        MatchScoreService,
        ScorecardService,
        MemberService,
        MatchService,
        { provide: AuthService, useClass: MockAuthService },
        { provide: AuthHttp, useClass: MockAuthHttp },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MatchScoreComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
