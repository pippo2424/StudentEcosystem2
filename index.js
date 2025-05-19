const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userroutes = require('./src/routes/user');

env.config();
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URL}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, 
  {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      
  
  }
  ).then((data) =>{
      console.log("db connected", data.connection.host);
  }).catch((error) => {
    console.log(error);
  })
  app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3001/', credentials: true }));
app.use("/api",userroutes)

let port = process.env.PORT
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});