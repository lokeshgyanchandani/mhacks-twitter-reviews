
var application_root = __dirname,
    express = require("express"),
        path = require("path");
        //var databaseUrl = "twitteranalytics"; // "username:password@example.com/mydb"
        var databaseUrl = "lokesh:lokesh1@ds027819.mongolab.com:27819/twitteranalytics";
var collections = ["analytics"]
var db = require("mongojs").connect(databaseUrl, collections);

var app = express();

var http = require('http'),
    fs = require('fs');


fs.readFile('./highchart.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(80);
});


// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


app.get('/api', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('Ecomm API is running');
});


app.get('/getproductdata/:prodname', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    productN = req.params.prodname;
        db.analytics.find({product:productN}, function(err, products) {
        if( err || !products) console.log("No products found");
         else
        {
                res.writeHead(200, {'Content-Type': 'text/json'});
                productcollection = products[0].countrydata;
                str = '[';
                //console.log(seedscollection);
                
                productcollection.forEach( function(productCountry) {
                 str = str + '{"country":"'+ productCountry.country + '","poscount":"'+ productCountry.poscount + '","negcount":"' + productCountry.negcount +'"},';
                });
                str = str.substring(0,str.length-1)
                str = str + ']';
                res.end(JSON.stringify(str));
        }
  });
});



app.listen(process.env.PORT || 5000);
