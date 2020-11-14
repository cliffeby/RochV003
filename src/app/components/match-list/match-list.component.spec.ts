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
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { idText } from 'typescript';

let loader: HarnessLoader;
let rootLoader: HarnessLoader;

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
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

it('should show a sorted table', async(() => {
    // no need to call ngOnInit, the last fixture.detectChanges(); will call ngOnInit for us
    // component.ngOnInit();
    const compiled = fixture.debugElement.nativeElement;
    const table = compiled.querySelector('table');
    const button = compiled.querySelector('.delete');
    component.dataSource = new MatTableDataSource();
    component.dataSource.sort = new MatSort();
    // component.dataSource.sort = dataSource.sort;
    // component.ngAfterViewInit = dataSource.sort;
    // component.source = new MatTableDataSource<any>(component.ngAfterViewInit);
    // component.sort = new MatSort();
    const sort = component.sort;
    fixture.detectChanges();
  console.log ("BUTTONNNNNNNNNN", button, table)
    button.click();
    // after click on the first element, detect the changes to ensure sorting took place
    fixture.detectChanges();
    // your assertions, i.e. expect to see the first element being sorted in the table
}));

// it('loads harnesses', async () => {
//   component.sort = new MatSort();
//   component.source = new MatTableDataSource<Match>;
//   component.source.sort = component.sort;
//   // The button element is inside the fixture's root element, so we use `loader`.
//   const buttonHarness = await loader.getChildLoader('delete');

//   // Click the button to open the dialog
//   await buttonHarness.getAllChildLoaders;
//  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should mark confirmed when ok button clicked', async () => {
    const testButton = await loader.getHarness(MatButtonHarness.with({text: 'Delete'}));
    expect(fixture.componentInstance.deleteMatch).toBe(true);
    expect(await testButton.isDisabled()).toBe(false);
    await testButton.click();
    expect(fixture.componentInstance.deleteMatch).toBe(true);
  });
    });

