const RoomCtrl = require('../rooms/controller');
const NextIdCtrl = require('../nextid/controller');
const Booking = require('./model');
const BookingCtrl = {};

//Small Date Utilities
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

function getDateRange(startDate, endDate) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(new Date(currentDate))
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

BookingCtrl.getAllBooking = (req, res, next) => {
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    // req.query['canceled'] = false;
    // req.query['checkout'] = false;
    Booking.find(req.query).then((data) => {
        res.status(200).send(data);
    }).catch(next);
};

BookingCtrl.getBooking = (req, res, next) => {
    Booking.findById(req.params.id).then((data) => {
        res.status(200).send(data);
    }).catch(next);
};

BookingCtrl.getAll = (req, res, next) => {
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : new Date().addDays(-30);
    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : new Date();
    let daterange = getDateRange(startdate, enddate);
    roompromise = [];
    for (let i of daterange) {
        roompromise.push(Booking.find({
            'startdate': { '$lte': i },
            'enddate': { '$gte': i }
        }))
    }
    Promise.all(roompromise).then(data => {
        booked_room_data = {};
        for (let dt of daterange) {
            let label = dt.toISOString().slice(0, 10);
            booked_room_data[label] = {};
            booked_room_data[label].bookedrooms = [];
            for (let j of data) {
                for (let k of j) {
                    if (dt.getTime() >= k.startdate.getTime() && dt.getTime() <= k.enddate.getTime()) {
                        for (let m of k.booked_rooms) {
                            booked_room_data[label].bookedrooms.push(m);
                        }
                    }
                }
            }
        }
        res.send(booked_room_data);
    });
};

BookingCtrl.getAllAvailable = (req, res, next) => {
    console.log("entered booking getAll");
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : new Date();
    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : startdate.addDays(30);
    let daterange = getDateRange(startdate, enddate);
    roompromise = [];
    for (let i of daterange) {
        roompromise.push(Booking.find({
            'startdate': { '$lte': i },
            'enddate': { '$gte': i }
        }))
    }
    Promise.all(roompromise).then(data => {
        booked_room_data = {};
        booked_room_id = [];
        for (let dt of daterange) {
            let label = dt.toISOString().slice(0, 10);
            booked_room_data[label] = {};
            booked_room_data[label].bookedrooms = [];
            for (let j of data) {
                for (let k of j) {
                    if (dt.getTime() >= k.startdate.getTime() && dt.getTime() <= k.enddate.getTime()) {
                        for (let m of k.booked_rooms) {
                            booked_room_data[label].bookedrooms.push(m);
                            booked_room_id.push(m.room_no);

                        }
                    }
                }
            }
        }

        uniqueArray = booked_room_id.filter(function(elem, pos) {
            return booked_room_id.indexOf(elem) == pos;
        })


        RoomCtrl.getAvailableObj(uniqueArray).then((data) => {
            // res.send([uniqueArray,data]);
            let result = {
                ms: {
                    count: 0,
                    rooms: []
                },
                mfs: {
                    count: 0,
                    rooms: []
                },
                fs: {
                    count: 0,
                    rooms: []
                }
            };
            for (let room of data) {
                if (room.capacity == 2) {
                    result.ms.count += 1;
                    result.ms.rooms.push(room);
                } else if (room.capacity == 3) {
                    result.mfs.count += 1;
                    result.mfs.rooms.push(room);
                } else {
                    result.fs.count += 1;
                    result.fs.rooms.push(room);
                }
            }
            res.send(result);
        });
        // res.send([uniqueArray, booked_room_id]);
    });
};

BookingCtrl.create = (req, res, next) => {

    console.log(req.body);
    NextIdCtrl.getNextId().then((nextid_data) => {
        var nextid = nextid_data['room_inv_id']; //1
        var nextadvanceid = nextid_data['room_advance_inv_id']; //1
        var objectid = nextid_data['_id'];
        req.body.advance_bill_No = nextadvanceid; //1
        req.body.bookingid = nextid; //1
        console.log(req.body);
        req.body['history_of_rooms'] = req.body.booked_rooms;
        Booking.create(req.body).then((booking_data) => {
            nextid_data['room_inv_id'] = nextid + 1;
            nextid_data['room_advance_inv_id'] = nextadvanceid + 1;
            NextIdCtrl.updateNextId(objectid, nextid_data).then((data) => {
                res.status(201).send({
                    success: true,
                    data: booking_data
                });
            }).catch(next);
        }).catch(next);
    }).catch(next);
};

BookingCtrl.update = (req, res, next) => {
    req.body.booked_rooms = [];
    req.body["status"] = 'OUT';
    // NextIdCtrl.getNextId().then((nextid_data) => {
        // var nextid = nextid_data['room_inv_id']; //1
        // var objectid = nextid_data['_id'];
        // req.body.bookingid = nextid; //1
        Booking.findByIdAndUpdate({ _id: req.params.id }, req.body).then((data) => {
            console.log(data)
            // nextid_data['room_inv_id'] = nextid + 1;
            // NextIdCtrl.updateNextId(objectid, nextid_data).then((data) => {
                Booking.findById(req.params.id).then((data) => {
                    console.log(data)
                    res.status(200).send(data);
                });
            // }).catch(next);
        }).catch(next);
    // }).catch(next);
};

BookingCtrl.delete = (req, res, next) => {
    console.log(req.body);
    Booking.findById(req.params.id).then((data) => {
        data['booked_rooms'] = [];
        data['status'] = 'CANCELED';
        Booking.findByIdAndUpdate({ _id: req.params.id }, data).then((data) => {
            res.status(200).send(data);
        });
        // res.status(200).send(data);
    }).catch(err => {
        res.status(400).send({
            success: false,
            message: err.message
        })
    });
    // Booking.findByIdAndUpdate({_id:req.params.id}, req.body).then((data)=>{
    //     Booking.findById(req.params.id).then((data)=>{
    //         console.log(data)
    //         res.status(200).send(data);
    //     });
    // }).catch(err => {
    //     res.status(400).send({
    //         success:false,
    //         message: err.message 
    //     })
    // });
};

exports = module.exports = BookingCtrl;