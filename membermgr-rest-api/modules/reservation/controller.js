const RoomCtrl = require('../rooms/controller');
const NextIdCtrl = require('../nextid/controller');
const Reservation = require('./model');
const ReservationCtrl = {};

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

ReservationCtrl.getAllReserved = (req, res, next) => {
    for (let x in req.query) {
        req.query[x] = new RegExp(req.query[x], 'i');
    }
    req.query['canceled'] = false;
    Reservation.find(req.query).then((data) => {
        res.status(200).send(data);
    }).catch(next);
};

ReservationCtrl.getReserved = (req, res, next) => {
    Reservation.findById(req.params.id).then((data) => {
        res.status(200).send(data);
    }).catch(next);
};

ReservationCtrl.getAll = (req, res, next) => {
    let current_date = new Date();
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : new Date(current_date.getFullYear(), current_date.getMonth(), 1);
    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0);
    // console.log(startdate, enddate);
    let daterange = getDateRange(startdate, enddate);

    roompromise = [];
    for (let i of daterange) {
        roompromise.push(Reservation.find({
            'startdate': { '$lte': i },
            'enddate': { '$gte': i }
        }))
    }
    Promise.all(roompromise).then(data => {
        reserved_room_data = {};
        for (let dt of daterange) {
            let label = dt.toISOString().slice(0, 10);
            reserved_room_data[label] = {};
            reserved_room_data[label].reservedrooms = [];
            for (let j of data) {
                for (let k of j) {
                    if (dt.getTime() >= k.startdate.getTime() && dt.getTime() <= k.enddate.getTime()) {
                        for (let m of k.reserved_rooms) {
                            reserved_room_data[label].reservedrooms.push(m);
                        }
                    }
                }
            }
        }
        res.send(reserved_room_data);
    });
};

ReservationCtrl.getMonthAvailable = (req, res, next) => {
    let current_date = new Date();
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : new Date();
    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : new Date(current_date.getFullYear(), current_date.getMonth() + 3, 0);
    // console.log(startdate, enddate);
    let daterange = getDateRange(startdate, enddate);
    roompromise = [];
    for (let i of daterange) {
        roompromise.push(Reservation.find({
            'startdate': { '$lte': i },
            'enddate': { '$gte': i }
        }));
    }
    Promise.all(roompromise).then(data => {
        room_count_promise = [];
        reserved_room_data = {};
        for (let dt of daterange) {
            reserved_room_id = [];
            let label = dt.toISOString().slice(0, 10);
            reserved_room_data[label] = {};
            reserved_room_data[label].reservedrooms = [];
            reserved_room_data[label].uniqueArray = [];
            for (let j of data) {
                for (let k of j) {
                    if (dt.getTime() >= k.startdate.getTime() && dt.getTime() <= k.enddate.getTime()) {
                        for (let m of k.reserved_rooms) {
                            // reserved_room_data[label].reservedrooms.push(m);
                            reserved_room_id.push(m.room_no);
                        }
                    }
                }
            }
            reserved_room_data[label].uniqueArray = reserved_room_id.filter(function(elem, pos) {
                return reserved_room_id.indexOf(elem) == pos;
            });
            room_count_promise.push(RoomCtrl.getAvailableObj(reserved_room_data[label].uniqueArray));
        }
        console.log(reserved_room_data);
        Promise.all(room_count_promise).then(data => {
            for(let i=0;i< daterange.length; i++) {
                // console.log("-------------------------------", data);
                let label = daterange[i].toISOString().slice(0, 10);
                let result = {
                    ms: {
                        total: 44,
                        reserved: 0,
                        available: 0,
                        rooms: []
                    },
                    mfs: {
                        total: 7,
                        reserved: 0,
                        available: 0,
                        rooms: []
                    },
                    fs: {
                        total: 3,
                        reserved: 0,
                        available: 0,
                        rooms: []
                    }
                };
                for (let room of data[i]) {
                    if (room.capacity == 2) {
                        result.ms.available += 1;
                        result.ms.reserved = result.ms.total - result.ms.available;
                        // result.ms.rooms.push(room.room_no);
                        continue;
                    }
                    if (room.capacity == 3) {
                        result.mfs.available += 1;
                        result.mfs.reserved = result.mfs.total - result.mfs.available;
                        // result.mfs.rooms.push(room.room_no);
                        continue;
                    } 
                    if (room.capacity == 4) {
                        result.fs.available += 1;
                        result.fs.reserved = result.fs.total - result.fs.available;
                        // result.fs.rooms.push(room.room_no);
                        continue;
                    }
                }

                reserved_room_data[label].available = result;
                reserved_room_data[label].avail_str = `MS T=${result.ms.total} R=${result.ms.reserved} A=${result.ms.available}\nMFS T=${result.mfs.total} R=${result.mfs.reserved} A=${result.mfs.available}\nFS T=${result.fs.total} R=${result.fs.reserved} A=${result.fs.available}`;
                // console.log(data[i]);
                // console.log("-------------------------------");
            }
            res.send(reserved_room_data);
        });
    });
};

