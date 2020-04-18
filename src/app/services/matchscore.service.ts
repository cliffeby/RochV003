
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
  // matchSelected = new EventEmitter<Match>();
  matchScored = new EventEmitter<any>();

  constructor(
    public auth: AuthService,
    public _authHttp: AuthHttp,
    private _scorecardservice: ScorecardService,
    private _memberservice: MemberService,
    private _matchservice: MatchService,
    private _scoreservice: ScoreService
  ) {}
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
}
