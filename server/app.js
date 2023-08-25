// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler.js');

// Import routes
const userRoutes = require('./routes/userRoutes.js');
const storyRoutes = require('./routes/storyRoutes.js');
const connectDB = require('./config/connectDB.js');


dotenv.config();


const app = express();
 


// ====================================================== MIDDLEWARE =====================================================
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));

app.use(cors({

  origin: process.env.CLIENT_URL,
  credentials: true

}));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//-------------------- Connect to Database --------------------
connectDB()

// routes
app.use('/api/user', userRoutes);
app.use('/api/story', storyRoutes);

app.get("/", async(req, res)=>{
    res.status(200).json("Server is up and running")
})





app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public/index.html"));
});


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});