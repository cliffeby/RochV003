import { Component, OnInit, EventEmitter, NgModule, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { Score } from "../../models/score";
import { Match } from "../../models/match";
import { Datasource } from "../../models/datasource";
import { Member } from "../../models/member";
import { ScorecardService } from "../../services/scorecard.service"
import { MemberService } from "../../services/member.service";
import { MatchService } from "../../services/match.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { ScoreService } from "../../services/score.service";
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { NgModel } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource, MatTableModule } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@NgModule({
  imports: [
    MaterialModule,
    MatSort,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ValidationService,
    MatTableDataSource
  ]
})
@Component({
  selector: "match-score",
  templateUrl: "./match-score.component.html",
  styleUrls: ["./match-score.component.css"],
  outputs: ["updateMatchEvent", "submitAddMatchEvent", "SubmitScoreEvent"]
})
export class MatchScoreComponent implements OnInit, OnChanges {
  @Input() DS: any;
  @Input("match") match: Array<Score>;
  myScores:any = {};
  score:Score;
  selected: any;
  hidenewMatch: boolean; 
  scoreMatch: boolean;
  scorecards: Array<Scorecard>;
  members: Array<Member>;
  private updateMatchEvent = new EventEmitter();
  private SubmitScoreEvent = new EventEmitter();
  private submitAddMatchEvent = new EventEmitter();
  public matchScoreForm: FormGroup;
  public displayedColumns = ["playerNames", "playershCap", "todaysScore"];
  public dataSource: MatTableDataSource<any>;

  matchscores:any;
  constructor(
    private _matchscoreservice: MatchScoreService,
    private _scoreservice: ScoreService,
    public cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.matchScoreForm = this.fb.group({
      playerNames: "",
      hCap: "",
      todaysscore: ""
    });
  }

  ngOnInit() {
               this._matchscoreservice.matchscore.subscribe(
                 (res) => (this.matchscores = res)
               );

              // this.matchscores =  this._scoreservice.getScoreByMatch(this.matchscores.matchId);

               this.dataSource = new MatTableDataSource(this.match);
               console.log(

                 "MatchScoreComp2",
                 this.matchscores,

               );
               console.log(
                 "matchscorengOnInit2",
                 this.matchScoreForm,
                 this.dataSource
               );

             }
  ngOnChanges() {}
  updateMatch() {
    console.log('MatchData1',this.matchscores, this.myScores )
    for (let index = 0; index < this.match.length; index++) {

    // this.match[index]._id = this.match[index].scoreId


  this._scoreservice
    .updateScore(this.match[index])
    .subscribe((resUpdatedScore) => (this.match = resUpdatedScore));
    }
  }
  onAddPlayer() {
    // this.DS.push({ playerNames: "ADDon"});
    // this.DS = [...this.DS,...[ { playerNames: "Crew Cut21", playersHCap: 99 }]];
    this.dataSource = new MatTableDataSource(this.match);
     console.log(
       "matchscorengOnInit3",
       this.DS,
       this.matchScoreForm,
       this.dataSource
     );
  }
    refresh() {
      this.cd.detectChanges();
      console.log('REFRESH CALLED')
      this._matchscoreservice.matchscore.subscribe(
        res => (this.match = res)
      );
    }
}
