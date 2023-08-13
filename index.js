const express = require("express");
const app = express();
const port=8080;
const router = require('./routers/lists');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port);