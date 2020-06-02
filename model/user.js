"use strict";
const mongodb = require("mongodb");
const getDb = require("../util/dbManager").getDb;


class User {

  constructor(user) {
    if (user) {
      /**
       * The user's _id
       * Required
       */
      this._id = user._id?new mongodb.ObjectID(user._id):undefined;

      /**
       * The user's name
       * Required
       */
      this.name = user.name;

      /**
     * The user's email
     * Required, Unique
     */
      this.email = user.email?user.email.toLowerCase():undefined;

      /**
     * The user's password
     * Required
     */
      this.password = user.password;

      /**
     * The user's bith date
     */
      this.birthdate = user.birthdate;

      /**
     * The user's phone
     */
      this.phone = user.phone;

      /**
     * The user's country
     */
      this.address = user.country;

      /**
     * The user's state
     */
      this.address = user.state;

      /**
     * The user's city
     */
      this.address = user.city;

      /**
     * The user's gender
     */
      this.gender = user.gender;

      /**
     * The user's photo
     * ( placeholder if undefined )
     */
      this.photo = user.photo;

      this.supervisors = user.supervisors ? user.supervisors : [];

      this.pupils = user.pupils ? user.pupils : [];

      /**
       * For the Unique value, the database actually verifies if (email) to be unique
       */
    }
  }

  addNew() {
    //  Getting Database
    const db = getDb();
    //  Returning response from habit creation
    return db
      .collection("users")
      .insertOne(this)
      .then()
      .catch(err => {
        throw err;
      });
  }

  
}

const update=(user)=>{
  //  Getting Database
  let id = new mongodb.ObjectID(user._id);
  delete user._id;
  if(user.email)
    user.email=user.email.toLowerCase();
  const db = getDb();
  return db.collection("users")
    .updateOne({ _id: id }, { $set: user }, { upsert: true })
    .then()
    .catch(err => {
      throw err;
    });
};
const fetchAll = () => {
  //  Getting Database
  const db = getDb();
  //  Finding
  return db
    .collection("users")
    .find()
    .toArray()
    .then(users => {
      return users;
    })
    .catch(err => {
      throw err;
    });
};


const fetchFilter = (email, name) => {
  //  Creating query
  let query = {};
  //  Getting Query attributes
  if (name) {
    query.name = name;
  }
  if (email) {
    query.email = email;
  }
  //  Getting Database
  const db = getDb();
  //  Finding
  return db
    .collection("users")
    .find(query)
    .toArray()
    .then(users => {
      return users;
    })
    .catch(err => {
      throw err;
    });
};

const agregate = () => {
  const db = getDb();
  return db
    .collection("users")
    .aggregate([
      {
        "$match": {}
      }, {
        "$set": {
          "pupils": [],
          "supervisors": []
        }
      }
    ]);
};

exports.User = User;
exports.update = update;
exports.agregate = agregate;
exports.fetchAll = fetchAll;
exports.fetchFilter = fetchFilter;