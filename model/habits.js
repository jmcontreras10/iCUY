"use strict";
const getDb = require("../util/dbManager").getDb;


class Habit {

  constructor(habit) {

    /**
         * Basically, the unique identifier of that habit
         * Required
         */
    this.title = habit.title;
    

    /**
         * Description of that habit, in case the user forget it
         */
    this.description = habit.description;
        
    /**
         * If the Habit must have a record daily
         * (false if undefined)
         */
    this.isDaily = habit.isDaily === "true" || habit.isDaily === true?true:false;

    /**
         * Uses that have that specific Habit
         * Required
         */
    this.userEmail = habit.userEmail;

    /**
         * Data type on the habit record
         * ('boolean' if undefined)
         * Types: ['boolean','number','hour','date']
         */
    this.inputType = habit.inputType;

    /**
         * The sum of all records of this goal must (sum/beInMean/etc) this value
         * Could be undefined for: No value
         */
    this.goalValue = habit.goalValue;

    this.subarea = parseInt(habit.subarea);

    this.unit = habit.unit;

    /**
         * For the Unique value, the database actually verifies if (title, userEmail) to be unique
         */

  }

  addNew() {
    //  Getting Database
    const db = getDb();
    //  Returning response from habit creation
    return fetchFilter(this.title,this.userEmail).then(res => {
      console.log(res, this);
      if (res.length > 0) {
        return db
          .collection("habits")
          .updateOne({ _id: res[0]._id }, { $set: this }, { upsert: true })
          .then()
          .catch(err => {
            return err;
          });
      }
      else {
        return db
          .collection("habits")
          .insertOne(this)
          .then()
          .catch(err => {
            return err;
          });
      }
    });
  }

}

const fetchAll = () => {
  //  Getting Database
  const db = getDb();
  //  Finding
  return db
    .collection("habits")
    .find()
    .toArray()
    .then(habits => {
      return habits;
    })
    .catch(err => {
      return err;
    });
};

const fetchFilter = (title, userEmail) => {
  //  Creating query
  let query = {};
  //  Getting Query attributes
  if (title) {
    query.title = title;
  }
  if (userEmail) {
    query.userEmail = userEmail;
  }
  //  Getting Database
  const db = getDb();
  //  Finding
  return db
    .collection("habits")
    .find(query)
    .toArray()
    .then(habits => {
      return habits;
    })
    .catch(err => {
      return err;
    });
};

exports.Habit = Habit;
exports.fetchAll = fetchAll;
exports.fetchFilter = fetchFilter;