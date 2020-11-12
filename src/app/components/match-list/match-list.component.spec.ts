import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchListComponent } from './match-list.component';
import {FormsModule} from "@angular/forms";
import {SearchFilterPipe} from "../../search.pipe";
import { AuthService } from "../../services/auth.service";
import { AuthHttp } from "angular2-jwt";
import { MatSort } from "@angular/material/sort";
import { MatchService } from "../../services/match.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { ScoreService } from "../../services/score.service";
import { MemberService } from "../../services/member.service";
import { ScorecardService } from "../../services/scorecard.service";
import { RouterTestingModule } from "@angular/router/testing";
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { MatTableModule } from '@angular/material/table';

let loader: HarnessLoader;

export class MockAuthService {
  isAuthenticated() {}
  logout() {}
  userHasScopes([scopes]: string[]) {}
}
export class MockAuthHttp {
  get(){}
}
describe("MatchListComponent Harness" , () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, RouterTestingModule],
      declarations: [MatchListComponent],
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
    fixture = TestBed.createComponent(MatchListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });
// describe('MatchListComponent', () => {
//   let component: MatchListComponent;
//   let fixture: ComponentFixture<MatchListComponent>;

//   beforeEach(async() => {
//     TestBed.configureTestingModule({
//       declarations: [MatchListComponent, SearchFilterPipe],
//       imports: [FormsModule, RouterTestingModule, MatSort],
//       providers: [
//         ScoreService,
//         MatchScoreService,
//         ScorecardService,
//         MemberService,
//         MatchService,
//         { provide: AuthService, useClass: MockAuthService },
//         { provide: AuthHttp, useClass: MockAuthHttp },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MatchListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
