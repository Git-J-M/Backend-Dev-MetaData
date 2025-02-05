var express = require('express');
var cors = require('cors');
require('dotenv').config();
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();

var upload = multer({ dest: 'uploads/'})

app.use(bodyParser.json() );      
app.use(bodyParser.urlencoded({     
  extended: true
}));

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

app.post('/api/fileanalyse', upload.single('upfile'),(req, res) => {
    
  if(!req.file){

    return res.status(500).json({Error: 'No file uploaded!'});
    
  }

  console.log(req.file);

  res.json({
    name: req.file.originalname,

    type: req.file.mimetype, 
    size: req.file.size 
  });
})