const Nextid = require('./model');

const nextIdCtl = {};

nextIdCtl.get = (req, res, next)=>{
    // Nextid.findById(req.params.id).then((data)=>{
    Nextid.findOne().then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

nextIdCtl.getNextId = (req, res, next)=>{
     return Nextid.findOne({}, (err, nextid) => {
      return nextid;
  });
   
};

nextIdCtl.create = (req, res, next)=>{
    // console.log("block create");
    Nextid.create(req.body).then((data)=>{
        console.log(data);
        res.status(201).send(data);
    })
    .catch(err => {
        res.json({ message: err.message })
    });
};

nextIdCtl.update = (req, res, next)=>{
    Nextid.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Nextid.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

nextIdCtl.updateNextId = (id, data)=>{
   return Nextid.findByIdAndUpdate({_id:id}, data).then((data)=>{
       return data;
    });
};

// nextIdCtl.delete = (req, res, next)=>{
//     Nextid.findByIdAndRemove({_id:req.params.id}).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

exports = module.exports = nextIdCtl;