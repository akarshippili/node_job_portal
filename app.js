const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); 
const createRoutes = require('./routes/createRoutes');
const cookieParser = require('cookie-parser');
const { reqAuth, curUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://akarsh:akarsh@cluster0.weyca.mongodb.net/software-eng?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// routes
app.get('*',curUser);
app.get('/', (req, res) => res.render('home'));
app.get('/about',(req, res) => res.render('about'));
app.use(authRoutes);
app.use(createRoutes);
