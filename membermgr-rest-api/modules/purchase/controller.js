const Purchase = require('./model');
const PurchaseLineItem = require('./model');
// const Block = require('./../');
const purchaseCtrl = {};

purchaseCtrl.getAll = (req, res, next)=>{
  console.log("purchase get all");
    // for (let x in req.query) {
    //     req.query[x] = new RegExp(req.query[x], 'i');
    // }
    // Purchase.find(req.query).then((data)=>{
    //     res.status(200).send(data);
    // }).catch(next);

    Purchase.find()
      .populate('line_items')
      .then(Purchases => {
          res.json(Purchases)
      })
      .catch(err => {
        res.json({ message: err.message })
    });
};

purchaseCtrl.getObj = ()=>{
    return Purchase.find({});
};

purchaseCtrl.getAvailableObj = (br)=>{
    return Purchase.find({item_no: {$nin: br}}, (error, items) => {
    // console.log(items);
    // callback(error, users);?
    return items;
  });
};

purchaseCtrl.get = (req, res, next)=>{
    Purchase.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};


purchaseCtrl.create = (req, res, next)=>{
    Purchase.create(req.body).then((data)=>{
        res.status(201).send(data);
    }).catch(next);
    // console.log(req.body);
    // let line_items = req.body.line_items;
    // delete req.body.line_items;
    // console.log(line_items);
    // console.log(req.body);

    // Purchase.create(req.body).then((data)=>{
    //     Purchase.findOne({ _id: data._id }, function(error, purchase) {
    //       if (error) {
    //         return handleError(error);
    //       }

    //       console.log(line_items);
    //       console.log(purchase._id);

    //       for (let li in line_items) {
    //           line_items[li].purchase_line_item = purchase._id;
    //           console.log("-----------------------");
    //           console.log(line_items[li]);
    //           console.log("-----------------------");

    //           PurchaseLineItem.create(line_items[li]).then((data)=>{
    //           // console.log(block);
    //             purchase.line_items.push(data);
    //             purchase.save();

    //           }).catch(err => {
    //             return res.json({message:err.message})
    //         });
    //       }
          
    //       res.status(201).send({"success": true});
         

    //     });
};

purchaseCtrl.update = (req, res, next)=>{
    Purchase.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Purchase.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

purchaseCtrl.delete = (req, res, next)=>{
    Purchase.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

purchaseCtrl.textSearch = (req, res, next)=>{
    search = new RegExp(req.query.q, 'i');
    Purchase.find({$or:[{'vendor_inv_no':search}]})
      .then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

exports = module.exports = purchaseCtrl;
