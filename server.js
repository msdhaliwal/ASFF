const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const farmerSwaggerDocument = require('./docs/farmer/swagger.js');
const customerSwaggerDocument = require('./docs/customer/swagger.js');
const farmerRouterV1 = require('./app/routes/farmer/v1/index.route');
const customerRouterV1 = require('./app/routes/customer/v1/index.route');

require('dotenv').config();

const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/docs', (req, res) => {
	res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.use('/docs/farmer', swaggerUi.serveFiles(farmerSwaggerDocument), swaggerUi.setup(farmerSwaggerDocument));
app.use('/docs/customer', swaggerUi.serveFiles(customerSwaggerDocument), swaggerUi.setup(customerSwaggerDocument));
app.use('/farmer/v1', farmerRouterV1);
app.use('/customer/v1', customerRouterV1);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}.`);
});
