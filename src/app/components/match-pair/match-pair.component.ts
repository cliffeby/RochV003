import { Component, OnInit, Input } from '@angular/core';
import { ScoreService } from "../../services/score.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { MatchService } from "../../services/match.service";
import { from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "match-pair",
  templateUrl: "./match-pair.component.html",
  styleUrls: ["./match-pair.component.css"],
})
export class MatchPairComponent implements OnInit {
  @Input("match") match: any;
  matchSorted: any;
  scores: any;
  matchId: string;

  constructor(
    private _scoreservice: ScoreService,
    private _matchscoreservice: MatchScoreService,
    private _matchservice: MatchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this._matchscoreservice.BSMatch.subscribe((c) => {
      this.matchId = c;
    });
    this._matchservice.matchPaired.subscribe((res) => {
      this.match = res;
      console.log("Match to Pair", this.match);
      this._scoreservice
        .getScoreByMatch(this.matchId)
        .subscribe((resScoreData) => {
          this.scores = resScoreData;
          console.log("msfromPair", this.scores);
        });
    });
  }
  onPairing(){
    // Alphabetical
    this.matchSorted = this.match;
    this.matchSorted = this.mysort(this.matchSorted);

  }
  mysort(data) {
    return data.sort((a, b) => {
      return  (b.playersHCap) -  (a.playersHCap);
    });
  }
}

