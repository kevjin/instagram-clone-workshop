const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Make sure to store database credentials in .env
// Never store them publicly!
const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const hostUrl = process.env.MONGO_HOST
const url = `mongodb://${username}:${password}@${hostUrl}`
const DATABASE_NAME = "insta"

// Open a MongoDB connection when the server starts and share the connection
// between all DB actions.
let mongoClient = null;
let db = null;
const openConnection = () => {
  MongoClient.connect(url, { useNewUrlParser: true }, (_, client) => {
    // assert(null, _);
    mongoClient = client;
    db = client.db(DATABASE_NAME);
  })
}

// Close the database connection when the server stops.
const shutdown = () => {
  mongoClient.close();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const insertDocument = function(data, collectionName) {
    const collection = db.collection(collectionName);
    collection.insertOne(
      data, function(err, result) {
        try {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
        } catch (e) {
          return Promise.reject(e);
        }
      return Promise.resolve("Inserted document successfully");
    });
}

const removeDocument = function(data, collectionName) {
  try {
    const collection = db.collection(collectionName);
    collection.deleteMany(data);
    return Promise.resolve("Deleted documents successfully");
  } catch (e) {
      return Promise.reject(e);
  }
}

const findDocuments = function(data, collectionName, callback) {
  const collection = db.collection(collectionName);
  collection.find(data).toArray(function(err, docs) {
      if (err) {
        return Promise.reject(err);
      }
      return Promise.resolve(docs);
  });
}
module.exports = {
    openConnection: openConnection,
    insertDocument: insertDocument,
    removeDocument: removeDocument,
    findDocuments: findDocuments
}