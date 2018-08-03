// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var ClientCapability = require('twilio').jwt.ClientCapability;

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/RepoStuff/loggedIn.html");
  });
// // ALTERNATIVELY per the documentation we can do this (NEEDS TESTING):
// app.post('/login', passport.authenticate('local', { 
//   successRedirect: '/',                                               failureRedirect: '/login' 
// }));

app.post("/api/logout", passport.authenticate("local"), function(req, res) {
  console.log(req.user);

  req.logout();
  res.json("/");
});

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/contact/create", function(req, res) {
    if (!req.user) {
      res.json("/members");
    }
    else {
      console.log(req.body);
      var contactNum = parseInt(req.body.phone_number);
      db.Phonebook.create({
        contact_name: req.body.contact_name,
        phone_number: contactNum,
        notes: req.body.notes,
        userID: req.user.id
      }).then(function(dbPhonebook) {
        res.json({
          message: "Contact Created!",
          data: dbPhonebook
        });
      }).catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
    }
  });

  // Get route for retrieving all contacts for a single user
  // action="/api/contact/create/?_method=PUT" method="POST"
  app.get("/api/user/:contacts", function(req, res) {
    db.Phonebook.findAll({
      where: {
        UserID: req.params.contacts
      }
    })
      .then(function(dbPhonebook) {
        res.json(dbPhonebook);
      });
  });

  // app.post("/api/contacts", (req, res) => {
  //   // table variable is now available in req.body:
  //   console.log(req.body.table);
  //   // always send a response:
  //   res.json({ ok: true });
  // });

  app.post("/api/contacts", function(req, res) {
    console.log(res.data);
    db.Phonebook.findAll({
      where: {
        UserID: req.user.id
      }
    }).then(function(dbPhonebook) {
      console.log(dbPhonebook);
      var table = `<table class="highlight">
      <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Note</th>
        </tr>
      </thead>

      <tbody>`;

      

      for(var i = 0; i < dbPhonebook.length; i++) {
        table += "<tr>";
        table += "<td>" + dbPhonebook[i].contact_id + "</td>";
        table += "<td>" + dbPhonebook[i].contact_name + "</td>";
        table += "<td>" + dbPhonebook[i].phone_number + "</td>";
        table += "<td>" + dbPhonebook[i].notes + "</td>";
        table += "</tr>";
      }
        table += "</tbody>";
        table += "</table>";


        res.json({
          message: "table sent from apiRoutes",
          data: table
        });
    });
  });
  // app.get("/cast", function(req, res) {
  //   // All of the resulting records are stored in the variable "result."
  //   connection.query("SELECT * FROM actors", function(err, result) {
  //     var html = "<h1> The Seinfeld Cast Database </h1>";
  
  //     html += "<ul>";
  
  //     for(var i = 0; i < result.length; i++) {
  //       html += "<li><p> ID: " + result[i].id + "</p>";
  //       html += "<p> Name: " + result[i].name + "</p>";
  //       html += "<p> Coolness Points: " + result[i].coolness_points + "</p>";
  //       html += "<p> Attitude: " + result[i].attitude + "</p></li>";
  //     }
  
  //     html += "</ul>";
  
  //     res.send(html);
  
  //   });
  // });



  // Get route for retrieving a single Phonebook contact
  app.get("/api/contact/:id", function(req, res) {
    db.Phonebook.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPhonebook) {
        res.json(dbPhonebook);
      });
  });

  // Add sequelize code to update the devoured value
  app.put("/api/update/", function(req, res) {
    db.Phonebook.update({ 
      contact_name: req.body.contact,
      phone_number: req.body.phone_number,
      notes: req.body.notes
    },
      {
      where: {
        id: req.body.id
      }
  }).then(function(data) {
    console.log(data);
    res.redirect("/api/all");
    });
  });


    // PUT route for updating posts
    // app.put("/api/posts", function(req, res) {
    //   db.Post.update(req.body,
    //     {
    //       where: {
    //         id: req.body.id
    //       }
    //     })
    //     .then(function(dbPost) {
    //       res.json(dbPost);
    //     });
    // });
// TODO: Create Update contacts Api Put route, as well as a Get Route for a findAll where UserID = req.user.id; test current routes.
  // POST route for saving a new post
  // app.post("/api/posts", function(req, res) {
  //   console.log(req.body);
  //   db.Post.create({
  //     title: req.body.title,
  //     body: req.body.body,
  //     category: req.body.category
  //   })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

//   app.get('/token', (req, res) => {
//     // put your Twilio API credentials here
//     const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
//     const authToken = 'your_auth_token';
  
//     // put your Twilio Application Sid here
//     const appSid = 'APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  
//     const capability = new ClientCapability({
//       accountSid: accountSid,
//       authToken: authToken,
//     });
//     capability.addScope(
//       new ClientCapability.OutgoingClientScope({ applicationSid: appSid })
//     );
//     capability.addScope(new ClientCapability.IncomingClientScope('joey'));
//     const token = capability.toJwt();
  
//     res.set('Content-Type', 'application/jwt');
//     res.send(token);
//   });
  
//   app.post('/voice', (req, res) => {
//     // TODO: Create TwiML response
//   });

};


// HANDLEBARS EXAMPLE VERSION FOR REFERENCE
// var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };