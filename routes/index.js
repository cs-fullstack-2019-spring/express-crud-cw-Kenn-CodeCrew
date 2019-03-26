var express = require('express');
var router = express.Router();
var UKCrimeCollection = require("../models/crimesModel");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/findByCrimeStreetID/:id', (req, res)=>{
  UKCrimeCollection.find(
      {"crime.location.street.id":req.params.id},
      (errors, results)=>{
        if (errors) res.send(errors);
        // else res.send(results);
        else res.render("results", {allResults: results})
      })
});

router.get('/updateLocation/:persistent_id/:latitude/:longitude/:streetName/:streetID', (req,res)=>{
  UKCrimeCollection.updateOne(
      {"crime.persistent_id": req.params.persistent_id},
      {
          "crime.location": {
              "latitude": req.params.latitude,
              "longitude": req.params.longitude,
              "street": {
                "id": req.params.streetID,
                "name": req.params.streetName
              }
          }
      }, (errors, results)=>{
        if (errors) res.send(errors);
        else res.send(results);
      })
} );

router.get('/deleteByPersistent/:id', (req,res)=>{
  UKCrimeCollection.deleteOne({"crime.persistent_id": req.params.id}, (error)=>{
    if (error) res.send(error);
    else res.send("Deleted!!!");
  })
});


router.get("/update/:code/:name/:date", (req, res)=>{
  UKCrimeCollection.updateOne(
      {"category":
          {
            "code": req.params.code,
            "name": req.params.name
          }
      },
      {
        "date": req.params.date
      }, (errors)=>{
        if (errors) res.send(errors);
        else res.send("UPDATED!!!!")
      });
});

module.exports = router;
