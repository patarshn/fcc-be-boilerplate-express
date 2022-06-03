let express = require('express');
let app = express();
let bodyParser = require('body-parser');

console.log("Hello World");

app.use('/public',express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  console.log(req.method,req.path," - ",req.ip);
  next();
});
app.use(bodyParser.urlencoded({extended: false}));



app.get('/',function(req, res) {
  // res.send('Hello Express');
  let path = __dirname + '/views/index.html';
  res.sendFile(path);
});

app.get('/json',function(req,res) {
  let message_style = process.env['MESSAGE_STYLE'];
  let helloworld = "Hello json";
  if(message_style === 'uppercase'){
    helloworld = helloworld.toUpperCase();
  }
  let obj = {"message": helloworld}
  res.json(obj);
});

app.get('/now',(req,res,next) => {
  req.time = new Date().toString();
  next();
},(req,res) => {
  res.send({time: req.time});
})

app.get('/:word/echo',(req,res) => {
  let word = req.params.word;
  res.json({echo: word})
})

app.route('/name')
  .get((req,res) => {
    let query = req.query;
    first = query.first || "firstname";
    last = query.last || "lastname";
    res.json({name : `${first} ${last}`});
  })
  .post((req,res) => {
    let body = req.body;
    first = body.first || "firstname";
    last = body.last || "lastname";
    res.json({name : `${first} ${last}`});
  });





























 module.exports = app;
