import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ScorecardDetailComponent } from './scorecard-detail.component';
import { Scorecard } from '../../models/scorecard';
import { ErrorStateMatcher } from '@angular/material/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from "@angular/material/input";
import { MaterialModule } from "../../material.module";
import { ControlMessagesComponent } from '../../helpers/control-messages/control-messages.component'
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonHarness } from "@angular/material/button/testing";
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { loadRules } from 'tslint';
import { By } from '@angular/platform-browser';

describe('ScorecardDetailComponent-Validators', () => {
  let component: ScorecardDetailComponent;
  let fixture: ComponentFixture<ScorecardDetailComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ScorecardDetailComponent, ControlMessagesComponent],
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ScorecardDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created ', () => {
    expect(component).toBeTruthy();
  });

  // it('component method onInitYardstoString should exist', () => {
  //   expect(component.onInitYardsString).toBeTruthy;
  // });

  it('component method onInitYardstoString return a partial YARDS string', () => {
    const scorecard = new Scorecard();
    scorecard.yardsInputString = "";
    expect(component.onInitYardsString(scorecard)).toEqual(['YARDS', '', '0', '0', '0']);
  });

  it('component method onInitYardstoString return a full YARDS string', () => {
    const scorecard = new Scorecard();
    scorecard.yardsInputString = "1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2";
    expect(component.onInitYardsString(scorecard))
      .toEqual(['YARDS', '1', '1', '1', '1', '1', '1', '1', '1', '1', '9', '2', '2', '2', '2', '2', '2', '2', '2', '2', '18', '27']);
  });
  // TODO Handle non-numerics
  it('component method onInitYardstoString return an error string', () => {
    const scorecard = new Scorecard();
    scorecard.yardsInputString = "1,a,1";
    expect(component.onInitYardsString(scorecard)).toEqual(['YARDS', '1', 'a', '1', '0', '0', '0']);
  });

  it('component method onInitParstoString return a partial PARS string', () => {
    const scorecard = new Scorecard();
    scorecard.parInputString = "";
    expect(component.onInitParsString(scorecard)).toEqual(['PAR', '', '0', '0', '0']);
  });

  it('component method onInitParstoString return a full PARS string', () => {
    const scorecard = new Scorecard();
    scorecard.parInputString = "1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2";
    expect(component.onInitParsString(scorecard))
      .toEqual(['PAR', '1', '1', '1', '1', '1', '1', '1', '1', '1', '9', '2', '2', '2', '2', '2', '2', '2', '2', '2', '18', '27']);
  });

  it('component method onInitParstoString return an error string', () => {
    const scorecard = new Scorecard();
    scorecard.parInputString = "1,a1,1";
    expect(component.onInitParsString(scorecard)).toEqual(['PAR', '1', 'a1', '1', '0', '0', '0']);
  });

  it('component method onInitHcapstoString return a partial HCAPS string', () => {
    const scorecard = new Scorecard();
    scorecard.hCapInputString = "";
    expect(component.onInitHcapsString(scorecard)).toEqual(['HCAP', '', '  ']);
  });

  it('component method onInitHcapstoString return a full HCAPS string', () => {
    const scorecard = new Scorecard();
    scorecard.hCapInputString = "1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2";
    expect(component.onInitHcapsString(scorecard))
      .toEqual(['HCAP', '1', '1', '1', '1', '1', '1', '1', '1', '1', '  ', '2', '2', '2', '2', '2', '2', '2', '2', '2']);
  });

  it('component method onInitHcapstoString return an error string', () => {
    const scorecard = new Scorecard();
    scorecard.hCapInputString = "1,a2,1";
    expect(component.onInitHcapsString(scorecard)).toEqual(['HCAP', '1', 'a2', '1', '  ']);
  });

});
describe("ScorecardDetailComponent-Emitters", () => {
  let component: ScorecardDetailComponent;
  let fixture: ComponentFixture<ScorecardDetailComponent>;
  let loader: HarnessLoader;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ScorecardDetailComponent],
        imports: [FormsModule, ReactiveFormsModule],
        providers: [FormBuilder]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardDetailComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });
  afterEach(() => {
  fixture.destroy();
});

  it("componenet should exist", async () => {
    expect(component).toBeTruthy();
  });

  it("should find buttons ", async () => {
    // Use MatButtonHarness
    // getHarnesses and getHarness use selectors to find buttos or buttons[]
    // Three buttons use *ngIf and are rendered only when ngIf is satisfied

    // Sample of different selectors
    // const button1 = await loader.getHarness(
    //   MatButtonHarness.with({ text: "Add" })
    //   );
    //   const button2 = await loader.getHarness(
    //   MatButtonHarness.with({ selector: "#addbtn1" })
    //   );
    // const button3 = await loader.getAllHarnesses(
    //   MatButtonHarness.with({ text: /^(Add|Update|Delete|Cancel)$/ })
    //   );
    // component.scorecard._id = '1';
    // const button4 = await loader.getAllHarnesses(
    //   MatButtonHarness.with({ selector: 'button' })
    //   );
    //   console.log("ScorecardButtonUpdate", button1, "by Id", button2, 'by text', button3, 'by class', button4);

    // Number of buttons when scorecard._id is null - false
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toEqual(2);
  });
   it("Add button should exist", async () => {
     //Get Add button using text selector
      const button1 = await loader.getHarness(
      MatButtonHarness.with({ text: "Add" })
      );
      expect( component.submitAddScorecardEvent).toBeTruthy();
   });
  xit("should emit an Add event on click ", async () => {
    // Clicking on the Add button triggers and emits
      const button1 = await loader.getHarness(
      MatButtonHarness.with({ text: "Add" })
      );
      spyOn(component.submitAddScorecardEvent, "emit");
      await button1.click();
      expect(component.submitAddScorecardEvent.emit).toHaveBeenCalled();
  });
   xit("should emit a Scorecard with name property Debbie on click ", async () => {
     // Clicking on the Add button event should emit a Scorecard
     fixture.detectChanges();
     const addScorecard = new Scorecard();

     let temp = "";
     const button1 = await loader.getHarness(
       MatButtonHarness.with({ text: "Add" })
     );
     component.scorecardForm1.controls["name"].setValue("Debbie");
     spyOn(component.submitAddScorecardEvent, "emit");
     component.submitAddScorecardEvent.subscribe((addscorecard: Scorecard) => {
       expect(addscorecard.name).toEqual("Duncan");
       temp = addScorecard.name;

     });
     fixture.detectChanges();
     await button1.click();
     console.log("name4", temp, component.scorecardForm1.controls["name"]); //value = "Debbie"
     expect(temp).toEqual("Debbie"); //ng test fails here with Expected '' to equal 'Debbie'.
   });
   it("Update button should exist", async () => {
     //Get Update button using text selector
     fixture.detectChanges();
     component.scorecard._id = "33";
     const button3 = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: /^(Update)$/ })
      );
      expect(button3.length).toEqual(1);
      expect( component.updateScorecardEvent).toBeTruthy();
      });
       it("Update button should exist", async () => {
     //Get Update button using text selector
     fixture.detectChanges();
     component.scorecard._id = "33";
     const button3 = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: /^(Update)$/ })
      );
      expect(button3.length).toEqual(1);
      expect( component.updateScorecardEvent).toBeTruthy();
      });

      it("Delete button should exist", async () => {
        //Get Delete button using text selector
        fixture.detectChanges();
        component.scorecard._id = "33";
        const button3 = await loader.getAllHarnesses(
          MatButtonHarness.with({ text: /^(Delete)$/ })
        );
        expect(button3.length).toEqual(1);
        expect(component.updateScorecardEvent).toBeTruthy();
      });
});
