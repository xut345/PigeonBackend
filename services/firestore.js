const Firestore = require('@google-cloud/firestore');
const { respondNotFound } = require('../handlers/errorHandler');

const serviceAccount = require('./serviceAccountKey.json');
const firestore = new Firestore({
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key
  }
});

const usersCollection = 'Users';

const collectionQuery = collection => {
  return firestore.collection(collection);
};

const documentQuery = (collection, id) => {
  return collectionQuery(collection).doc(id);
};

const collectionWhereQuery = (collection, column, value) => {
  return collectionQuery(collection).where(column, '==', value);
};

const getRecordArray = async (query, truncateData = null) => {
  return await query.get().then(results => {
    return results.docs.map(doc => {
      let data = doc.data();
      data.id = doc.id;
      return truncateData ? truncateData(data) : data;
    });
  });
};

const getWhere = async (collection, field, value) => {
  return await collectionWhereQuery(collection, field, value)
    .get()
    .then(results => results.docs.map(doc => doc.id));
};

const getUser = async email => {
  const query = collectionWhereQuery(usersCollection, 'email', email);
  return (await getRecordArray(query))[0];
};

const getRecordById = async (collection, id) => {
  const record = await documentQuery(collection, id)
    .get()
    .then(result => result.data());
  if (!record) {
    respondNotFound();
  }
  return record;
};

const insertRecord = async (collection, data) => {
  return await collectionQuery(collection)
    .add(data)
    .then(doc => doc.id);
};

const insertSubRecord = async (collection, doc, subCollection, data) => {
  return await documentQuery(collection, doc)
    .collection(subCollection)
    .add(data)
    .then(doc => doc.id);
};

const updateRecord = async (collection, id, data) => {
  await collectionQuery(collection)
    .doc(id)
    .update(data);
};

const updateArray = async (collection, id, field, data) => {
  await collectionQuery(collection)
    .doc(id)
    .update({
      [field]: Firestore.FieldValue.arrayUnion(data)
    });
};

module.exports = {
  getRecordById,
  getUser,
  insertRecord,
  insertSubRecord,
  updateRecord,
  getWhere,
  updateArray
};
