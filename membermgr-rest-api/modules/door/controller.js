// const User   = require('./modules/login/model'); // get our mongoose modelconst doorCtrl = {};
const doorCtrl = {};


doorCtrl.getAccess = (req, res, next)=>{
    // for (let x in req.query) {
    //     req.query[x] = new RegExp(req.query[x], 'i');
    // }
    // User.find(req.query).then((data)=>{
    //     res.status(200).send(data);
    // }).catch(next);
    let info = req.query;
    console.log(info);
    if (isEmptyObject(info)) {
        res.status(400).send({'access':'false','message':'info not found'});
    } else {
        if (info['id'] && info['id'] == 'admin') {
            res.status(200).send({'access':true, 'message':'authorized person'});
        }
        res.status(401).send({'access':false, 'message':'unauthorized'});
    }
};

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

// doorCtrl.get = (req, res, next)=>{
//     Branch.findById(req.params.id).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

// doorCtrl.create = (req, res, next)=>{
//     Branch.create(req.body).then((data)=>{
//         res.status(201).send(data);
//     }).catch(next);
// };

// doorCtrl.update = (req, res, next)=>{
//     Branch.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
//         Branch.findById(req.params.id).then((data)=>{
//             res.status(200).send(data);
//         });
//     }).catch(next);
// };

// doorCtrl.delete = (req, res, next)=>{
//     Branch.findByIdAndRemove({_id:req.params.id}).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

exports = module.exports = doorCtrl;