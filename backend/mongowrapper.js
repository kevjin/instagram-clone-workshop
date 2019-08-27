require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Make sure to store database credentials in .env
// Never store them publicly!
const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const hostUrl = process.env.MONGO_HOST
const url = `mongodb://${username}:${password}@${hostUrl}`
const databaseName = "insta"

var insertDocument = function(data, collectionName, callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(databaseName);
        var collection = db.collection(collectionName);
        // Insert a documents
        collection.insertOne(
          data, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          console.log("Inserted document successfully");
          callback(result);
        });
        client.close();
      });
}

var removeDocument = function(data, collectionName, callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(databaseName);
        var collection = db.collection(collectionName);
        collection.deleteMany(data);
        callback();
        client.close();
      });
}

var findDocuments = function(data, collectionName, callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db(databaseName);
        var collection = db.collection(collectionName);
        collection.find(data).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Searched for documents successfully");
            callback(docs);
          });
        client.close();
      });
}
module.exports = {
    insertDocument: insertDocument,
    removeDocument: removeDocument,
    findDocuments: findDocuments
}