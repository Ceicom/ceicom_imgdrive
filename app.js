const express = require('express'),
    dir = require('node-dir'),
    HandleFile = require('./handle-file'),
    cors = require('cors'),
    app = express(),
    basePath = '../../';

// CORS ALL DOMAIN
app.use(cors());

/***************************************/

app.get('/getdir/:dir*', (req, res) => {
    const handleFile = new HandleFile(req.query);
    const directory = basePath + req.params.dir + req.params['0'],
        replace = directory.split('/').slice(0, -1).join('/');

    console.log(`getdir: ${directory}`);

    dir.files(directory, 'dir', (err, files) =>
        res.send(files ? handleFile.dealPaths(files, replace) : err));
});

/***************************************/

app.get('/getfile/:dir*', (req, res) => {
    const handleFile = new HandleFile(req.query);
    const directory = basePath + req.params.dir + req.params['0'];

    console.log(`getfile: ${directory}`);

    dir.files(directory, 'file', (err, files) =>
        res.send(files ? handleFile.dealFiles(files) : err),
        { shortName: true, recursive: false });
});

/***************************************/

app.listen(3000);
console.log('server started at port 3000');
