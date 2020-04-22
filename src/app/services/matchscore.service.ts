
import { Injectable, EventEmitter } from "@angular/core";
import { Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/pluck";
import { AuthService } from "../services/auth.service";
import { MatchService } from "../services/match.service";
import { MemberService } from "../services/member.service";
import { ScoreService } from "../services/score.service";
import { ScorecardService } from "../services/scorecard.service";
import { AuthHttp } from "angular2-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { Match } from "../models/match";


@Injectable()
export class MatchScoreService {
  public newMatch = [];
  public dataSource = new BehaviorSubject<Match>(new Match());
  private scores: [];
  // matchSelected = new EventEmitter<Match>();
  matchScored = new EventEmitter<any>();
  matchId = "1";
  public BSMatch: BehaviorSubject<string>;

  constructor(
    public auth: AuthService,
    public _authHttp: AuthHttp,
    private _scorecardservice: ScorecardService,
    private _memberservice: MemberService,
    private _matchservice: MatchService,
    private _scoreservice: ScoreService,

  ) {
    this.BSMatch = new BehaviorSubject(this.matchId);
  }
  selectedMatch: Match;
  scoredMatch: Match;
  public match: Match;
  public mat: Match;

  matches: Array<Match>;

  private matchscores = new BehaviorSubject<any>([]);
  public matchscore = this.matchscores.asObservable();

  changeMS(match) {
    this.matchscores.next(match);
    console.log("MATCHscoreService", match, this.matchscore);
  }



  nextMatch(mtc) {
    this.BSMatch.next(mtc);
    this.matchId = mtc;
    console.log("MatchIdService", this.matchId);
  }

  getplayersandhcaps(id){
    // if (id) {
    //   this._scorecardservice
    //     .getScorecard(id)
    //     .subscribe((resSCData) => {
    //       this.scorecard = resSCData;
    //       match.scName = this.scorecard.name;
    //       match.memberIds = [];
    //       match.playerNames = [];
    //       match.playersHCap = [];
    //     });
    // }
    this._scoreservice.getScoreByMatch(id).subscribe((resScoreData) => {
      this.scores = resScoreData;
      console.log('mss', this.scores);
      return this.scores;
      // this._memberservice.getMembers().subscribe((resMemData) => {
      //   this.members = resMemData;
      //   match.players = 0;
      //   for (let index = 0; index < this.scores.length; index++) {
      //     for (let i = 0; i < this.members.length; i++) {
      //       if (this.members[i]._id === this.scores[index].memberId) {
      //         this.fullName =
      //           this.members[i].firstName + " " + this.members[i].lastName;
      //         this.members[i].isPlaying = true;
      //         match.playerNames = [...match.playerNames, this.fullName];

      //         match.memberIds = [...match.memberIds, this.members[i]._id];
      //         match.playersHCap = [
      //           ...match.playersHCap,
      //           this.members[i].currentHCap,
      //         ];
      //         this.dp.push({
      //           playerNames: this.fullName,
      //           playersHCap: this.members[i].currentHCap,
      //         });
      //         match.players++;
      //       } else {
      //         if (!this.members[i].isPlaying) {
      //           this.members[i].isPlaying = false;
      //         }
      //       }
      //     }
      //   }
      // });
    });

  }
}