ReservationCtrl.getAllAvailable = (req, res, next) => {
    console.log("Entered Reservation getAll");
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : new Date();
    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : startdate.addDays(30);
    let daterange = getDateRange(startdate, enddate);
    roompromise = [];
    for (let i of daterange) {
        roompromise.push(Reservation.find({
            'startdate': { '$lte': i },
            'enddate': { '$gte': i }
        }))
    }
    Promise.all(roompromise).then(data => {
        reserved_room_data = {};
        reserved_room_id = [];
        for (let dt of daterange) {
            let label = dt.toISOString().slice(0, 10);
            reserved_room_data[label] = {};
            reserved_room_data[label].reservedrooms = [];
            for (let j of data) {
                for (let k of j) {
                    if (dt.getTime() >= k.startdate.getTime() && dt.getTime() <= k.enddate.getTime()) {
                        for (let m of k.reserved_rooms) {
                            reserved_room_data[label].reservedrooms.push(m);
                            reserved_room_id.push(m.room_no);

                        }
                    }
                }
            }
        }

        uniqueArray = reserved_room_id.filter(function(elem, pos) {
            return reserved_room_id.indexOf(elem) == pos;
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
        // res.send([uniqueArray, reserved_room_id]);
    });
};

ReservationCtrl.create = (req, res, next) => {

    console.log(req.body);
    req.body.reservationid = 0;
    NextIdCtrl.getNextId().then((nextid_data) => {
        var nextid = nextid_data['room_inv_id']; //1
        var nextadvanceid = nextid_data['room_advance_inv_id']; //1
        var objectid = nextid_data['_id'];
        req.body.advance_bill_No = nextadvanceid; //1
        req.body.reservationid = nextid; //1
        console.log(req.body);
        Reservation.create(req.body).then((reservation_data) => {
            nextid_data['room_inv_id'] = nextid + 1;
            nextid_data['room_advance_inv_id'] = nextadvanceid + 1;
            NextIdCtrl.updateNextId(objectid, nextid_data).then((data) => {
                res.status(201).send({
                    success: true,
                    data: reservation_data
                });
            }).catch(next);
        }).catch(next);
    }).catch(next);
};

ReservationCtrl.update = (req, res, next) => {
    Reservation.findByIdAndUpdate({ _id: req.params.id }, req.body).then((data) => {
        Reservation.findById(req.params.id).then((data) => {
            console.log(data)
            res.status(200).send(data);
        });
    }).catch(next);
};

ReservationCtrl.delete = (req, res, next) => {
    console.log(req.body);
    Reservation.findById(req.params.id).then((data) => {
        data['reserved_rooms'] = [];
        data['canceled'] = true;
        Reservation.findByIdAndUpdate({ _id: req.params.id }, data).then((data) => {
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

exports = module.exports = ReservationCtrl;