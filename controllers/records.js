"use strict"

const Record = require("../model/records").Record
const fetchAll = require("../model/records").fetchAll
const fetchFilter = require("../model/records").fetchFilter
const fetchUserFilter = require("../model/user").fetchFilter
const fetchHabitFilter = require("../model/habits").fetchFilter

/**
 * This allows to create a new Record for a Habit
 * db.records.createIndex( { "userEmail": 1, "habitTitle": 1 , "date": 1 }, { unique: true } )
 */
exports.create = async (req, res) => {

  const inputRecord = req.body
  let errMessage

  if (!inputRecord.date)
    inputRecord.date = new Date()

  if (!errMessage)
    errMessage = await validateEmail(inputRecord.userEmail)

  if (!errMessage)
    errMessage = await validateHabit(inputRecord.habitTitle, inputRecord.userEmail)

  if (!inputRecord.value && !errMessage)
    errMessage = "Value for the register is required"

  if (!errMessage) {
    const record = new Record(inputRecord)
    record.addNew()
      .then(() => {
        res.status(200).json("Record created")
      })
      .catch(err => {
        res.status(409).json(err)
        throw (err)
      })
  }
  else {
    res.status(409).json(errMessage)
  }

}

//  This method could be better

exports.getAll = (req, res) => {
  fetchAll()
    .then(habits => {
      console.log("Usuario creado")
      res.status(200).json(habits)
    })
    .catch(err => {
      throw (err)
    })
}

exports.getFilter = (req, res) => {
  const date = req.query.date
  const habit_Id = req.query.habit_Id
  const user_Id = req.query.user_Id

  fetchFilter(date, habit_Id, user_Id)
    .then(habits => {
      res.status(200).json(habits)
    })
    .catch(err => {
      throw (err)
    })
}



const validateEmail = async (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/

  if (!email)
    return "User email is required"

  else if (!re.test(email))
    return "Email not valid"

  let result = []

  await fetchUserFilter(email)
    .then(users => {
      result = users
    })
    .catch(err => { })

  return result.length == 0 ? "This user doesn't esxist" : undefined
}


const validateHabit = async (habit, user) => {

  if (!habit)
    return "Habit title is required"

  let result = []

  await fetchHabitFilter(habit, user)
    .then(habits => {
      result = habits
    })
    .catch(err => { })

  return result.length == 0 ? "This habit doesn't esxist" : undefined
}

