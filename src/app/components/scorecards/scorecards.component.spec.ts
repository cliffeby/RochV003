import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {ScorecardDetailComponent} from '../scorecard-detail/scorecard-detail.component';
import {ScorecardListComponent} from '../scorecard-list/scorecard-list.component';
import { ScorecardsComponent } from './scorecards.component';
import {AuthService} from "../../services/auth.service";
import {ScorecardService} from "../../services/scorecard.service";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthHttp} from "angular2-jwt";
import {FormsModule} from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
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
export class MockScorecardService {
  getScorecards(){return true;}
}

describe("ScorecardComponent Harness" , () => {
  let component: ScorecardsComponent;
  let fixture: ComponentFixture<ScorecardsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ ScorecardsComponent, ScorecardDetailComponent, ScorecardListComponent],
      providers: [
        {provide: ScorecardService, useClass: MockScorecardService},
        {provide: AuthService, useClass: MockAuthService},
        {provide: AuthHttp, useClass: MockAuthHttp}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ScorecardsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });
// // Mock our Auth service
// export class MockAuthService {
//   isAuthenticated() {
//   }
//   logout() {
//   }
// }
// export class MockAuthHttp {
//   get(){}
// };



// describe('ScorecardsComponent', () => {
//   // let service: ScorecardService;
//   // let myServiceDependancy: AuthHttp;
//   let component: ScorecardsComponent;
//   let fixture: ComponentFixture<ScorecardsComponent>;

//   beforeEach(async() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, BrowserAnimationsModule],
//       declarations: [ ScorecardsComponent, ScorecardDetailComponent, ScorecardListComponent],
//       providers: [
//         {provide: ScorecardService, useClass: MockScorecardService},
//         {provide: AuthService, useClass: MockAuthService},
//         {provide: AuthHttp, useClass: MockAuthHttp}
//       ]
//     })
//     .compileComponents();
//   });

//   beforeEach(async() => {
//     fixture = TestBed.createComponent(ScorecardsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });
});

