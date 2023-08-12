
const Member = require('./../members/model');
const onlineMemberCtrl = {};

 // const ccav = require('./../payment/ccavutil.js');
 const qs = require('querystring');
 // const ccavReqHandler = require('./../payment/ccavRequestHandler.js');
 // const ccavResHandler = require('./../payment/ccavResponseHandler.js');

// memberCtrl.getAll = (req, res, next)=>{
//     for (let x in req.query) {
//         req.query[x] = new RegExp(req.query[x], 'i');
//     }
//     Member.find(req.query).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

// memberCtrl.textSearch = (req, res, next)=>{
//     search = new RegExp(req.query.q, 'i');
//     Member.find({$or:[{'name':search},{'sex':search},{'branch':search}]})
//       .then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

// memberCtrl.get = (req, res, next)=>{
//     Member.findById(req.params.id).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

onlineMemberCtrl.create = (req, res, next)=>{
    console.log("$$$$$$$$$$$$$$$$$$ entered into the controller");
    // req.body.is_active = false;
    console.log(req.body);
    Member.create(req.body).then((data)=>{
        data['success'] = true;

        let res_data =  {
            success : true,
            data : data,
            message : ""
        }
        console.log(res_data);
        res.status(201).send(res_data);
    }).catch(err => {
	    console.log(err.message);
        console.log(err.message);
        res.json({ success: false, message: err.message });
    });
};

onlineMemberCtrl.payment = (req, res, next)=>{
    console.log('===========================');
    ccavReqHandler.postReq(req, res, next);
    res.end();

        // ccavResHandler.postRes(request, response);
}

// memberCtrl.update = (req, res, next)=>{
//     Member.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
//         Member.findById(req.params.id).then((data)=>{
//             res.status(200).send(data);
//         });
//     }).catch(next);
// };

// memberCtrl.delete = (req, res, next)=>{
//     Member.findByIdAndRemove({_id:req.params.id}).then((data)=>{
//         res.status(200).send(data);
//     }).catch(next);
// };

exports = module.exports = onlineMemberCtrl;
