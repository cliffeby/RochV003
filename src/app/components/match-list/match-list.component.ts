import { Component, OnInit, EventEmitter, NgModule, Input,Output, ViewChild } from '@angular/core';
import { Match } from '../../models/match';
import { CommonModule } from "@angular/common"
import { MaterialModule } from '../../material.module';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { MatchService } from "../../services/match.service";
import { MatchScoreService } from "../../services/matchscore.service";
// import { match } from 'minimatch';

@Component({
  selector: 'match-list',
  templateUrl: 'match-list.component.html',
  styleUrls: ['match-list.component.css'],
  outputs: [ 'AddMatchEvent','DeleteMatchEvent']
})

  @NgModule({
    imports: [
      MaterialModule, MatTableDataSource, MatSort, CommonModule
    ]
  })
export class MatchListComponent implements OnInit {
  @Input() matches: Match[];
  // @Output() match = new EventEmitter();
  // public SelectMatch = new EventEmitter();
  public AddMatchEvent = new EventEmitter();
  public DeleteMatchEvent = new EventEmitter();
  public ScoreMatchEvent = new EventEmitter();
  private queryString: string;
  public displayedColumns = ['name', 'datePlayed', 'scName', 'details', 'pair', 'scores', 'delete'];
  myString: string = "test";
  public dataSource: MatTableDataSource<Match>;
  matchscores: any
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _matchService: MatchService,
              private _matchscoreservice: MatchScoreService) {
    this.myString = "Updated1";
   }

  ngOnInit() {
    this.queryString = "";
    this.myString = "Updated";
    this._matchscoreservice.matchscore.subscribe(
      res => (this.matchscores = res)
    );
    console.log('MatchedScoresNgOninit', this.matchscores)
    this._matchscoreservice.changeMS(this.matchscores);
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Match>(this.matches)
    console.log('DATASOURCElistComp', this.dataSource);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  
  onSelectMatch(mtc: Match) {
    this._matchService.matchSelected.emit(mtc);
  }

  onScoreMatch(mtc: Match){
    this.ScoreMatchEvent.emit(mtc);
    this.matchscores = this._matchscoreservice.changeMS(mtc);
    this._matchService.matchScored.emit(mtc);
    console.log("ListonSelectMatchmtc", mtc);
  }

  deleteMatch(mtc:Match){
    console.log("Emit delete match")
    this.DeleteMatchEvent.emit(mtc);
  }
}
