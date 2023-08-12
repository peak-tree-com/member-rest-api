
const ItemJrnl = require('./model');
//const Block = require('./../blocks/model');
const itemjrnlCtrl = {};

itemjrnlCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    ItemJrnl.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

itemjrnlCtrl.getObj = ()=>{
    return ItemJrnl.find({});
};

itemjrnlCtrl.getAvailableObj = (br)=>{
    return ItemJrnl.find({itemjrnl_no: {$nin: br}}, (error, itemjrnls) => {
    // console.log(itemjrnls);
    // callback(error, users);?
    return itemjrnls;
  });
};


itemjrnlCtrl.create = (req, res, next)=>{
    ItemJrnl.create(req.body).then(data=>{
        console.log(data);
        res.status(201).send(data);
    }).catch(next);
};

itemjrnlCtrl.update = (req, res, next)=>{
    ItemJrnl.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        ItemJrnl.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

// itemjrnlCtrl.delete = (req, res, next)=>{
//     ItemJrnl.findByIdAndRemove({_id:req.params.id}).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

exports = module.exports = itemjrnlCtrl;
