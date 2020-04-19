import { Component, OnInit, Input } from '@angular/core';
import { MatchScoreService } from "../../services/matchscore.service";
import { MatchService } from "../../services/match.service";
import { from } from 'rxjs';

@Component({
  selector: "match-pair",
  templateUrl: "./match-pair.component.html",
  styleUrls: ["./match-pair.component.css"],
})
export class MatchPairComponent implements OnInit {
  @Input("match") match: any;

  constructor(
    private _matchscoreservice: MatchScoreService,
    private _matchservice: MatchService
  ) {}

  ngOnInit() {
    this._matchservice.matchPaired.subscribe((res) => {
      this.match = res;
      console.log("Match to Pair", this.match);
      //     this._matchscoreservice.matchscore.subscribe((res) => {
      // this.match = res;
      // console.log("Match to Pair", this.match);
    });
  }
}

