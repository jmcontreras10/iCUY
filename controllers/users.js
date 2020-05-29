"use strict";

const User = require("../model/user").User;
const update = require("../model/user").update;
const fetchAll = require("../model/user").fetchAll;
const fetchFilter = require("../model/user").fetchFilter;
const crypto = require("crypto");

//Register
exports.create = (user) => {

  const inputUser = user;
  let errMessage;

  if (!inputUser.name)
    errMessage = "Name is required";

  if (!inputUser.photo && !errMessage)
    inputUser.photo = "";

  if (!errMessage)
    errMessage = validateEmail(inputUser.email);

  if (!inputUser.isGoogle && !errMessage) {
    if (!inputUser.password)
      errMessage = "Password is required";
    else {
      const hash = crypto.createHash("sha256");
      hash.update(inputUser.password);
      inputUser.password = hash.digest("hex");
    }
  }
  //  TODO: Photo verification AI
  //  TODO: Birthdate Verification: format
  if (!errMessage) {
    const user = new User(inputUser);
    return user.addNew();      
  }
  else {
    return new Promise ((resolve,reject)=>{
      reject(errMessage);
    });
  }

};

//  Update

exports.update = (req, res) => {

  const inputUser = req.body;
  let errMessage;

  if (!inputUser._id)
    errMessage = "User UUID required";

  if (inputUser.password) {
    const hash = crypto.createHash("sha256");
    hash.update(inputUser.password);
    inputUser.password = hash.digest("hex");
  }

  if (!errMessage) {
    update(inputUser)
      .then(() => {
        res.status(200).json({ "message": "User updated" });
      })
      .catch(err => {
        res.status(409).json(err);
      });
  }
  else {
    res.status(409).json({ "message": errMessage });
  }
};

//  This method could be better

exports.getAll = (req, res) => {
  fetchAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      throw (err);
    });
};

exports.getFilter = (req, res) => {
  const name = req.query.name;
  const email = req.query.email;

  fetchFilter(email, name)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      throw (err);
    });
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  let message;

  if (!email)
    message = "Email is required";

  if (!re.test(email))
    message = "Email not valid";

  return message;
};



exports.validateEmailExp = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  let message;

  if (!email)
    message = "Email is required";

  if (!re.test(email))
    message = "Email not valid";

  return message;
};

