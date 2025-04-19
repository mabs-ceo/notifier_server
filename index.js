const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const dotenv = require('dotenv');
const connectDB = require('./configs/db');


dotenv.config();

connectDB()
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://ummahnotify.com', // Allow this domain
    'https://notifier-server-0rtz.onrender.com/', // Allow this domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials like cookies to be sent
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));    
// Limit each IP to 10 requests per 10 minutes
const verifyLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  message: 'Too many attempts from this IP, try again later.',
});



const port = process.env.PORT || 3000;




app.use("/api/v1/notifications",verifyLimiter ,require("./routes/notification.routes"));
app.use("/api/v1/token", verifyLimiter,require("./routes/token.routes"));

app.use("/", (req,res)=>{
    res.send("Welcome to Janaza Notification API")
});
app.listen(port);