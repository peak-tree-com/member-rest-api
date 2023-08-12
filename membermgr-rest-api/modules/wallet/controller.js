const Wallet = require('./model');
const walletCtrl = {};

walletCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    Wallet.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

walletCtrl.get = (req, res, next)=>{
    Wallet.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

walletCtrl.getMemberWallet = (req, res, next)=>{
    console.log(req.query);
    query = {};
    query['membership_id'] = req.query.mbr_id;
    Wallet.find(query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

walletCtrl.create = (req, res, next)=>{
    Wallet.create(req.body).then((data)=>{
        res.status(201).send(data);
    }).catch(next);
};

walletCtrl.update = (req, res, next)=>{
    Wallet.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Wallet.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

walletCtrl.delete = (req, res, next)=>{
    Wallet.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

exports = module.exports = walletCtrl;