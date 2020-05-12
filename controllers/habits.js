"use strict";

const Habit = require("../model/habits").Habit;
const fetchAll = require("../model/habits").fetchAll;
const fetchFilter = require("../model/habits").fetchFilter;
const fetchUserFilter = require("../model/user").fetchFilter;

/**
 * This allows to create a new Habit
 */
exports.create = async (req, res) => {

  const inputHabit = req.body;
  let errMessage;
  if (!inputHabit.title)
    errMessage = "Title is required";

  if (!inputHabit.subarea)
    errMessage = "subarea is required";

  if (!inputHabit.isDaily && !errMessage)
    inputHabit.isDaily = false;

  if (!inputHabit.inputType && !errMessage)
    inputHabit.inputType = "boolean";

  if(!errMessage)
    errMessage = await validateEmail(inputHabit.userEmail);

  //  TODO: ( userEmail ) must exists and be valid - V5
  console.log(errMessage,inputHabit)
  if (!errMessage) {
    const habit = new Habit(inputHabit);
    habit.addNew()
      .then(() => {
        res.status(200).json({ "message": "New habit added to your list" });
      })
      .catch(err => {
        res.status(409).json(err);
      });
  }
  else {
    res.status(409).json({ "message": errMessage });
  }

};

/**
 * This allows to gett All habits in the db
 */
exports.getAll = (req, res) => {
  fetchAll()
    .then(habits => {
      res.status(200).json(habits);
    })
    .catch(err => {
      throw (err);
    });
};

/**
 * This allows to gett All habits with filter in the db
 */
exports.getFilter = (req, res) => {
  //  Title filter
  const title = req.query.title;
  //  userEmail filter
  const userEmail = req.query.userEmail;
  fetchFilter(title, userEmail)
    .then(habits => {
      res.status(200).json(habits);
    })
    .catch(err => {
      res.status(500).json({ "error": err });
    });
};


const validateEmail = async (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

  if (!email)
    return "User email is required";

  else if (!re.test(email))
    return "Email not valid";

  let result = [];

  await fetchUserFilter(email)
    .then(users => {
      result = users;
    });

  return result.length == 0 ? "This user doesn't esxist" : undefined;
};
