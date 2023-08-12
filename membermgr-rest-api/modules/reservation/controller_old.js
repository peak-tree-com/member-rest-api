const RoomCtrl = require('../rooms/controller');
const Reservation = require('./model');
const ReservationCtrl = {};

//Small Date Utilities
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

Array.prototype.unique = function() {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
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

ReservationCtrl.getAll = (req, res, next) => {
    console.log("entered reservation getAll");
    let startdate = (req.query.startdate) ? new Date(req.query.startdate) : new Date().addDays(-30);
    let enddate = (req.query.enddate) ? new Date(req.query.enddate) : new Date();
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
        console.log("DATA")
            // console.log(data);
            // let uniqueArray = data.shift();
        let mergedArray = [];
        for (let i of data) {
            // mergedArray = mergedArray.filter(function(obj) { return i.indexOf(obj) == -1; });
            mergedArray = mergedArray.concat(i);
        }
        console.log(mergedArray);
        // uniqueArray = mergedArray.filter(function(elem, pos) {
        //     return mergedArray.indexOf(elem) == pos;
        // });

        uniqueArray = mergedArray.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t.memberid === obj.memberid && t.membername === obj.membername
            ))
        );

        console.log("-----------------------");
        console.log(uniqueArray);
        console.log("-----------------------");
        console.log(uniqueArray.length);
        for (let dt of daterange) {
            // console.log(dt);
            let label = dt.toISOString().slice(0, 10);
            reserved_room_data[label] = {};
            reserved_room_data[label].reservedrooms = {
                ms: 0,
                mfs: 0,
                fs: 0
            };

            // console.log(uniqueArray);
            // console.log("---------------------------");

            for (let k of uniqueArray) { // each reservation
                if (dt.getTime() >= k.startdate.getTime() && dt.getTime() <= k.enddate.getTime()) {
                    // for (let m of k.reserved_rooms) {
                    reserved_room_data[label].reservedrooms['ms'] += k.reserved_rooms['ms'];
                    reserved_room_data[label].reservedrooms['mfs'] += k.reserved_rooms['mfs'];
                    reserved_room_data[label].reservedrooms['fs'] += k.reserved_rooms['fs'];
                    // reserved_room_data[label].reservedrooms.push(k.reserved_rooms);
                    // }
                }
            }
        }
        res.send(reserved_room_data);
    });
};

ReservationCtrl.getAllAvailable = (req, res, next) => {

    //{ ms: { total: 43 }, mfs: { total: 8 }, fs: { total: 3 } }

    // RoomCtrl.getAllRoomCount().then((data)=>{
    //     final_result = {
    //         ms:{
    //                 total:0
    //         },
    //         mfs:{
    //             total:0
    //         },
    //         fs:{
    //             total:0
    //         }
    //     };
    //     for(let room of data){
    //         if(room.capacity == 2){
    //             final_result.ms.total += 1;
    //         } 
    //         else if(room.capacity == 3){
    //             final_result.mfs.total += 1;
    //         } else {
    //             final_result.fs.total += 1;
    //         }
    //     }
    //     console.log(final_result);
    // });

    console.log("RESERVED ROOMS");
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
                    total: 43,
                    booked: 0,
                    reserved: 0,
                    rooms: []
                },
                mfs: {
                    total: 8,
                    booked: 0,
                    reserved: 0,
                    rooms: []
                },
                fs: {
                    total: 3,
                    booked: 0,
                    reserved: 0,
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

ReservationCtrl.create = (req, res, next) => {
    // data = {
    //     memberid: '1003',
    //     address: {
    //         address_line: "Injambakkam",
    //         city: "Chennai",
    //         pin_code: "600115"
    //     },

    //     phone_no: "8056034174",

    //     email_id: "jega@jega.in",

    //     nationality: "Indian",

    //     id_proof_type: "Adhaar",

    //     id_proof_number: "5999-3456-3423-3332",

    //     startdate: "2018-01-01",

    //     enddate: "2018-01-03",

    //     reserved_rooms: {
    //         ms: 2,
    //         mfs: 1,
    //         fs: 0
    //     },

    //     reservation_amount: {
    //         total_tariff: 2500, //2500
    //         total_extra_bed: 500, //500
    //         discount_percent: 25, //25%
    //         discount_amount: 750, // (2500+500) - (2500+500)*0.25
    //         total_gst: 560 //18%
    //     }
    // };

    // console.log(req.body);
    Reservation.create(req.body).then((data) => {
        res.status(201).send({
            success: true,
            data: data
        });
    }).catch(err => {
        res.json({ message: err.message })
    });
};

exports = module.exports = ReservationCtrl;