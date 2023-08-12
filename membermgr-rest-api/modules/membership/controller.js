
const Membership = require('./model');
const membershipCtrl = {};

membershipCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    Membership.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

membershipCtrl.get = (req, res, next)=>{
    Membership.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

membershipCtrl.create = (req, res, next)=>{
    Membership.create(req.body).then((data)=>{
        res.status(201).send(data);
    }).catch(next);
};

membershipCtrl.update = (req, res, next)=>{
    Membership.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Membership.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

membershipCtrl.delete = (req, res, next)=>{
    Membership.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

exports = module.exports = membershipCtrl;