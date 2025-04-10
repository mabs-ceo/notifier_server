const express = require('express');
const cors = require('cors');


const dotenv = require('dotenv');
const connectDB = require('./configs/db');


dotenv.config();

connectDB()
const app = express();

app.use(cors());    
app.use(express.json());

app.use(express.urlencoded({ extended: true }));    


const port = 3000;




app.use("/api/v1/notifications", require("./routes/notification.routes"));
app.use("/api/v1/token", require("./routes/token.routes"));

app.use("/", (req,res)=>{
    res.send("Welcome to Janaza Notification API")
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});