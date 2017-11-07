const express = require('express');
const hbs = require('hbs'); //handlebars
const fs = require('fs');

const port = process.env.PORT || 3000; // stores all environment variables

var app = express();

hbs.registerPartials(__dirname+"/views/partials")
app.set('view engine', 'hbs'); // set different configs

// dirname stores the path to project directory
// middleware can also be used for authentication etc.
app.use(function (req, res, next) {
  // next is to tell when middleware function is done
  // that is when we have several functions such as
  // db connections, serve a directory, log requests, app performance
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', function (err) {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use(function (req, res, next) {
//   // under construction middleware
//   res.render('maintenance.hbs', {
//     pageTitle: "Under maintenance",
//   })
// });

app.use(express.static(__dirname+"/public")); //middleware

hbs.registerHelper('getCurrentYear', function () {
  return new Date().getFullYear();
}); // register helper function. Anything that the function
// returns will be placed in getCurrentYear
hbs.registerHelper('screamIt', function (text) {
  return text.toUpperCase();
});

app.get('/', function (req, res) {
  // req = request coming in: headers. body information, path,
  // res = response includes a bunch of methods: status,
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Simon',
  //   likes: [
  //     'Running',
  //     'Programming',
  //     'Cryptocurrency'
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle: 'Welcome page',
    welcomeMessage: 'Welcome to the dynamic page.',
  });
});

app.get('/about', function (req, res) {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });; //renders default /views
});

app.get('/projects', function (req,res) {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  })
})

app.get('/bad', function (req,res) {
  res.send({
    errorMessage: "Unable to handle request",
  })
})

app.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});
// bind application to port 3000
