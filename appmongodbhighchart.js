var application_root = __dirname,
    express = require("express"),
	path = require("path");
	var databaseUrl = "lokesh:lokesh1@ds027729.mongolab.com:27729/twitteranalytics"; // "username:password@example.com/mydb"
var collections = ["Nexus5"]
var db = require("mongojs").connect(databaseUrl, collections);

var app = express();



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


app.get('/getproductdata/:product', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    product = req.params.product;
	db.product.find(function(err, cursor) {
		str = '[';
		res.writeHead(200, {'Content-Type': 'text/json'});

		cursor.each(function(err, countrydetail) {
			if( err || !countrydetail) console.log("No seeds found");
		  else 
		{
			//res.writeHead(200, {'Content-Type': 'text/json'});
			//seedscollection = seeds[0].seedprice;
			//str = '[';
			//console.log(seedscollection);
		
			//seedscollection.forEach( function(seed) {
			   str = str + '{"country":"'+ countrydetail.country + '","positive":"'+ countrydetail.positive + '","negative":"' + countrydetail.negative +'"},';
			//});
			str = str.substring(0,str.length-1)
			//str = str + ']';
			//res.end(JSON.stringify(str));
		}
 	 }
	str = str + ']';
	res.end(JSON.stringify(str));
);
});



app.listen(process.env.PORT || 5000)
