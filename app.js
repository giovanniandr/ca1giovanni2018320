//Here we create the path and convertion to allow us to launch the website and table to the user.
//Referecing and based on Mikhail PaddyCaffe's https://github.com/mikhail-cct/xml-bootcamp

//Here are all the modules that will be responsible for prodiving the communication between html, paths of the files, routing the files, reading, writing files back,
//starting the convertion between files as needed.

//Server funcionality, path for files and return required contents.
var http = require('http'),
    path = require('path'),
    express = require('express'),

//File sytem to read and write files
    fs = require('fs'),

//Convertion of files
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess,
    xml2js = require('xml2js');

//Routing will by handle by express in nodes and creates our server.
var router = express();
var server = http.createServer(router);

    router.use(express.static(path.resolve(__dirname, '')));
    router.use(express.urlencoded({extended: true}));
    router.use(express.json());

//Reading xml and converting to json
function xmlJS(filename, cb){
    var filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function(err, xmlStr){
        if (err) throw(err);
        xml2js.parseString(xmlStr, {}, cb);
    });
}

//Convert json to xml and save.
function jsXML(filename, obj, cb){
    var filepath = path.normalize(path.join(__dirname,filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
}

//Opening index.html
router.get('/', function(req, res){
    res.render('index');
});

//Opening xml and xsl files
router.get('/get/html', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});

    //Reading files
    var xml = fs.readFileSync('pizzamenu.xml','utf8');
    var xsl = fs.readFileSync('pizzamenu.xsl','utf8');

    //Parsing files
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);
    var result = xsltProcess(doc, stylesheet);

    //Display for user
    res.end (result.toString());
});

//Our post, delete for json files
router.post('/post/json', function(req, res){
    function postJSON(obj){
        console.log(obj)
        xmlJS('pizzamenu.xml', function(err, result){
            if(err) throw(err);
            
            result.pizzamenu.type[obj.optionNames].product.push({'Pizza' : obj.pizza, 'Ingredients' : obj.ingredients, 'Price': obj.price});
            console.log(JSON.stringify(result, null, " "));

            jsXML('pizzamenu.xml', result, function(err){
                if(err) console.log(err);
            });
        });
    };

    postJSON(req.body);
    res.redirect('back');
});

router.post('/post/delete', function(req, res){
    function deleteJSON(obj){
        console.log(obj)
        xmlJS('pizzamenu.xml', function(err, result){
            if(err) throw(err);
            
            delete result.pizzamenu.type[obj.type].product[obj.product];
            console.log(JSON.stringify(result, null, " "));

            jsXML('pizzamenu.xml', result, function(err){
                if(err) console.log(err);
            });
        });
    };

    deleteJSON(req.body);
    res.redirect('back');
});


//Giving the server function and message
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server is listening at", addr.address + " : " + addr.port);
})