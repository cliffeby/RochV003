import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthService} from "../../services/auth.service";
import {AuthHttp} from "angular2-jwt";
import { ScoreCenterComponent } from './score-center.component';
import { ScoreService} from "../../services/score.service";
import { RouterTestingModule} from "@angular/router/testing";
import {ScoreDetailComponent} from "../score-detail/score-detail.component";
import {ScoreListComponent} from "../score-list/score-list.component";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";

// Mock our Auth service
export class MockAuthService {
  isAuthenticated() {
  };
  logout() {
  };
}
export class MockAuthHttp {
  get(){}
};
export class MockScoreService {
  getScores(){}
};

let loader: HarnessLoader;

describe("ScoreCenterComponent Harness", () => {
  let component: ScoreCenterComponent;
  let fixture: ComponentFixture<ScoreCenterComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [ScoreCenterComponent],
      providers: [
       { provide: ScoreService, useClass: MockScoreService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ScoreCenterComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});

// describe('ScoreCenterComponent', () => {
//   let component: ScoreCenterComponent;
//   let fixture: ComponentFixture<ScoreCenterComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule, FormsModule],
//       declarations: [ ScoreCenterComponent, ScoreDetailComponent, ScoreListComponent ],
//       providers: [
//         // ScoreService,
//        { provide: ScoreService, useClass: MockScoreService},
//         {provide: AuthService, useClass: MockAuthService},
//         {provide: AuthHttp, useClass: MockAuthHttp}
//       ]
//     })
//       .compileComponents();
//   });
//   beforeEach(async() => {
//     fixture = TestBed.createComponent(ScoreCenterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should be created ', () => {
//     expect(component).toBeTruthy();
//   });
// });
