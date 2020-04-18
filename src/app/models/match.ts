export class Match {
    _id: string;
    name: string;
    scorecardId: string;
    scName: string;
    datePlayed: string;
    dateFlag: boolean;
    memberIds: string[];
    playerNames: string[];
    lineUpIds: string[];
    playersHCap: string[];
    players: number;
    created: string;
    user: string;

    constructor(){
      this.memberIds = [];
      this.playerNames = [];
      this.lineUpIds = [];
      this.playersHCap = [];
    }
}

