 const express = require('express'),
     dir = require('node-dir'),
     HandleFile = require('./handle-file'),
     cors = require('cors'),
     app = express(),
     basePath = '../';

const fs = require('fs');
const path = require('path');

// CORS ALL DOMAIN
app.use(cors());

// /***************************************/

app.get('/getdir/:dir*', (req, res) => {
     const handleFile = new HandleFile(req.query);
     const directory = basePath + req.params.dir + req.params['0'],
         replace = directory.split('/').slice(0, -1).join('/');

     dir.files(directory, 'dir', (err, files) =>
         res.send(files ? handleFile.dealPaths(files, replace) : err));
});

// /***************************************/

app.get('/getfile/:dir*', (req, res) => {
    const handleFile = new HandleFile(req.query);
    const directory = basePath + req.params.dir + req.params['0'];
    const bufdir = Buffer.from(directory);
    const list = fs.readdirSync(directory, { encoding: 'buffer' });
    const files = [];

    for (let i = 0, l = list.length; i < l; i++) {
        const fname = list[i].toString();
        const buffile = Buffer.concat([bufdir, Buffer.from(path.sep), list[i]]);
        const info = fs.statSync(buffile);

        if (!info.isDirectory() && handleFile.checkExt(path.extname(fname)))
            files.push({ fname, ...info });
    }

    files.sort((a, b) => b.birthtime - a.birthtime);

    res.send(files.map((item) => item.fname));
});
/***************************************/

 app.listen(process.env.PORT);