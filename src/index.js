const express = require('express');
const configViewEngine = require('./config/viewEngine');
const route = require('./routes');
const connectDB = require('./config/connectDB');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

configViewEngine(app);

// config body-parser
// body-parser để lấy dữ liệu từ req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

// config cookies-parser
app.use(cookieParser());

// init web routes
route(app);
connectDB();

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
