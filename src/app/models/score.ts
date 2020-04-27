export class Score {
         _id: string;
         name: string;
         memberName: string;
         cap: number;
         todayssscore: number;
         memberId: string;
         matchId: string;
         partnerId: string;
         partnerIds: string[];
         foresomeIds: string[];
         wonTwoBall: boolean;
         wonOneBall: boolean;
         wonIndo: boolean;
         created: string;
         user: string;
       }
//          _id: string;
//   name: string;
//   memberName: string;
//   cap: number;
//   memberId: string;
//   matchId: string;
//   created: string;
//   user: string;
// }
// name: String,
//   memberName: String,
//   cap: String,
//   todaysscore: String,
//   wonTwoBall: Boolean,
//   wonOneBall: Boolean,
//   wonIndo: Boolean,
//   matchId: {
//     type: Schema.ObjectId,
//     ref: 'Match'
//   },
//   memberId: {
//     type: Schema.ObjectId,
//     ref: 'Member'
//   },
//   datePlayed: Date,
//   partnerId: {
//     type: Schema.ObjectId,
//     ref: 'Member'
//   },
//   foursomeIds: [{
//     type: Schema.ObjectId,
//     ref: 'Member'
//   }],
//   partnerIds: [{
//     type: Schema.ObjectId,
//     ref: 'Member'
//   }],
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   user: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
