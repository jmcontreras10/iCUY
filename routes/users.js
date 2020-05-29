const express = require("express");
const router = express.Router();

const post = require("../controllers/users").create;
const get = require("../controllers/users").getAll;
const getF = require("../controllers/users").getFilter;
const update = require("../controllers/users").update;
const aggregate = require("../controllers/users").aggregate;


/** Save (CREATE and UPDATE user) */
router.post("/", (req,res)=>{
  post(req.body).then(() => {
    res.status(200).redirect("/platform");
  })
    .catch(err => {
      res.status(409).json(err);
    });
});

/** Get list of all users in the system */
router.get("/", get);

/** Get list of all users that meet the requirements */
router.get("/filter", getF);

/** Update the user info that have the UUID */
router.post("/update", update);

router.post("/aggregate", aggregate);

module.exports = router;
