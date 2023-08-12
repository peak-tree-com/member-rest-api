
const Branch = require('./model');
const branchCtrl = {};

branchCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    Branch.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

branchCtrl.get = (req, res, next)=>{
    Branch.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

branchCtrl.create = (req, res, next)=>{
    Branch.create(req.body).then((data)=>{
        res.status(201).send(data);
    }).catch(next);
};

branchCtrl.update = (req, res, next)=>{
    Branch.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Branch.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

branchCtrl.delete = (req, res, next)=>{
    Branch.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

exports = module.exports = branchCtrl;