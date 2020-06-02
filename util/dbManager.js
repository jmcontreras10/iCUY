"use strict";

const MongoClient = require("mongodb").MongoClient;

// Dev env
const dotenv = require("dotenv");

dotenv.config();

const envDb = process.env.MONGO_DB_NAME;
const envUser = process.env.MONGO_DB_USER;
const envPass = process.env.MONGO_DB_PASSWORD;
const envUrl = process.env.MONGO_DB_URL;

let client;

const mongoConnect = async () => {

  const url = `mongodb+srv://${envUser}:${envPass}@${envUrl}?retryWrites=true&w=majority`;
  client = new MongoClient(url, { useNewUrlParser: true , useUnifiedTopology: true });
  await client.connect();
};

//  Database getting
const getDb = () => {
  return client.db(envDb);
};

const listenChanges=(notify)=>{
  const cursor=client.db(envDb).watch([],{fullDocument:"updateLookup"});
  cursor.on("change",data=>{
    notify(data);
  });
};

//  Close conection
const closeDb = () => {
  client.close();
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.listenChanges=listenChanges;
exports.closeDb = closeDb;