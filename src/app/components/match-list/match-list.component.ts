import { Component, OnInit, EventEmitter, NgModule, Input,Output, ViewChild } from '@angular/core';
import { Match } from '../../models/match';
import { CommonModule } from "@angular/common"
import { MaterialModule } from '../../material.module';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { MatchService } from "../../services/match.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { ScoreService } from "../../services/score.service";
// import { match } from 'minimatch';

@Component({
  selector: "match-list",
  templateUrl: "match-list.component.html",
  styleUrls: ["match-list.component.css"],
  outputs: ["AddMatchEvent", "DeleteMatchEvent"],
})
@NgModule({
  imports: [MaterialModule, MatTableDataSource, MatSort, CommonModule],
})
export class MatchListComponent implements OnInit {
  @Input() matches: Match[];
  // @Output() match = new EventEmitter();
  // public SelectMatch = new EventEmitter();
  public AddMatchEvent = new EventEmitter();
  public DeleteMatchEvent = new EventEmitter();
  public ScoreMatchEvent = new EventEmitter();
  public PairMatchEvent = new EventEmitter();
  private queryString: string;
  public matchId: string;
  public displayedColumns = [
    "name",
    "datePlayed",
    "scName",
    "details",
    "pair",
    "scores",
    "delete",
  ];
  myString: string = "test";
  public dataSource: MatTableDataSource<Match>;
  matchscores: any;
  scores: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private _matchService: MatchService,
    private _matchscoreservice: MatchScoreService,
    private _scoreservice: ScoreService
  ) {
    this.myString = "Updated1";
  }

  ngOnInit() {
    this.queryString = "";
    this.myString = "Updated";
    this._matchscoreservice.matchscore.subscribe(
      (res) => (this.matchscores = res)
    );
    console.log("MatchedScoresNgOninit", this.matchscores);
    this._matchscoreservice.changeMS(this.matchscores);

    this._matchscoreservice.BSMatch.subscribe((c) => {
      this.matchId = c;
    });
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Match>(this.matches);
    console.log("DATASOURCElistComp", this.dataSource);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSelectMatch(mtc: Match) {
    this._matchService.matchSelected.emit(mtc);
  }

  onPairMatch(mtc: Match) {
    this._matchService.matchPaired.emit(mtc);
    this.matchscores = this._matchscoreservice.changeMS(mtc);
    console.log("match Pair", mtc);
  }
  onPairMatch2(mtc: Match) {
    const mtcId = mtc._id;
    this._matchService.matchPaired2.emit(mtcId);
    // this._matchscoreservice.BSMatch.subscribe;
    this.nextMatch(mtcId);
    console.log("match Pair ID", mtcId, this.matchId);
    this._scoreservice.getScoreByMatch(mtcId).subscribe((resScoreData) => {
      this.scores = resScoreData;
      console.log("msfromList", this.scores);
    });
  }
  nextMatch(mtcId) {
    this._matchscoreservice.nextMatch(mtcId);
  }

  onScoreMatch(mtc: Match) {
    // this.ScoreMatchEvent.emit(mtc);
    this.matchscores = this._matchscoreservice.changeMS(mtc);
    this._matchService.matchScored.emit(mtc);
    console.log("ListonSelectMatchmtc", mtc);
  }

  deleteMatch(mtc: Match) {
    console.log("Emit delete match");
    this.DeleteMatchEvent.emit(mtc);
  }
}
