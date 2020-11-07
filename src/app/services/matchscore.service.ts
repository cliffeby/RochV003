
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
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { Match } from "../models/match";

@Injectable()
export class MatchScoreService {
  public newMatch:Match = new Match;
  public dataSource = new BehaviorSubject<Match>(new Match());
  private scores: [];
  // matchSelected = new EventEmitter<Match>();
  matchScored = new EventEmitter<any>();
  matchId = "1";
  public BSMatch: BehaviorSubject<Match>;
  public BSIndex: BehaviorSubject<string>;

  constructor(
    public auth: AuthService,
    public _authHttp: AuthHttp,
    private _scorecardservice: ScorecardService,
    private _memberservice: MemberService,
    private _matchservice: MatchService,
    private _scoreservice: ScoreService
  ) {
    this.BSMatch = new BehaviorSubject(this.newMatch);
    this.BSIndex = new BehaviorSubject(this.matchId);
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

  nextMatch(mat) {
    this.BSMatch.next(mat);
    this.match = mat;
    console.log("MatchIdService", this.match);
  }
 loadedCharacter = {}
  getScoreByMatchwithNames(matchId, memberId) {
    const sbmwn = this._scoreservice.getScoreByMatch(matchId);
    const mbid = this._memberservice.getMember(memberId);
    console.log("forkJionIds", matchId, memberId, sbmwn, mbid);
    forkJoin([sbmwn, mbid]).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld
      results[0].homeworld = results[1];
      this.loadedCharacter = results[0];
      console.log('forkJoin', results, this.loadedCharacter);
    });
  };
mem = {};
  getmemberNames(match) {
    const ids: string[] = match.memberIds;
    console.log("msfromPairSerIDS", match, ids);
    this._memberservice.getMembers()
      .subscribe((res) => {
        this.mem = res._ids.indexOf(ids);
        console.log("msfromPairSer", this.mem);
      });
  }
}
