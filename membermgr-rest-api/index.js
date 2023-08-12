// Run blow command if you face any nodemon watch error 
// sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
// $echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

//Import all libraries
const express = require("express");
var cors = require('cors')


const body_parser = require("body-parser");
const morgan = require('morgan');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


var config = require('./config'); // get our config file
var User = require('./modules/login/model'); // get our mongoose model
var Member = require('./modules/members/model'); // get our mongoose model

//Import all routers
const user_router = require("./modules/login/router");
const member_router = require("./modules/members/router");
const room_router = require("./modules/rooms/router");
const room_checkin_router = require("./modules/rooms/checkin/router");
const block_router = require("./modules/blocks/router");
const branch_router = require("./modules/branch/router");
const membership_router = require("./modules/membership/router");
const reservation_router = require("./modules/reservation/router");
const booking_router = require("./modules/bookings/router");
const online_member_router = require("./modules/onlinemembers/router");
const item_router = require("./modules/item/router");
const fooditem_router = require("./modules/fooditem/router");
const foodsale_router = require("./modules/foodsale/router");
const purchase_router = require("./modules/purchase/router");
const sales_router = require("./modules/sales/router");
const itemjrnl_router = require("./modules/itemjrnl/router");
const door_router = require("./modules/door/router");
const nextIdRouter = require("./modules/nextid/router");

const wallet_router = require("./modules/wallet/router");

//Create an instance of express and assign to app
const app = express();

app.use(cors())

var port = process.env.PORT || 8000;

//Connect to Mongodb Server
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

mongoose.Promise = global.Promise;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

//Add request parser middleware
// app.use(body_parser.urlencoded({ extended: fales }));
app.use(body_parser.json({
    type: function() {
        return true;
    }
}));
app.use(allowCrossDomain);

// use morgan to log requests to the console
app.use(morgan('dev'));


// =======================
// routes ================
// =======================
// basic route

var apiRoutes = express.Router();


// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token

// route to authenticate a user (POST http://localhost:8080/api/authenticate)

apiRoutes.post('/member-login', function(req, res) {

    // console.log('xxx');
    // console.log(req.body);

    // find the member
    Member.findOne({
        membership_id: req.body.username
    }, function(err, member) {
        console.log(member);

        if (err) throw err;

        if (!member) {
            res.status(404).json({ success: false, message: 'Authentication failed. Member not found.' });
        } else if (member) {

            // check if password matches
            if (member.password != req.body.password) {
                res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                console.log(member);
                var current_user = {
                    id: member._id,
                    membership_id: member.membership_id,
                    branch: member.branch,
                    name: member.name,
                    tel_no_res: member.tel_no_res,
                    res_address: member.res_address,
                    res_country: member.res_country,
                    res_state: member.res_state,
                    res_pincode: member.res_pincode,
                    res_city: member.res_city,
                    email: member.email,
                    image: member.image
                }

                // if member is found and password is right
                // create a token
                var token = jwt.sign(member, app.get('superSecret'), {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                // console.log(token);
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    user: current_user
                });
            }
        }

    });

});

apiRoutes.post('/login', function(req, res) {


    // console.log('xxx');
    // console.log(req.body);

    // find the user
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        // console.log(user);

        if (err) throw err;

        if (!user) {
            res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                console.log(token);
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    username: user.username,
                    is_admin: user.is_admin,
                    token: token
                });
            }
        }

    });

});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

    console.log(req.url);
    if (req.url == '/member-registration' || req.url == '/member-registration/payment') {
        next();
    } else {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            // return res.status(403).send({ 
            //     success: false, 
            //     message: 'No token provided.' 
            // });
            next();

        }
    }
});

apiRoutes.get('/', function(req, res) {
    console.log('home');
    res.json({ message: 'Base of the API Rest Services. Nothing to return...' });
});


//Set all routers middleware
app.use('/api', apiRoutes);
app.use('/api/user', user_router);
app.use('/api/member', member_router);
app.use('/api/room', room_router);
app.use('/api/room/checkin', room_checkin_router);
app.use('/api/block', block_router);
app.use('/api/branch', branch_router);
app.use('/api/membership', membership_router);
app.use('/api/reservation', reservation_router);
app.use('/api/booking', booking_router);
app.use('/api/wallet', wallet_router);
app.use('/api/item', item_router);
app.use('/api/food', fooditem_router);
app.use('/api/foodsale', foodsale_router);
app.use('/api/purchase', purchase_router);
app.use('/api/sales', sales_router);
app.use('/api/itemjrnl', itemjrnl_router);

app.use('/api/member-registration', online_member_router);
app.use('/api/door', door_router);
app.use('/api/nextid', nextIdRouter);

//Add Error Handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(422).send({ message: err });
});

//Start the express server as a deamon
app.listen(port, '0.0.0.0', () => {
    console.log("Server started at: " + port);
});