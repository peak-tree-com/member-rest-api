
const Room = require('./model');
const Block = require('./../blocks/model');
const roomCtrl = {};

roomCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    Room.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

roomCtrl.getObj = ()=>{
    return Room.find({});
};

roomCtrl.getAvailableObj = (br)=>{
    return Room.find({room_no: {$nin: br}}, (error, rooms) => {
    // console.log(rooms);
    // callback(error, users);?
    return rooms;
  });
};


roomCtrl.getAllRoomCount = ()=>{
    return Room.find({}, (err, rooms) => {
      return rooms;
  });
};

roomCtrl.create = (req, res, next)=>{

    // Room.create(req.body).then((data)=>{
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
      // console.log(req.body, typeof req.body);
      let final_rooms = [];
      let rooms = [];
      if (req.body instanceof Array){
          rooms = req.body;
      } else {
          rooms.push(req.body);
      }
      for(let i=0;i<rooms.length;i++) {
        final_rooms.push(new Room({
          name : rooms[i]['name'],
          room_no : rooms[i]['room_no'],
          capacity : rooms[i]['capacity'],
          cost : rooms[i]['cost'],
          roomtype : rooms[i]['roomtype'],
          branch : rooms[i]['branch'],
          _block : block._id
        }));
      }
      Room.create(final_rooms).then((data)=>{
          console.log(data,typeof data);
          for(let i=0;i<data.length;i++){
            block._rooms.push(data[i]);
          }
          block.save(function (err) {
            if (err) return handleError(err);
            res.status(201).send(data);
          })
      }).catch(err => {
          return res.json({message:err.message})
      });
    }).catch(err => {
        return res.json({message:err.message})
    });
};

roomCtrl.update = (req, res, next)=>{
    Room.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Room.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

// roomCtrl.delete = (req, res, next)=>{
//     Room.findByIdAndRemove({_id:req.params.id}).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

exports = module.exports = roomCtrl;