// Load the SDK
const AWS = require('aws-sdk')
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.port || 4500;
var app = express();
var path = require('path');
var uuid = require('uuid');

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next) {
//     res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//     res.header('Expires', '-1');
//     res.header('Pragma', 'no-cache');
//     next()
// });


app.get('/', function (req, res) {
    //res.sendFile(__dirname + '/public/views/index.html');
    res.sendFile(__dirname + '/public/views/index.html');
});

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

//read voice id from the file
var base = fs.readFileSync("./base-bk.json");
var data = JSON.parse(base);
var voiceIdArray = [];
data.voice_id.forEach(element => {
    voiceIdArray.push(element.voice);
});


app.post("/textToVoice", function (req, res) {
    var r = req.body.text;
    var name = req.body.id + uuid.v4();
    var format = req.body.format;
    var voiceID = req.body.id;
    var voice = '';

    voiceIdArray.forEach(element => {
        var find = voiceID.includes(element);
        if (find) {
            voice = element;
        }
    })
    console.log(voice);


    var OutputFormat = 'ogg_vorbis';

    if (format == 'ogg') {
        OutputFormat = 'ogg_vorbis';
    }

    if (format == 'mp3') {
        OutputFormat = 'mp3';
    }

    var extension = 'ogg';

    if (OutputFormat == 'mp3') {
        extension = 'mp3';
    }

    var d = new Date();
    var month = d.getMonth() + 1;
    var currentDate = d.getDate() + '-' + month + '-' + d.getFullYear();

    var dir = './' + currentDate;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    let params = {
        'Text': r,
        'OutputFormat': OutputFormat,
        'VoiceId': voice
    }

    Polly.synthesizeSpeech(params, (err, data) => {

        if (err) {
            console.log(err.code)
        } else if (data) {

            if (data.AudioStream instanceof Buffer) {

                fs.writeFile(dir + "/" + name + "." + extension, data.AudioStream, function (err) {
                    if (err) {
                        res.send(false);
                    }
                    else
                        res.send({ file: name + "." + extension });
                    console.log("file generated");
                })
            }
        }
    })

});


app.use('/resources',express.static(__dirname+'/28-9-2018'));

app.listen(port, function (req, res) {
    console.log("server is running at " + port);
});
