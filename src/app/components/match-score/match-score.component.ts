import { Component, OnInit, EventEmitter, NgModule, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Scorecard } from "../../models/scorecard";
import { Match } from "../../models/match";
import { Datasource } from "../../models/datasource";
import { Member } from "../../models/member";
import { ScorecardService } from "../../services/scorecard.service"
import { MemberService } from "../../services/member.service";
import { MatchService } from "../../services/match.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroupDirective, NgForm } from '@angular/forms'
import { NgModel } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@NgModule({
  imports: [
    MaterialModule,
    MatSort,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ValidationService
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
  @Input("match") match: any;

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

  // public displayedColumns1: string[] = ["position", "name", "weight", "symbol"];

  // p_DATA: any = [
  //   { playerNames: "Crew Cut", playersHCap: 15 },
  //   { playerNames: "London Catcher", playersHCap: 16 },
  //   { playerNames: "Teddy Baker", playersHCap: 14 }
  // ];
  matchscores:any;
  constructor(
    private _matchscoreservice: MatchScoreService,
    public cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.matchScoreForm = this.fb.group({
      playerNames: "",
      hCap: "",
      todaysScore: ""
    });
  }

  // ngOnInit() {
  //   if (this.match == null) {
  //     this.match = new Match();
  //   }
  //   this._scorecardservice
  //     .getScorecards()
  //     .subscribe(resSCData => (this.scorecards = resSCData));
  //   this.matchDetailForm = this.fb.group({
  //     name: [this.match.name, [Validators.required, Validators.minLength(5)]],
  //     course: [this.match.scorecardId],
  //     date: [
  //       this.match.datePlayed,
  //       [Validators.required, ValidationService.dateValidator]
  //     ]
  //   });
  // }

  ngOnInit() {
               this._matchscoreservice.matchscore.subscribe(
                 (res) => (this.matchscores = res)
               );
               
               // this._matchscoreservice.changeMS(this.matchscores);

               // this.dataSource = new MatTableDataSource(this.matchscores);
               this.dataSource = new MatTableDataSource(this.match);
               console.log(
                 "MATCHscoreComp1",
                 this.match,
                 "MatchScoreComp2",
                 this.matchscores,
                 "DataSource",
                 this.dataSource
               );
               // this.DS = this.match;
               // console.log("MatchCenter SCORE DS1", this.DS);
               // this._matchservice.dsArray.subscribe(DS => {
               //   console.log("MatchCenter SCORE DS2", DS);
               //   this.DS = DS;
               //   // this.onSelectMatch(match);
               //   this.DS.push({playerNames: "Crew Cut212", playersHCap: 15});
               //   DS = [...DS, ...[{ playerNames: "Crew Cut228", playersHCap: 15 }]];
               //   this.dataSource = new MatTableDataSource(DS);
               //   this.cd.detectChanges();
               //   this.DS = DS;
               // });
               // this.dataSource = new MatTableDataSource(this.DS);
               // this.cd.markForCheck();
               // this.cd.detectChanges();
               // this.match = {
               //   ...this.match,
               //   name: this.match.name + "."
               // };
               // console.log("matchscorengOnInit1", this.match, this.dataSource);
               // this.dataSource = new MatTableDataSource(this.DS);
               // // this.datasourceInit(this.match);

               // this.matchScoreForm = this.fb.group({
               //   playerNames: [this.match.playerNames],
               //   hCap: [this.match.playersHCap],
               //   todaysScore: []
               // });
              //  this.matchScoreForm.setValue({
              //    playerNames: [this.matchscores.playerNames],
              //    hCap: [this.matchscores.playersHCap],
              //    todaysScore: []
              //  });

              //  setTimeout(() => {
              //    console.log('msf',this.matchScoreForm.value, this.match);
              //  });

               // this.matchScoreForm.valueChanges.subscribe(
               //   (res) =>
               //     ( {
               //       playerNames: [this.matchscores.playerNames],
               //       hCap: [this.matchscores.playersHCap],
               //       todaysScore: [],
               //     })
               // );
               console.log(
                 "matchscorengOnInit2",
                 this.DS,
                 this.matchScoreForm,
                 this.dataSource
               );

             }
  ngOnChanges() {}
  onAddPlayer() {
    // this.DS.push({ playerNames: "ADDon"});
    // this.DS = [...this.DS,...[ { playerNames: "Crew Cut21", playersHCap: 99 }]];
    this.dataSource = new MatTableDataSource(this.match);
    // this.dataSource._renderChangesSubscription;
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
    // this.authService.getAuthenticatedUser().subscribe((res) => {
    //   this.user = res;
    //   this.teachDS = new LanguageDataSource(this.user.profile.languages.teach);
    //   this.cd.detectChanges();cxcxc
    // });
    }
}
