var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response, next){


	// console.log("--------------------------------------------");
	// console.log(request.body);

// Merchant id: 144684
// URL:   https://online.ymcamadras.org.in
// Access code: AVKC72EH55BJ17CKJB
// Working key: BD56116426316CEE42582C46043B0087
 
// The post action URL must be https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction

    var body = '',
	workingKey = 'BD56116426316CEE42582C46043B0087',	//Put in the 32-Bit key shared by CCAvenues.
	accessCode = 'AVKC72EH55BJ17CKJB',			//Put in the Access Code shared by CCAvenues.
	encRequest = '',
	formbody = '';
				
    request.on('data', function (data) {
	// console.log("--------------------DATA------------------------");
	body += data;
	encRequest = ccav.encrypt(body,workingKey); 
	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });
				
    request.on('end', function () {
	// console.log("-----------------END---------------------------");
        response.writeHeader(200, {"Content-Type": "text/html"});
	response.write(formbody);
	// console.log(formbody);
	response.end();
    });
    next();

   // return; 
};
