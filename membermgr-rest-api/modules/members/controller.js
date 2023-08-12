const Member = require('./model');
const memberCtrl = {};
const NextIdCtrl = require('../nextid/controller');

memberCtrl.pad = (n, width, z) =>{
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

memberCtrl.createFamilyMbrData = (main_member) =>{
    var final_mbr_data = [];
    var albt = ['A','B','C']
    final_mbr_data.push(main_member);
    for(let i=0; i<parseInt(main_member.family_member_count);i++) {
        let temp = {};
        if(i == 0){
            temp['name'] = main_member.family_member1;
        }
        if(i == 1) {
            temp['name'] = main_member.family_member2;
        } 
        if(i == 2) {
            temp['name'] = main_member.family_member3;
        } 
        temp['membership_type'] = main_member.membership_type
        temp['branch'] = main_member.branch
        temp['email'] = main_member.email
        temp['res_address'] = main_member.res_address
        temp['res_city'] = main_member.res_city
        temp['res_state'] = main_member.res_state
        temp['res_pincode'] = main_member.res_pincode
        temp['res_country'] = main_member.res_country
        temp['nationality'] = main_member.nationality
        temp['religion'] = main_member.religion
        temp['created_by'] = main_member.created_by
        temp['is_active'] = main_member.is_active
        temp['membership_id'] = main_member.membership_id.slice(0, 7) + albt[i] + main_member.membership_id.slice(7);
        temp['password'] = main_member.password+albt[i]
        final_mbr_data.push(temp);
    }
    return final_mbr_data;
}

memberCtrl.generatePassword = (member_id) =>{
    // let dob = new Date(date_of_birth);
    // let date = dob.getDate();
    // let month = dob.getMonth();
    // let year = dob.getFullYear();
  
    // return member_id +'-'+date_of_birth.replace('-', '/').split('T')[0].replace('-', '/');
    let id = member_id.split('/')
    return 'ymca@'+id[1];
}

memberCtrl.getAll = (req, res, next)=>{
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    Member.find(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

memberCtrl.textSearch = (req, res, next)=>{ 
    search = new RegExp(req.query.q, 'i');
    Member.find({$or:[{'name':search},{'sex':search},{'branch':search},{'membership_id':search}]})
      .then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

memberCtrl.get = (req, res, next)=>{
    Member.findById(req.params.id).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

memberCtrl.getMember = (req, res, next)=>{
    console.log(req.query);
    Member.findOne(req.query).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

memberCtrl.create = (req, res, next)=>{
    req.body.membership_id = 0
    // console.log(req.body);
    
    NextIdCtrl.getNextId().then((nextid_data) => {
        var branch = req.body.branch;
        var final_member_data = [];
        var nextid = nextid_data['member_id'][branch]; //1
        var objectid = nextid_data['_id'];
        var year = new Date().getFullYear();
        req.body.membership_id = branch + '/' + memberCtrl.pad(nextid,3) + '/' +year.toString();//1
        req.body.password = memberCtrl.generatePassword(req.body.membership_id);
        if (req.body.membership_type == 'FAMILY') {
           final_member_data = memberCtrl.createFamilyMbrData(req.body);
        } else {
            final_member_data.push(req.body);
        }
        // console.log(req.body.membership_id);
        // console.log(req.body.password);
        // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$');
        // console.log(final_member_data);
        // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$');
        Member.create(final_member_data).then((member_data)=>{
            nextid_data['member_id'][branch] = nextid + 1;
            // console.log(nextid_data);
            NextIdCtrl.updateNextId(objectid, nextid_data).then((nextid_data)=>{
                    res.status(201).send({ 
                    success:true,
                    data:member_data[0]
                });
            }).catch(err => {
                   console.log(err.message);
                res.status(400).send({
                    success:false,
                    message: err.message 
                })
            });
        }).catch(err => {

            console.log(err.message);
            res.status(400).send({
                success:false,
                message: err.message 
            })
        });
    }).catch(err => {
        console.log(err.message);
        res.status(400).send({
            success:false,
            message: err.message 
        })
    });
    
};

memberCtrl.add_member = (req, res, next)=>{
    console.log('add member');
    Member.create(req.body).then((data)=>{
        res.status(201).send(data);
    }).catch(next);
};

memberCtrl.change_password = (req, res, next)=>{
     Member.findById(req.params.id).then((data)=>{
        console.log("Change password");
        console.log(data);
        console.log(data.password);
        if (req.body.current_password == data.password) {
            Member.findByIdAndUpdate({_id:req.params.id}, {password: req.body.password }).then((data)=>{
                res.status(200).send({
                    success:true, 
                    data:data, 
                    message:""
                });
            });
        } else {
            res.status(400).send({
                success:false,
                message:""
            });
        }
    }).catch(err => {
        res.status(400).send({
            success:false,
            message: err.message 
        })
    });
};

memberCtrl.update = (req, res, next)=>{
    Member.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
        Member.findById(req.params.id).then((data)=>{
            res.status(200).send({
                success:true, 
                data:data, 
                message:""
            });
        });
    }).catch(err => {
        res.status(400).send({
            success:false,
            message: err.message 
        })
    });
};

memberCtrl.delete = (req, res, next)=>{
    Member.findByIdAndRemove({_id:req.params.id}).then((data)=>{
        res.status(200).send(data);
    }).catch(next);
};

exports = module.exports = memberCtrl;