const express = require('express');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const router = express.Router();

fs.readdirSync(__dirname)
	.filter((file) => {
		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
	})
	.forEach((file) => {
		const route = require(path.join(__dirname, file));
		router.use(`/${file.split('.')[0]}`, route);
	});

module.exports = router;
