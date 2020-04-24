import { Component, OnInit, Input } from '@angular/core';
import { ScoreService } from "../../services/score.service";
import { MatchScoreService } from "../../services/matchscore.service";
import { MatchService } from "../../services/match.service";
import { from } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: "match-pair",
  templateUrl: "./match-pair.component.html",
  styleUrls: ["./match-pair.component.css"],
})
export class MatchPairComponent implements OnInit {

  matchSorted: any;
  scores: any;
  matchId: string;
  // id: number;
  match: any;


  constructor(
    private _scoreservice: ScoreService,
    private _matchscoreservice: MatchScoreService,
    private _matchservice: MatchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._matchscoreservice.BSMatch.subscribe((c) => {
      this.match = c;
      console.log("Match from pair", this.match);
    });
        this._scoreservice
          .getScoreByMatch(this.match._id)
          .subscribe((resScoreData) => {
            this.scores = resScoreData;
            console.log("msfromPair", this.scores);
    });
}

  onPairing(){
    // Alphabetical
    this.matchSorted = this.scores;
    this.matchSorted = this.mysort(this.matchSorted);

  }
  mysort(data) {
    return data.sort((a, b) => {
      return  (b.playersHCap) -  (a.playersHCap);
    });
  }
}

