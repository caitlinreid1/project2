// =====================

var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");


// ROUTES //////////////////////////////////////

// ================= INDEX =====================
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.render("index");
});

// ==============  SIGN UP =====================
router.get("/signup", function(req, res) {
  // send us to the next get function instead.
  res.render("signup");
});

// ==========  render Create Subject ===========
router.get("/create-subject", function(req, res) {
  // send us to the next get function instead.
  res.render("create-subject");
});

// ==========  render Create Topic ===========
router.get("/create-topic", function(req, res) {
  // send us to the next get function instead.
  res.render("create-topic");
});

// ==========  render Create Links ===========
router.get("/create-links", function(req, res) {
  // send us to the next get function instead.
  res.render("create-links");
});

// ===================================  SUBJECT ===================================
router.get("/subject", function(req, res) {
  // replace old function with sequelize function
  db.Subject.findAll({
    include: [db.Topic], // ???
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["subject_name", "ASC"] // what is the exact name here???
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbSubject) {
    // into the main index, updating the page
    var hbsObject = {
      subject: dbSubject
    };
    return res.render("subject", hbsObject);
  });
});

// Routes
// =====================
// get route -> index
// router.get("/", function(req, res) {
//   // send us to the next get function instead.
//   res.redirect("/");
// });

//============================= get route to the home page ============================================

router.get("/", function(req, res) {
    // replace old function with sequelize function
    db.Subject.findAll({
        include: [db.Topic], // ???
        // Here we specify we want to return our subjects in ordered by ascending subject_name
        order: [
            ["subject_name", "ASC"] // what is the exact name here???
        ]
    })
    // use promise method to pass the subjects...
        .then(function(dbSubject) {
            // into the main index, updating the page
            var hbsObject = {
                subject: dbSubject
            };
            // console.log(hbsObject);
            return res.render("index", hbsObject);

        });
});


// GET ALL TOPICS
router.get("/topic", function(req, res) {
  // replace old function with sequelize function
  db.Topic.findAll({
    // include: [db.Links], // ???
    // Here we specify we want to return our subjects in ordered by ascending subject_name
    order: [
      ["topic_name", "ASC"] // what is the exact name here???
    ]
  })
  // use promise method to pass the subjects...
  .then(function(dbTopic) {
    // into the main index, updating the page
    console.log(dbTopic);
    var hbsObject = {
      topic: dbTopic
    };
    console.log(hbsObject);
    return res.render('topic', hbsObject);
    // res.render("index", hbsObject);
    
  });

  console.log("this is a test.")
});


// FIND ONE TOPIC
router.get("/topic/:topic_name", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Topic.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Links]
    }).then(function(dbTopic) {
      
      return res.render('topic', hbsObject);
      console.log(topic_name)
    });
  });



// =======================POST subjects=========================
router.post("/create-subject", function(req, res) {
    // edited burger create to add in a burger_name
    db.Subject.create({
        subject_name:req.body.subject_name
    })
    // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            console.log(data);
            // redirect
            res.redirect("/");
        });
});


// ==============  POST TOPIC =====================
router.post("/create-topic", function(req, res) {
  // edited burger create to add in a burger_name
  db.Topic.create({
    topic_name: req.body.topic_name
  })
  // pass the result of our call
  .then(function(dbTopic) {
    // log the result to our terminal/bash window
    console.log(dbTopic);
    // redirect
    res.redirect("/topics/:id"); // ???? come back to this
  });
});



// ==============  POST LINKS =====================
router.post("/create-links", function(req, res) {
  // edited burger create to add in a burger_name
  db.Links.create({
    link_name: req.body.link_name // double check the name of the column
  })
  // pass the result of our call
  .then(function(dbLinks) {
    // log the result to our terminal/bash window
    console.log(dbLinks);
    // redirect
    res.redirect("/links");
  });
});



module.exports = router;

// EDIT / UPDATE

// // put route to devour a burger
// router.put("/burgers/update", function(req, res) {
//   // If we are given a customer, create the customer and give them this devoured burger
//   if (req.body.customer) {
//     db.Customer.create({
//       customer: req.body.customer,
//       BurgerId: req.body.burger_id
//     })
//     .then(function(dbCustomer) {
//       return db.Burger.update({
//         devoured: true
//       }, {
//         where: {
//           id: req.body.burger_id
//         }
//       });
//     })
//     .then(function(dbBurger) {
//       res.redirect("/");
//     });
//   }
//   // If we aren't given a customer, just update the burger to be devoured
//   else {
//     db.Burger.update({
//       devoured: true
//     }, {
//       where: {
//         id: req.body.burger_id
//       }
//     })
//     .then(function(dbBurger) {
//       res.redirect("/");
//     });
//   }
// });





// // TOPICS
// router.get("/links", function(req, res) {
//   // replace old function with sequelize function
//   db.Links.findAll({
//     // include: [db.Links], // ???
//     // Here we specify we want to return our subjects in ordered by ascending subject_name
//     order: [
//       ["id", "ASC"] // 
//     ]
//   })
//   // use promise method to pass the subjects...
//   .then(function(dbSubject) {
//     // into the main index, updating the page
//     var hbsObject = {
//       subject: dbSubject
//     };
//     return res.render("index", hbsObject);
//   });
// });
