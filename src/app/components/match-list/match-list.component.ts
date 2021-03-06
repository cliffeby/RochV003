import { Component, OnInit, EventEmitter, NgModule, Input,Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Match } from '../../models/match';
import { CommonModule } from "@angular/common"
import { MaterialModule } from '../../material.module';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { MatchService } from "../../services/match.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { ScoreService } from "../../services/score.service";

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
  @Output() index: number;
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
  match:Match;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private _matchService: MatchService,
    private _matchscoreservice: MatchScoreService,
    private _scoreservice: ScoreService,
    private router: Router,
    private route: ActivatedRoute
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
      this.match = c;
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
    this._matchService.onMatchSelected(mtc);
    console.log('ListOnSelect', mtc, )
  }

  onPairMatch(mtc: Match) {
    this._matchService.onMatchPaired(mtc, this.index);
    console.log("ListOnPair", mtc);
  }
  // onPairMatch1(index: number) {
  //   // this._matchService.matchPaired.emit(mtc);
  //   // this.matchscores = this._matchscoreservice.changeMS(mtc);
  //   console.log("match index1", index);
  //   this.router.navigate([index], { relativeTo: this.route });
  // }
  onPairMatch2(mtc: Match, index: number) {
    const mtcId = mtc._id;
    this._matchService.matchPaired2.emit(mtcId);
    // this._matchscoreservice.BSMatch.subscribe;
    this._matchscoreservice.nextMatch(mtc);
    console.log(
      "match Pair ID from List",
      mtcId,
      this.matchId,
      this.dataSource.filteredData.indexOf(mtc),
      index,
      mtc
    );
    // this._scoreservice.getScoreByMatch(mtcId).subscribe((resScoreData) => {
    //   this.scores = resScoreData;
    //   console.log("msfromList", this.scores);
    // });
    this.router.navigate([index], { relativeTo: this.route });
  }
  // nextMatch(mtcId) {
  //   this._matchscoreservice.nextMatch(mtcId);
  // }

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
