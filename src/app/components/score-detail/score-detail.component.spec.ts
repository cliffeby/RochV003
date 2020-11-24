import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { ScoreDetailComponent } from './score-detail.component';
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatDividerHarness } from "@angular/material/divider/testing";
import { MatIconHarness } from "@angular/material/icon/testing";
import { ValidationService } from "../../services/validation.service";
import { Scorecard } from "../../models/scorecard";
import { By } from '@angular/platform-browser';



export class MockAuthService {
  isAuthenticated() {}
  logout() {}
  userHasScopes([scopes]: string[]) {}
}
export class MockAuthHttp {
  get() {}
}

describe("ScoreDetailComponent", () => {
  let component: ScoreDetailComponent;
  let fixture: ComponentFixture<ScoreDetailComponent>;
  let loader: HarnessLoader;
//   beforeEach(
//     waitForAsync(() => {
//       TestBed.configureTestingModule({
//         declarations: [ScoreDetailComponent],
//         imports: [FormsModule],
//       }).compileComponents();
//     })
//   );

  beforeEach(() => {

    let loaderForFixture: HarnessLoader;
    fixture = TestBed.createComponent(ScoreDetailComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    fixture.detectChanges();
    // loaderForFixture = harnessForFixture<T extends ScoreDetailComponent>(fixture: ComponentFixture<unknown>, harnessType: ComponentHarnessConstructor<T>): Promise<T>
  });

  it("should be created ", async () => {
    // let loader: HarnessLoader;
    // loader = TestbedHarnessEnvironment.loader(fixture);
    const de = await fixture.debugElement.query(By.css("#button1"));
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    console.log("ScoreAll", component, de, buttons, loader, fixture);
    expect(component).toBeTruthy();
  });

  let fixture1: ComponentFixture<ScoreDetailComponent>;
  // let loader: HarnessLoader;
  let myButton: Promise<HarnessLoader[]>;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    fixture1 = await TestBed.createComponent(ScoreDetailComponent);
    loader = await TestbedHarnessEnvironment.loader(fixture1);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture1);

    myButton = loader.getAllChildLoaders("button");
    // fixture1.detectChanges();
  });

  xit("loads button harnesses", async () => {
    // Load a harness for the bootstrapped component with `harnessForFixture`
    // const myButtonHarness = await loader.getHarness('button');
    // await myButtonHarness.click();
    console.log("Score Button", myButton, loader, fixture1);
    expect((await myButton).length).toBe(2);
  });

  xit("submits a form when the sign up button is clicked", async () => {
    fixture1 = await TestBed.createComponent(ScoreDetailComponent);
    loader = await TestbedHarnessEnvironment.loader(fixture1);
    const signUpButton = await loader.getHarness(
      MatButtonHarness.with({ text: "mat-button" })
    );

    await signUpButton.click();

    expect(signUpButton.getText).toEqual("Update");
  });
  // let loader: HarnessLoader;

  describe("ScoreDetailComponent", async() => {
    beforeEach(async () => {


      await TestBed.configureTestingModule({
        imports: [],
        declarations: [ScoreDetailComponent],
      }).compileComponents();


    });
    xit("to have two buttons", async () => {
      let loader: HarnessLoader;
      let fixture: ComponentFixture<ScoreDetailComponent>;
      fixture = TestBed.createComponent(ScoreDetailComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
      fixture.detectChanges();
console.log("Score Button", loader, fixture);
      const buttons = await loader.getAllHarnesses(MatButtonHarness); // length: 3
      const firstButton = await loader.getHarness(MatButtonHarness); // === buttons[0]
      // await(await firstButton.host()).click();
      console.log("Score Button", buttons, firstButton);
      expect(await (buttons).length).toEqual(3);
    });
  });
});

