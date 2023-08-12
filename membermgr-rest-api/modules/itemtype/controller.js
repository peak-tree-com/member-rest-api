const ItemType = require('./model');
const Room = require("./../rooms/model");
const itemtypeCtl = {};

itemtypeCtl.getAll = (req, res, next)=>{
    // for (let x in req.query) {
    //     req.query[x] = new RegExp(req.query[x], 'i');
    // }
    // Room.find(req.query).then((data)=>{
    //     res.status(200).send(data);
    // }).catch(next);
    // An empty find method will return all Posts
    ItemType.find()
    .populate('_rooms')
    .then(ItemTypes => {
        res.json(ItemTypes)
    })
    .catch(err => {
        res.json({ message: err.message })
    });
};

// itemtypeCtl.get = (req, res, next)=>{
//     // Room.findById(req.params.id).then((data)=>{
//     Room.findOne({ name:req.params.itemtype_name }).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

itemtypeCtl.create = (req, res, next)=>{
    // console.log("itemtype create");
    ItemType.create(req.body).then((data)=>{
        console.log(data);
        res.status(201).send(data);
    })
    .catch(err => {
        res.json({ message: err.message })
    });
};

// itemtypeCtl.update = (req, res, next)=>{
//     Room.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
//         Room.findById(req.params.id).then((data)=>{
//             res.status(200).send(data);
//         });
//     }).catch(next);
// };

// itemtypeCtl.delete = (req, res, next)=>{
//     Room.findByIdAndRemove({_id:req.params.id}).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

exports = module.exports = itemtypeCtl;
