"use strict";
const getDb = require("../util/dbManager").getDb;


class Record {

  constructor(record) {

    // Date of the record
    this.date = record.date;

    //Habit Title
    this.habitTitle = record.habitTitle;

    // User Email
    this.userEmail = record.userEmail;

    //Value of the input
    this.value = record.value;

    //For the Unique value, the database actually verifies if (date, userEmail, habitTitle) to be unique

  }

  addNew() {
    //  Getting Database
    const db = getDb();
    return fetchFilter(this.date, this.habitTitle, this.userEmail).then(res=>{
      if(res.length>0){
        return db
          .collection("records")
          .updateOne({ _id: res[0]._id }, { $set: this }, { upsert: true })
          .then()
          .catch(err => {
            return err;
          });
      }
      else{
        return db
          .collection("records")
          .insertOne(this)
          .then()
          .catch(err => {
            return err;
          });
      }
    });
    //  Returning response from habit creation

  }

}

const fetchAll = () => {
  //  Getting Database
  const db = getDb();
  //  Finding
  return db
    .collection("records")
    .find()
    .toArray()
    .then(records => {
      return records;
    })
    .catch(err => {
      throw err;
    });
};

const fetchFilter = (date, habitTitle, userEmail) => {
  //  Creating query
  let query = {};
  //  Getting Query attributes
  if (date) {
    query.date = date;
  }
  if (habitTitle) {
    query.habitTitle = habitTitle;
  }
  if (userEmail) {
    query.userEmail = userEmail;
  }
  //  Getting Database
  const db = getDb();
  //  Finding
  return db
    .collection("records")
    .find(query)
    .toArray()
    .then(records => {
      return records;
    })
    .catch(err => {
      throw err;
    });
};

exports.Record = Record;
exports.fetchAll = fetchAll;
exports.fetchFilter = fetchFilter;