const fs = require('fs');
const path = require('path');
const Item = require('./model');
const ItemType = require('./../itemtype/model');
const json2xls = require('json2xls');

// const Block = require('./../blocks/model');
const itemCtrl = {};

itemCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    console.log(req.query);
    Item.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

itemCtrl.findAll = (req, res, next)=>{
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

    Item.find({}, {}, query).then((data) => {
        Item.count().then((count) => {
        console.log("Total number of records:", count);
        let totalPages = Math.ceil(count / size);
        response = { "data": data, "pages": totalPages, "count": count };
        console.log('response:', response);
        res.status(200).send(response);
    });
    }).catch(next);

};

itemCtrl.getAllItemCode = (req, res, next)=>{
    Item.find(req.query).select({'item_code':1,'_id':0}).then((data)=>{
        let codes = []
        for (var i = 0; i < data.length; i++) {
            codes.push(data[i].item_code)
        }
        res.status(200).send(codes);
    }).catch(next);
};



itemCtrl.generateBarCode = (req, res, next)=>{
    Item.findById(req.params.id).then((data)=>{
        let file_content = getcontent(data);
        let file = path.resolve(__dirname, '../../barcode/'+data.item_code+'.pnr');
        console.log(file);
        fs.writeFile (file, file_content, function(err) {
            if (err) throw err;
            console.log('complete');
            res.download(file);
        });
        
    }).catch(next);
};

getcontent = (data)=>{
    let content = 'OPTIMIZE "BATCH" ON\n';
    content += 'PP14,120:AN7\n';
    content += 'BARSET "CODE128B",2,1,2,32\n';
    content += 'PB "' + data.item_code + '"\n';
    content += 'PP69,88:NASC 8\n';
    content += 'FT "CG Triumvirate Condensed Bold",10,0,99\n';
    content += 'PT "' + data.item_code + '"\n';
    content += 'PP291,120:BARSET "CODE128B",2,1,2,32\n';
    content += 'PB "' + data.item_code + '"\n';
    content += 'PP346,88:FT "CG Triumvirate Condensed Bold",10,0,99\n';
    content += 'PT "' + data.item_code + '"\n';
    content += 'PP565,120:BARSET "CODE128B",2,1,2,32\n';
    content += 'PB "' + data.item_code + '"\n';
    content += 'PP623,88:FT "CG Triumvirate Condensed Bold",10,0,99\n';
    content += 'PT "' + data.item_code + '"\n';
    content += 'PP22,164:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "' + data.description + '"\n';
    content += 'PP299,164:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "' + data.description + '"\n';
    content += 'PP576,164:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "' + data.description + '"\n';
    content += 'PP22,36:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "MRP:"\n';
    content += 'PP299,36:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "MRP:"\n';
    content += 'PP576,36:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "MRP:"\n';
    content += 'PP86,36:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "'+ (Math.round(data.selling_cost * 100.0) / 100).toFixed(2) + '"\n';
    content += 'PP363,36:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "'+ (Math.round(data.selling_cost * 100.0) / 100).toFixed(2) +'"\n';
    content += 'PP640,36:FT "CG Triumvirate Condensed Bold",8,0,120\n';
    content += 'PT "'+ (Math.round(data.selling_cost * 100.0) / 100).toFixed(2) +'"\n';
    content += 'LAYOUT RUN ""\n';
    content += 'PF\n';
    content += '\n';
    return content;
};

itemCtrl.get = (req, res, next)=>{
    Item.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};


itemCtrl.create = (req, res, next)=>{

    Item.create(req.body).then((data)=>{
        console.log(data);
        res.status(201).send(data);
    }).catch(next);

    console.log("I am here");

   
};

itemCtrl.update = (req, res, next)=>{
    Item.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Item.findById(req.params.id).then((data)=>{
            res.status(200).send(data);
        });
    }).catch(next);
};

itemCtrl.delete = (req, res, next)=>{
    Item.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

itemCtrl.textSearch = (req, res, next)=>{
    console.log(req.query)
    search = new RegExp(req.query.q, 'i');
    Item.find({$or:[{'category':search}]})
      .then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};


itemCtrl.getItemReportXls = (req, res, next)=>{
    // console.log(Promise.resolve(NumberSeries.find({})));
    console.log('entered');
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    Item.find(req.query).then((data)=>{
            console.log(data);
            if (data.length == 0){
                res.status(200).send("No data found !");
            }
            for(let i=0;i<data.length;i++) {
                let price = parseFloat((data[i]['selling_cost']/(1+(data[i]['tax_per']/100))).toFixed(2))
                let tax_amt = +(price * data[i]['tax_per']/100).toFixed(2)
                data[i]['price'] = price;
                data[i]['tax_amt'] = tax_amt;
            }
            
            let file = path.resolve(__dirname, '../../reports/item-report.xlsx');
            let xls = json2xls(data,{
                fields: ['category','description','vendor_code','item_code','price','tax_per','tax_amt','selling_cost']
            });
            fs.writeFileSync (file, xls, 'binary');
            res.download(file);
    }).catch(next);
};

exports = module.exports = itemCtrl;
