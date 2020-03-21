const express = require("express");
const bodyParser = require("body-parser");
const Partner = require("../models/partners");

const partnerRouter = express.Router();

partnerRouter.use(bodyParser.json());

partnerRouter
  .route("/")
  .get((req, res, next) => {
    Partner.find()
      .then(partners => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partners);
      })
      .catch(err => next(err));
  })
  .post((req, res) => {
    Partner.create(req.body)
      .then(partner => {
        console.log("Partner Created ", partner);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch(err => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete((req, res) => {
    Partner.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch(err => next(err));
  });

partnerRouter
  .route("/:partnerId")
  .get((req, res) => {
    Partner.findById(req.params.partnerId)
      .then(partner => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch(err => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partnerId/${req.params.partnerId}`
    );
  })
  .put((req, res) => {
    Partner.findByIdAndUpdate(
      req.params.partnerId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(partner => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(partner);
      })
      .catch(err => next(err));
  })
  .delete((req, res) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = partnerRouter;
