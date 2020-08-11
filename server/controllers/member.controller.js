/**
 * Created by cliff on 8/18/2017.
 */
// Members
const Member = require('../models/member');

exports.getMembers=function(req, res){
  console.log('Get request for all members');
  Member.find({})
    .sort('lastName')
    .exec(function(err, members){
      if (err){
        console.log("Error retrieving members");
      }else {
        res.json(members);
      }
    });
};

exports.getMember=function(req, res){
  console.log('Get request for a single member');
  Member.findById(req.params.id)
    .exec(function(err, member){
      if (err){
        console.log("Error retrieving member");
      }else {
        if (!member) {
          res.statusCode = 404;
          console.log("Member not found - get")
        }
        res.json(member);
      }
    });
};

// exports.getFilteredMembers = function(req,res){
//   console.log('Get members in array of ids');
//   var obj_ids = req.body.map(function(id) { return ObjectId(id); })
//   Member.find({"_id": {
//     $elemMatch: {
//       id: {
//         $in: obj_ids
//       }
//     }
//   }})
//   .exec(function(err, members){
//     if (err){
//       console.log("Error retrieving filtered member");
//     }else {
//       res.json(members);
//       console.log('Filterd members', res.json(members))
//     }
//   });
// }


exports.postMember=function(req, res){
  console.log('Post a member1');
  console.log('User?', req.body);
  var newMember = new Member();
  newMember.firstName = req.body.firstName;
  newMember.lastName = req.body.lastName;
  newMember.currentHCap  = req.body.currentHCap;
  newMember.user = req.user._id;

  newMember.save(function(err, insertedMember){
    if (err){
      console.log('Error saving member');
    }else{
      console.log('User2',insertedMember);
      res.json(insertedMember);
    }
  });
};
exports.putMember = function(req, res, next){
  console.log('Update a member', req.params.id);
  Member.findByIdAndUpdate(req.params.id,
   req.body)
   .then(function(){
     Member.findOne({_id:req.params.id}).then(function(member){
       res.send(member)
     });
   })
   .catch(function(err){
      err = res.status(400).json('Error: ' + err)
      console.log('Error :', err.statusMessage)
   })
};

// exports.putMember=function(req, res){
//   console.log('Update a member');
//   Member.findByIdAndUpdate(req.params.id,
//     {
//       $set: {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         currentHCap: req.body.currentHCap,
//         user: req.body.user}
//     },
//     {
//       new: true
//     },
//     function(err, updatedMember){
//       if(err){
//         res.send("Error updating member");
//       }else{
//         res.json(updatedMember);
//       }
//     }
//   );
// };

exports.deleteMember=function(req, res){
  console.log('Deleting a member');
  Member.findByIdAndRemove(req.params.id, function(err, deletedMember){
    if(err){
      res.send("Error deleting member");
    }else{
      res.json(deletedMember);
    }
  });
};
