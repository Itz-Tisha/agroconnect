const express = require('express');
const app = express();
const router = require('./router/main');
const mongoose = require('mongoose');
const cors = require('cors');
const { check, validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', './views');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({ extended: true }));

const mongodbstore = require('connect-mongodb-session')(session)
const dbpath = "mongodb+srv://root:root@clusteragro1.f6e45ay.mongodb.net/AgroConnect?retryWrites=true&w=majority&appName=clusteragro1"
app.use(bodyParser.urlencoded({extended:true}))
const store = new mongodbstore({
    uri:dbpath,
    collection:'session'
})
app.use(session({
    secret: 'agroconnect',
    resave:false,
    saveUninitialized:true,
    store:store,
}))

app.use(router);

mongoose.connect('mongodb+srv://root:root@clusteragro1.f6e45ay.mongodb.net/AgroConnect?retryWrites=true&w=majority&appName=clusteragro1')
  .then(() => {
    console.log('Database connection successful!');
    app.listen(9579, () => {
      console.log('Server is running ');
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection failed:' ,err.message);
  });
