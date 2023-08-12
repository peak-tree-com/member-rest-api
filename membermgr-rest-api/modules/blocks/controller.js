const Block = require('./model');
const Room = require("./../rooms/model");
const blockCtl = {};

blockCtl.getAll = (req, res, next)=>{
    // for (let x in req.query) {
    //     req.query[x] = new RegExp(req.query[x], 'i');
    // }
    // Room.find(req.query).then((data)=>{
    //     res.status(200).send(data);
    // }).catch(next);
    // An empty find method will return all Posts
    Block.find()
    .populate('_rooms')
    .then(Blocks => {
        res.json(Blocks)
    })
    .catch(err => {
        res.json({ message: err.message })
    });
};

// blockCtl.get = (req, res, next)=>{
//     // Room.findById(req.params.id).then((data)=>{
//     Room.findOne({ name:req.params.block_name }).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

blockCtl.create = (req, res, next)=>{
    // console.log("block create");
    Block.create(req.body).then((data)=>{
        console.log(data);
        res.status(201).send(data);
    })
    .catch(err => {
        res.json({ message: err.message })
    });
};

// blockCtl.update = (req, res, next)=>{
//     Room.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
//         Room.findById(req.params.id).then((data)=>{
//             res.status(200).send(data);
//         });
//     }).catch(next);
// };

// blockCtl.delete = (req, res, next)=>{
//     Room.findByIdAndRemove({_id:req.params.id}).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

exports = module.exports = blockCtl;