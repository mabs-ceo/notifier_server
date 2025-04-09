const express = require('express');
const cors = require('cors');
const session = require('express-session');
// require('../configs/passport');

const dotenv = require('dotenv');
const connectDB = require('./configs/db');
const MongoStore = require('connect-mongo');
// const passport = require('./configs/passport');
dotenv.config();

connectDB()
const app = express();

app.use(cors());    
app.use(express.json());

app.use(express.urlencoded({ extended: true }));    

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store:MongoStore.create({
//         mongoUrl: process.env.MONGO_URI,
//         collectionName: 'sessions',
//         ttl: 14 * 24 * 60 * 60, // = 14 days. Default
//     }),
//     cookie: {
//         maxAge: 14 * 24 * 60 * 60 * 1000, // = 14 days. Default
//         secure: false, // Set to true if using HTTPS
//         httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
//     },
//     // rolling: true, // Reset the cookie maxAge on every request
// }))

// app.use(passport.initialize());
// app.use(passport.session());

const port = 3000;



app.use("/api/v1/auth", require("./routes/notification.routes"));
app.use("/api/v1/notifications", require("./routes/notification.routes"));
app.use("/api/v1/token", require("./routes/token.routes"));

app.use("*/", (req,res)=>{
    res.send("Welcome to Janaza Notification API")
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});