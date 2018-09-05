const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");
const fs=require('fs');


                                      

//making an express object
const app = express();

//server listen
app.listen(9001, function (req, res) {

});
console.log("server is listening....");


//body parser code
//middle wares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());


////using get route
app.get('/api/User', function (req, res) {
   /* var test = */// getdata(res);
   FetchFromFile(res);
});
var url = "";
function FetchFromFile(res)
{

    var allData1=[];
    var allData=[];
   fs.readFile('./fulldata.json', 'utf8', function (err, data) {
     if (err) throw err;
     allData = JSON.parse(data);
     console.log(data);
     var rows = allData.dataset;
  
   for (var index = 0; index < 57; index++) {
       var row = rows[index];
       console.log("=================================");
       console.log("row" + index);
      // console.log(row.discription);
      //console.log(row.keyword);
       //console.log(row.distribution[0].accessURL);
      
       allData1.push(row.keyword);
       console.log("============================")
       allData1.push(row.distribution[0].accessURL);
       
   } 
   res.status(200).send(allData1);
  // 
   });
  
  // console.log(data);
  /* var allData = obj;*/
   
}
function getdata(res) {
    datta = Request.get({
       "headers": {
           "content-type": "application/json"
        },
        "url": "./fulldata.json",
        "body": JSON.stringify()
    }, function(error, response, body){
        if (error) {
            return console.log(error);
        } else {
            
            console.log("Data fetched")
          

            var allData = JSON.parse(body);
            var rows = allData.dataset;
            var allData=[];
            for (var index = 0; index < 57; index++) {
                var row = rows[index];
                console.log("=================================");
                console.log("row" + index);
               // console.log(row.discription);
                console.log(row.distribution[0].accessURL);
                console.log(row.keyword);
                allData.push(row.distribution[0].accessURL);
            
            }
            res.status(200).send(allData);
           // res.end(JSON.stringify(allData)
           //res.writeHead(200, {'Content-Type': 'application/json'});
           
           /* res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
            res.write('<input type="file" name="filetoupload"><br>');
            res.write('<input type="submit">');
            res.write('</form>');*/
          
          

        }
    })

}

