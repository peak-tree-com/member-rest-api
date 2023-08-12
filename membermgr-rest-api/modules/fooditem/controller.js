const Food = require('./model');
const FoodType = require('./../itemtype/model');

// const Block = require('./../blocks/model');
const foodCtrl = {};

foodCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    console.log(req.query);
    Food.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

foodCtrl.findAll = (req, res, next)=>{
    let pageNo = parseInt(req.query.pgno);
    let limit = parseInt(req.query.limit);
    console.log("Pageno:", pageNo);
    let query = {};
    let size = limit;

    if (pageNo < 0 || pageNo === 0) {
        response = {"message": "invalid page number, should start with 1" };
        res.status(200).send(response);
    }

    query.skip = size * (pageNo - 1);
    query.limit = size;

    // query.skip = 2;
    // query.limit = size;

    // MyModel.find(query, fields, { skip: 10, limit: 5 }, function (err, results) { ... });

    Food.find({}, {}, query).then((data) => {
        Food.count().then((count) => {
        console.log("Total number of records:", count);
        let totalPages = Math.ceil(count / size);
        response = { "data": data, "pages": totalPages, "count": count };
        console.log('response:', response);
        res.status(200).send(response);
    });
    }).catch(next);

};

foodCtrl.getAllFoodName = (req, res, next)=>{
    Food.find(req.query).select({'food_name':1,'_id':0}).then((data)=>{
        let food_names = []
        for (var i = 0; i < data.length; i++) {
            food_names.push(data[i].food_name)
        }
        res.status(200).send(food_names);
    }).catch(next);
};


foodCtrl.get = (req, res, next)=>{
    Food.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};


foodCtrl.create = (req, res, next)=>{
    Food.create(req.body).then((data)=>{
        res.status(201).send(data);
    }).catch(next);
};

foodCtrl.update = (req, res, next)=>{
    Food.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Food.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

foodCtrl.delete = (req, res, next)=>{
    Food.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

foodCtrl.textSearch = (req, res, next)=>{
    console.log(req.query)
    search = new RegExp(req.query.q, 'i');
    Food.find({$or:[{'food_name':search}]})
      .then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

exports = module.exports = foodCtrl;
