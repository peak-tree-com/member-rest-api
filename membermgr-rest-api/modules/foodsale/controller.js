const FoodSale = require('./model');
const NextIdCtrl = require('../nextid/controller');
const json2xls = require('json2xls');
//const Block = require('./../blocks/model');
const FoodSaleCtrl = {};

FoodSaleCtrl.getFormattedDate = (date) => {
    date = new Date(date);
    let dd = date.getDate(),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (dd < 10 ? '0' + dd : dd) + '-' + months[date.getMonth()] + '-' + date.getFullYear();
}

FoodSaleCtrl.getAll = (req, res, next)=>{
    // console.log(Promise.resolve(NumberSeries.find({})));
    
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    FoodSale.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

FoodSaleCtrl.get = (req, res, next)=>{
    FoodSale.findOne({'bookingid':req.params.id}).then((data)=>{
        // console.log(data, typeof(data));
        if(data == null) {
            data = {'inv_no':0};
        }
        res.status(200).send(data);
    }).catch(next);
};

// FoodSaleCtrl.get = (req, res, next)=>{
//     FoodSale.findById(req.params.id).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

FoodSaleCtrl.textSearch = (req, res, next)=>{ 
    search = new RegExp(req.query.q, 'i');
    // console.log(search)
    FoodSale.find({$or:[{'customer':search}]})
      .then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};


// FoodSaleCtrl.getObj = ()=>{
//     return FoodSale.find({});
// };

// FoodSaleCtrl.getAvailableObj = (br)=>{
//     return FoodSale.find({sales_no: {$nin: br}}, (error, saless) => {
//     // console.log(saless);
//     // callback(error, users);?
//     return saless;
//   });
// };


FoodSaleCtrl.create = (req, res, next)=>{
    // console.log(req.body);
    NextIdCtrl.getNextId().then((nextid_data) => {
        var nextid = nextid_data['food_inv_id']; //1
        var objectid = nextid_data['_id'];
        req.body.inv_no = nextid; //1
        // console.log(req.body);
        FoodSale.create(req.body).then((foodsale_data) => {
            nextid_data['food_inv_id'] = nextid + 1;
            NextIdCtrl.updateNextId(objectid, nextid_data).then((data) => {
                res.status(201).send({
                    success: true,
                    data: foodsale_data
                });
            }).catch(next);
        }).catch(next);
    }).catch(next);

};

FoodSaleCtrl.update = (req, res, next)=>{
    // console.log(req.params.id);
    if(req.body.inv_no == 0){
        NextIdCtrl.getNextId().then((nextid_data) => {
            var nextid = nextid_data['food_inv_id']; //1
            var objectid = nextid_data['_id'];
            req.body.inv_no = nextid; //1
            // console.log(req.body);
            FoodSale.create(req.body).then((foodsale_data) => {
                nextid_data['food_inv_id'] = nextid + 1;
                NextIdCtrl.updateNextId(objectid, nextid_data).then((data) => {
                    res.status(201).send({
                        success: true,
                        data: foodsale_data
                    });
                }).catch(next);
            }).catch(next);
        }).catch(next);
    } else {
        FoodSale.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
            FoodSale.findById(req.params.id).then((data)=>{
                res.status(200).send(data);
            });
        }).catch(next);
    }
    
};

FoodSaleCtrl.delete = (req, res, next)=>{
    FoodSale.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

FoodSaleCtrl.getFoodSaleReport = (req, res, next)=>{
    // console.log(Promise.resolve(NumberSeries.find({})));

    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : new Date();
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : enddate.addDays(-30);
    console.log("startdate",startdate);
    console.log("enddate",enddate);
    
    FoodSale.find({
            'inv_date': { '$lte': enddate },
            'inv_date': { '$gte': startdate}
        }).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};


FoodSaleCtrl.getFoodSaleReportXls = (req, res, next)=>{
    // console.log(Promise.resolve(NumberSeries.find({})));

    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : new Date();
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : enddate.addDays(-30);
    console.log("startdate",startdate);
    console.log("enddate",enddate);
    
    FoodSale.find({
            'inv_date': { '$lte': enddate },
            'inv_date': { '$gte': startdate}
        }).then((data)=>{
            for(let i=0;i<data.length;i++) {
                data[i]['inv_date'] = FoodSaleCtrl.getFormattedDate(data[i].inv_date);
            }
            console.log(data);
            let file = path.resolve(__dirname, '../../reports/sales-report.xlsx');
            let xls = json2xls(data,{
                fields: ['inv_no','inv_date','total_amount','total_tax','CC','Cr.no','total_discount','bill_amount']
            });
            fs.writeFileSync (file, xls, 'binary');
            // console.log('complete');
            res.download(file);
        // res.status(200).send(data);
    }).catch(next);
};



// FoodSaleCtrl.getPageFoodSale = (req, res, next)=>{

//     let pageNo = parseInt(req.params.pgno);
//     console.log("Pageno:", pageNo);
//     let query = {};
//     let size = 10;

//     if (pageNo < 0 || pageNo === 0) {
//         response = {"message": "invalid page number, should start with 1" };
//         res.status(200).send(response);
//     }

//     query.skip = size * (pageNo - 1);
//     query.limit = size;

//     // query.skip = 2;
//     // query.limit = size;

//     // MyModel.find(query, fields, { skip: 10, limit: 5 }, function (err, results) { ... });

//     FoodSale.find({}, {}, query).then((data) => {
//         FoodSale.count().then((count) => {
//         console.log("Total number of records:", count);
//         let totalPages = Math.ceil(count / size);
//         response = { "data": data, "totalpages": totalPages };
//         console.log('response:', response);
//         res.status(200).send(response);
//     });
//     }).catch(next);

FoodSaleCtrl.getPageFoodSale = (req, res, next)=>{
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

    FoodSale.find({}, {}, query).then((data) => {
        FoodSale.count().then((count) => {
            console.log("Total number of records:", count);
            let totalPages = Math.ceil(count / size);
            response = { "data": data, "pages": totalPages, "count": count };
            console.log('response:', response);
            res.status(200).send(response);
        });
    }).catch(next);

};

exports = module.exports = FoodSaleCtrl;
