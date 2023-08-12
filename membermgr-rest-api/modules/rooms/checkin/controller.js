
const Roomcheckin = require('./model');
const Block = require('./../../blocks/model');
const roomcheckinCtrl = {};

roomcheckinCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    Roomcheckin.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

roomcheckinCtrl.getObj = ()=>{
    return Roomcheckin.find({});
};

roomcheckinCtrl.getAvailableObj = (br)=>{
    return Roomcheckin.find({room_no: {$nin: br}}, (error, rooms) => {
    // console.log(rooms);
    // callback(error, users);?
    return rooms;
  });
};


roomcheckinCtrl.create = (req, res, next)=>{

    // Roomcheckin.create(req.body).then((data)=>{
    //     console.log(data);
    //     res.status(201).send(data);
    // }).catch(next);

    // console.log("I am here");

    Block.findOne({ name: req.params.block_name }, function(error, block) {
      if (error) {
        return handleError(error);
      }
      else if(!block) {
        return next('Block '+ req.params.block_name +' Not Found');
      }
      var room = new Room({
          name : req.body.name,
          room_no : req.body.room_no,
          capacity : req.body.capacity,
          cost : req.body.cost,
          roomtype : req.body.roomtype,
          branch : req.body.branch,
          _block : block._id
      });
      Roomcheckin.create(room).then((data)=>{
          // console.log(block);
          block._rooms.push(data);
          block.save(function (err) {
            if (err) return handleError(err);
            res.status(201).send(data);
          })
      })
      .catch(err => {
        return res.json({message:err.message})
      });
    })
    .catch(err => {
        return res.json({message:err.message})
    });
};

roomcheckinCtrl.update = (req, res, next)=>{
    Roomcheckin.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Roomcheckin.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

// roomcheckinCtrl.delete = (req, res, next)=>{
//     Roomcheckin.findByIdAndRemove({_id:req.params.id}).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

exports = module.exports = roomcheckinCtrl;