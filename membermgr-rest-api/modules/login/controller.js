
const User = require('./model');
const userCtl = {};

userCtl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    User.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

userCtl.textSearch = (req, res, next)=>{
    console.log(req.query)
    search = new RegExp(req.query.q, 'i');
    User.find({$or:[{'username':search}]})
      .then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

userCtl.get = (req, res, next)=>{
    User.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

userCtl.create = (req, res, next)=>{
    User.create(req.body).then((data)=>{
        res.status(201).send(data);
    }).catch(next);
};

userCtl.update = (req, res, next)=>{
    User.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        User.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

userCtl.delete = (req, res, next)=>{
    User.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

exports = module.exports = userCtl;