const nivel = process.argv.length > 2 ? process.argv.slice(2)[0].split('=')[1] : 1;
const dotdotslash = '.'.repeat(nivel);

const express = require(dotdotslash + '/node_modules/express');
const dir = require(dotdotslash + '/node_modules/node-dir');
const cors = require(dotdotslash + '/node_modules/cors');
const app = express();
const basePath = '';

const HandleFile = require('./handle-file');

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