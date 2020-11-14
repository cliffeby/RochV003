import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ScorecardListComponent } from './scorecard-list.component';
import { MatSort } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTableDataSource } from "@angular/material/table";
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { RouterTestingModule } from "@angular/router/testing";

let loader: HarnessLoader;

describe("ScorecardListComponent Harness" , () => {
  let component: ScorecardListComponent;
  let fixture: ComponentFixture<ScorecardListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, RouterTestingModule],
      declarations: [ScorecardListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ScorecardListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
