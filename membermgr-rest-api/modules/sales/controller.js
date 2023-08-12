const fs = require('fs');
const path = require('path');
const moment = require('moment');
const Sales = require('./model');
// const NumberSeries = require('./series_model');
const json2xls = require('json2xls');
//const Block = require('./../blocks/model');
const salesCtrl = {};

salesCtrl.getFormattedDate = (date) => {
    date = new Date(date);
    let dd = date.getDate(),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (dd < 10 ? '0' + dd : dd) + '-' + months[date.getMonth()] + '-' + date.getFullYear();
}

salesCtrl.getAll = (req, res, next)=>{
    // console.log(Promise.resolve(NumberSeries.find({})));
    
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    Sales.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

salesCtrl.get = (req, res, next)=>{
    Sales.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

salesCtrl.textSearch = (req, res, next)=>{ 
    search = new RegExp(req.query.q, 'i');
    console.log(search)
    Sales.find({$or:[{'customer':search}]})
      .then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};


// salesCtrl.getObj = ()=>{
//     return Sales.find({});
// };

// salesCtrl.getAvailableObj = (br)=>{
//     return Sales.find({sales_no: {$nin: br}}, (error, saless) => {
//     // console.log(saless);
//     // callback(error, users);?
//     return saless;
//   });
// };


salesCtrl.create = (req, res, next)=>{
    // NumberSeries.findOne().then((obj) => {
        req.body.inv_no ;

        // NumberSeries.findByIdAndUpdate({_id:obj._id}, {inv_no:req.body.inv_no});

        fs.readFile('./modules/sales/number.txt', 'utf8', function (err, data) {
            if (err) throw err;
            let inv_no = parseInt(data)
            req.body.inv_no = inv_no;
            Sales.create(req.body).then(data=>{
                console.log('-------------------------');
                console.log(data);
                console.log('-------------------------');
                fs.writeFile ('./modules/sales/number.txt', (inv_no + 1), function(err) {
                    if (err) throw err;
                    console.log('complete');
                    res.status(201).send(data);
                });

                // NumberSeries.findByIdAndUpdate({_id:obj._id}, {inv_no:obj.inv_no + 1});
                
            }).catch(next);
            //Do your processing, MD5, send a satellite to the moon, etc.
            
        });
        console.log(req.body);
        
    // });
};

salesCtrl.update = (req, res, next)=>{
    Sales.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Sales.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

salesCtrl.delete = (req, res, next)=>{
    Sales.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

salesCtrl.getSalesReport = (req, res, next)=>{
    // console.log(Promise.resolve(NumberSeries.find({})));

    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : new Date();
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : enddate.addDays(-30);
    console.log("startdate",startdate);
    console.log("enddate",enddate);
    
    Sales.find({
            'inv_date': { '$lte': enddate },
            'inv_date': { '$gte': startdate}
        }).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};


salesCtrl.getSalesReportXls = (req, res, next)=>{
    // console.log(Promise.resolve(NumberSeries.find({})));

    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : new Date();
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : enddate.addDays(-30);
    console.log("startdate",startdate);
    console.log("enddate",enddate);
    
    Sales.find({
            'inv_date': { '$lte': enddate },
            'inv_date': { '$gte': startdate}
        }).then((data)=>{
            if (data.length == 0){
                res.status(200).send("No data found !");
            }
            for(let i=0;i<data.length;i++) {
                data[i]['inv_date'] = salesCtrl.getFormattedDate(data[i].inv_date);
            }

            // console.log(data);
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



// salesCtrl.getPageSales = (req, res, next)=>{

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

//     Sales.find({}, {}, query).then((data) => {
//         Sales.count().then((count) => {
//         console.log("Total number of records:", count);
//         let totalPages = Math.ceil(count / size);
//         response = { "data": data, "totalpages": totalPages };
//         console.log('response:', response);
//         res.status(200).send(response);
//     });
//     }).catch(next);

salesCtrl.getPageSales = (req, res, next)=>{
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

    Sales.find({}, {}, query).then((data) => {
        Sales.count().then((count) => {
            console.log("Total number of records:", count);
            let totalPages = Math.ceil(count / size);
            response = { "data": data, "pages": totalPages, "count": count };
            console.log('response:', response);
            res.status(200).send(response);
        });
    }).catch(next);

};

exports = module.exports = salesCtrl;
